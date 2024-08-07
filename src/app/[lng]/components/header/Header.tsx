"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AuthModal, AuthSubPage } from "@/app/[lng]/auth/AuthModal";
import { Locale } from "@/infrastructure/i18n.config";
import { Dictionary } from "@/infrastructure/localization";
import { Search } from "./Search";
import LocaleSwitcher from "./LocaleSwitcher";
import { CartIcon, HeartIcon, UserIcon } from "@/uikit/icons";
import { ButtonWithBadge } from "@/uikit/components/ButtonWithBadge";

interface IProps {
  params: { lng: Locale };
  translations: Dictionary;
  isAuthenticated: boolean;
}

const LOGO_WIDTH = 344;
const LOGO_HEIGHT = 86;

const SEARCH_PARAM_EMAIL = "resetPasswordEmail";

export function Header({ params, translations, isAuthenticated }: IProps) {
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [subPage, setSubPage] = useState(AuthSubPage.DEFAULT);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has(SEARCH_PARAM_EMAIL)) {
      setSubPage(AuthSubPage.ENTER_NEW_PASSWORD);
      setLoginModalOpened(true);
    }
  }, [searchParams]);

  function toggleModal() {
    setLoginModalOpened((isOpened) => !isOpened);
  }

  function onModalClose() {
    setLoginModalOpened(false);
    window.location.reload();
  }

  return (
    <div className="bg-lightGray flex flex-row items-center">
      <div>
        <Image className={`w-[${LOGO_WIDTH}px] min-w-[344px] h-[${LOGO_HEIGHT}px]`} src="/images/logo.png" alt="Logo" width={LOGO_WIDTH} height={LOGO_HEIGHT} />
      </div>
      <div className="flex flex-row gap-5 items-center w-full px-5">
        <Search translations={translations} />
        <LocaleSwitcher translations={translations} />
        <div className="border-r-[1px] border-r-stroke h-[40px]" />
        <div className="flex flex-row gap-10 items-center px-5">
          <ButtonWithBadge badgeValue={0}>
            <HeartIcon />
          </ButtonWithBadge>
          <ButtonWithBadge badgeValue={0}>
            <CartIcon />
          </ButtonWithBadge>
          <button onClick={toggleModal}>
            <UserIcon stroke={isAuthenticated ? undefined : "red"} />
          </button>
        </div>
        {!isAuthenticated && (
          <>
            <AuthModal
              translations={translations}
              onClose={onModalClose}
              show={loginModalOpened}
              startingSubPage={subPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
