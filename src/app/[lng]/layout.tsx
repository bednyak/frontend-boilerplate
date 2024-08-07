import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Inter } from "next/font/google";
import "../globals.css";
import { ReactQueryProvider } from "@/infrastructure/react-query.provider";
import { MODAL_SELECTOR_ID } from "@/infrastructure/constants";
import { Locale } from "@/infrastructure/i18n.config";
import { PropsWithChildren } from "react";
import { Dictionary, getDictionary } from "@/infrastructure/localization";
import { isAuthenticated } from "./auth/actions/actions";
import { Header } from "@/app/[lng]/components/header/Header";
import { ICategory, Sidebar } from "@/app/[lng]/components/sidebar/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Application",
  description: "Ecommerce Box Solution",
};

interface IProps {
  params: { lng: Locale };
}

// FIXME: Move somewhere else later
const categories: ICategory[] = [
  {"icon": "lapTops", "nameKey": "lapTops"},
  {"icon": "computers", "nameKey": "computers"},
  {"icon": "smartphones", "nameKey": "smartPhones"},
  {"icon": "gamingProducts", "nameKey": "gamingProducts"},
  {"icon": "tvAndMonitors", "nameKey": "tvAndMonitors"},
  {"icon": "audioProducts", "nameKey": "audioProducts"},
  {"icon": "largeAppliances", "nameKey": "largeAppliances"},
  {"icon": "smallAppliances", "nameKey": "smallAppliances"},
  {"icon": "tools", "nameKey": "tools"},
  {"icon": "drones", "nameKey": "drones"},
  {"icon": "houseHoldChemicals", "nameKey": "houseHoldChemicals"},
  {"icon": "dishes", "nameKey": "dishes"},
  {"icon": "promotionalProducts", "nameKey": "promotionalProducts"}
];

export default async function RootLayout({ children, params }: PropsWithChildren<IProps>) {
  const dict: Dictionary = await getDictionary(params.lng);
  const authenticated: boolean = await isAuthenticated();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <CookiesProvider>
            <div className="fixed top-0 left-0 w-full">
              <Header translations={dict} params={params} isAuthenticated={authenticated} />
            </div>
            <div className="mt-[86px] h-full flex">
              <Sidebar categories={categories} translations={dict} />
              <div className="pl-[387px]">
                {children}
              </div>
            </div>
          </CookiesProvider>
        </ReactQueryProvider>
        <div id={MODAL_SELECTOR_ID} />
      </body>
    </html>
  );
}
