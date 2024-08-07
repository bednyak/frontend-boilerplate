"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/infrastructure/i18n.config";
import { ArrowDownIcon, ArrowRightIcon } from "@/uikit/icons";
import { Dictionary } from "@/infrastructure/localization";

interface IProps {
  translations: Dictionary;
}

export default function LocaleSwitcher({ translations }: IProps) {
  const [showOptions, setShowOptions] = useState(false);
  const pathName = usePathname();
  const activeLanguage = pathName.split("/")[1] as Locale;
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  function toggleOptions() {
    setShowOptions((prev) => !prev);
  }

  return (
    <div className={`flex items-center px-4 pt-[4px] relative h-[86px] ${showOptions ? "bg-white" : ""}`}>
      <button className="flex flex-row cursor-pointer" onClick={toggleOptions}>
        <p>{translations.header.localeSwitcher[activeLanguage]}</p>
        <ArrowDownIcon className={showOptions ? "rotate-180" : ""} />
      </button>
      {showOptions && (
        <ul className="absolute top-[86px] border-b-[1px] border-x-[1px] right-[-1px] flex flex-col gap-1 p-3">
          {i18n.locales.map((locale) => {
            return (
              <li key={locale} onClick={toggleOptions}>
                <Link
                  className={`px-4 py-2 uppercase flex flex-row items-center gap-2 ${
                    activeLanguage === locale ? "bg-flashGreen" : "bg-lightGray"
                  }`}
                  href={redirectedPathName(locale)}
                >
                  <span className="mt-1">{locale}</span>
                  <ArrowRightIcon />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
