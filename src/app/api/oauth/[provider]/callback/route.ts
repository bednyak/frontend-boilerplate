import { NextRequest, NextResponse } from "next/server";
import { api, IResponse } from "@/infrastructure/api";
import { setCookies } from "@/app/[lng]/auth/utils";
import { IAuthResponse } from "@/app/[lng]/auth/api/dto";
import {cookies} from "next/headers";

const AUTH_URL = process.env.NEXT_AUTH_API_URL ?? "";

function extractOauthNameFromURL(url: string): string | null {
  const pattern: RegExp = /\/oauth\/(.*?)\/callback/;
  const match: RegExpMatchArray | null = url.match(pattern);
  return match ? match[1] : null;
}

function parseQueryParams(url: string): Record<string, string> {
  const params: URLSearchParams = new URL(url).searchParams;
  const paramsObj: Record<string, string> = {};
  params.forEach((value: string, key: string) => {
    paramsObj[key] = value;
  });
  return paramsObj;
}

export async function GET(req: NextRequest) {
  try {
    const oauthServiceName: string | null = extractOauthNameFromURL(req.url);
    if (!oauthServiceName) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_API_URL as string);
    }

    const requestBody: Record<string, string> = parseQueryParams(req.url);
    const state = cookies().get("oauth_state")?.value;

    if (state) {
      requestBody.state = state;
    }

    const response: IResponse<IAuthResponse> = await api.post<IAuthResponse>(`${AUTH_URL}/oauth/${oauthServiceName}/complete`, {
      body: JSON.stringify(requestBody)
    }, true);
    await setCookies(response);
    cookies().delete("oauth_state");

    return NextResponse.redirect(process.env.NEXT_PUBLIC_API_URL as string);
  } catch (error) {
    cookies().has("oauth_state") && cookies().delete("oauth_state");

    return NextResponse.redirect(process.env.NEXT_PUBLIC_API_URL as string);
  }
}
