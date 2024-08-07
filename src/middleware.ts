import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { i18n } from "./infrastructure/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { reloginByRefreshToken } from "./app/[lng]/auth/actions/actions";

const defaultRoute = "/home";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  const pathWithOnlyLocale = i18n.locales.find((locale) => `/${locale}` === pathname);

  if (pathWithOnlyLocale) {
		const response = NextResponse.redirect(new URL(`/${pathWithOnlyLocale}${defaultRoute}`, request.url));
		return reloginByRefreshToken(request, response);
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    if (pathname === `/`) {
			const response = NextResponse.redirect(new URL(`/${locale}${defaultRoute}`, request.url));
			return reloginByRefreshToken(request, response);
    }

		const response = NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url));
		return reloginByRefreshToken(request, response);
  }

	if (request.cookies.has("accessToken")) {
		return NextResponse.next();
	}

	if (!request.cookies.has("refreshToken") && !request.cookies.has("accessToken")) {
		return NextResponse.next();
	}

	const response = NextResponse.redirect(new URL(request.url));
	return reloginByRefreshToken(request, response);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|images|icons|assets|favicon.ico).*)"],
};
