"use server";

import { redirect } from "next/navigation";
import { IResponse, api } from "@/infrastructure/api";
import { IAuthResponse, AuthBodyForm, OauthProvider, IOauthLink } from "../api/dto";
import { setCookies } from "../utils";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

const AUTH_URL = process.env.NEXT_AUTH_API_URL ?? "";

export async function login(body: AuthBodyForm): Promise<IResponse<IAuthResponse>> {
  const response = await api.post<IAuthResponse>(`${AUTH_URL}/email-password/login`, {
		body: JSON.stringify({
			email: body.emailOrPhone,
			password: body.password,
		}),
	}, true);

	if (!response || !response.data || response.errorMessage) {
		return { errorMessage: response.errorMessage };
	}

	await setCookies(response);
	return { data: response.data };
}

export async function oauthLogin(provider: OauthProvider): Promise<void> {
	const response = await api.get<IOauthLink>(`${AUTH_URL}/oauth/${provider}/link`, {}, true);

	if (response.data?.link) {
		cookies().set("oauth_state", response.data?.state, {
			httpOnly: false,
			secure: false,
			sameSite: false,
			path: "/",
		});
		redirect(response.data?.link);
	}
}

export async function register(body: AuthBodyForm): Promise<IResponse<IAuthResponse>> {
	const response = await api.post<IAuthResponse>(`${AUTH_URL}/email-password/register`, {
		body: JSON.stringify({
			email: body.emailOrPhone,
			password: body.password,
			repeatPassword: body.repeatPassword,
		}),
	}, true);

	if (!response || !response.data || response.errorMessage) {
		return { errorMessage: response.errorMessage };
	}

	await setCookies(response);
	return { data: response.data };
}

export async function isAuthenticated() {
  return cookies().has("accessToken");
}

export async function reloginByRefreshToken(request: NextRequest, response: NextResponse) {
	if (!request.cookies.has("accessToken") && request.cookies.has("refreshToken")) {
		const refreshToken: string | undefined = request.cookies.get("refreshToken")?.value;
		if (!refreshToken) {
			return { errorMessage: "No refresh token" };
		}

		const refreshResponse = await api.post<IAuthResponse>(
			`${AUTH_URL}/refresh-token`,
			{
				body: JSON.stringify({
					token: refreshToken,
				}),
			},
			true
		);

		if (
			!refreshResponse ||
			!refreshResponse.data ||
			refreshResponse.errorMessage
		) {
			return { errorMessage: refreshResponse.errorMessage };
		}
		response.cookies.set("accessToken", refreshResponse!.data!.accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			path: "/",
			expires: new Date(refreshResponse!.data!.expiresAt),
		});

		response.cookies.set("refreshToken", refreshResponse!.data!.refreshToken.token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			path: "/",
			expires: new Date(refreshResponse!.data!.refreshToken.expiresAt),
		});
	}
	return response;
}
