"use server";

import { IResponse, api } from "@/infrastructure/api";
import { cookies } from "next/headers";
import { IAuthResponse } from "./api/dto";

export async function setCookies(response: IResponse<IAuthResponse>) {
  cookies().set("accessToken", response!.data!.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(response!.data!.expiresAt),
  });

  cookies().set("refreshToken", response!.data!.refreshToken.token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(response!.data!.refreshToken.expiresAt),
  });
}
