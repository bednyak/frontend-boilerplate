"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "@/uikit/components/Modal";
import { MODAL_SELECTOR_ID } from "@/infrastructure/constants";
import { Dictionary } from "@/infrastructure/localization";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Tab, TabOption } from "./components/Tab";
import { ForgotPassword } from "@/app/[lng]/auth/components/ForgotPassword";
import { Success } from "@/app/[lng]/auth/components/Success";
import { oauthLogin } from "./actions/actions";
import { OauthProvider } from "@/app/[lng]/auth/api/dto";

interface IProps {
  show?: boolean;
  onClose?: () => void;
  translations: Dictionary;
  startingSubPage?: AuthSubPage;
}

export enum AuthSubPage {
  DEFAULT = "default",
  ENTER_NEW_PASSWORD = "enterNewPassword",
  FORGOT_PASSWORD = "forgotPassword",
  SIGN_IN_SUCCESS = "signInSuccess",
  SIGN_UP_SUCCESS = "signUpSuccess",
}

export function AuthModal({ onClose, show, translations, startingSubPage = AuthSubPage.DEFAULT }: IProps) {
  const [selectedTab, setSelectedTab] = useState<TabOption>(TabOption.SIGN_IN);
  const [subPage, setSubPage] = useState<AuthSubPage>(startingSubPage);
  const coverImage: string = selectedTab === TabOption.SIGN_IN ? "/images/auth-image.png" : "/images/sign-up-cover.png";
  const title: string =
    selectedTab === TabOption.SIGN_IN ? translations.authModal.signInTab.title : translations.authModal.signUpTab.title;

  useEffect(() => {
    if (!show) {
      setSelectedTab(TabOption.SIGN_IN);
      setSubPage(startingSubPage);
    }
  }, [show, startingSubPage]);

  function onForgotPasswordClick() {
    setSubPage(AuthSubPage.FORGOT_PASSWORD);
  }

  function onSignInSuccess() {
    setSubPage(AuthSubPage.SIGN_IN_SUCCESS);
  }

  function onSignUpSuccess() {
    setSubPage(AuthSubPage.SIGN_UP_SUCCESS);
  }

  function renderTabContent() {
    if (selectedTab === TabOption.SIGN_IN) {
      return <SignIn translations={translations} onSuccess={onSignInSuccess} />;
    }
    return <SignUp translations={translations} onSuccess={onSignUpSuccess} />;
  }

  function renderSubPageContent() {
    if (subPage === AuthSubPage.FORGOT_PASSWORD) {
      return (
        <div className="flex-1">
          <ForgotPassword />
        </div>
      );
    }

    if (subPage === AuthSubPage.SIGN_IN_SUCCESS) {
      return (
        <div className="flex-1">
          <Success title={translations.authModal.signInTab.signInSuccess} />
        </div>
      );
    }

    if (subPage === AuthSubPage.SIGN_UP_SUCCESS) {
      return (
        <div className="flex-1">
          <Success title={translations.authModal.signUpTab.signUpSuccess} />
        </div>
      );
    }

    if (subPage === AuthSubPage.ENTER_NEW_PASSWORD) {
      return <div className="flex-1"></div>;
    }

    return (
      <div className="flex-1">
        <div className="flex justify-center gap-11 items-center mb-10 pl-10 pr-10 pt-10 max-[480px]:pt-14">
          <Tab
            onClick={setSelectedTab}
            text={translations.authModal.signInTabText}
            tabOption={TabOption.SIGN_IN}
            isActive={selectedTab === TabOption.SIGN_IN}
          />
          <Tab
            onClick={setSelectedTab}
            text={translations.authModal.signUpTabText}
            tabOption={TabOption.SIGN_UP}
            isActive={selectedTab === TabOption.SIGN_UP}
          />
        </div>
        <div className="flex flex-row pl-10 pr-10 pb-10">
          <div className="flex grow flex-col">
            <h2 className="text-center text-gray-700 mb-10 text-xl font-black uppercase">{title}</h2>
            {renderTabContent()}
            <div className="flex flex-row gap-1 items-center">
              <Image
                className="mb-[2px]"
                width={20}
                height={20}
                alt="info-icon"
                src="/icons/info-icon.svg"
                unoptimized
              />
              <button onClick={onForgotPasswordClick} className="font-medium text-sm text-black uppercase">
                {translations.authModal.signInTab.forgotPassword}
              </button>
            </div>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-mediumGray uppercase font-normal text-base">
                {translations.authModal.orDivider}
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-12">
                <button
                  onClick={() => oauthLogin(OauthProvider.Google)}
                  className="flex justify-center bg-google hover:bg-red-600 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
                  <Image
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px]"
                    alt="google-icon"
                    src="/icons/google-icon.svg"
                    unoptimized
                  />
                </button>
                <button
                  onClick={() => oauthLogin(OauthProvider.Facebook)}
                  className="flex justify-center bg-facebook hover:bg-blue-600 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
                  <Image
                    width={10}
                    height={18}
                    className="w-[10px] h-[18px]"
                    alt="facebook-icon"
                    src="/icons/facebook-icon.svg"
                    unoptimized
                  />
                </button>
                <button
                  onClick={() => oauthLogin(OauthProvider.Twitter)}
                  className="flex justify-center bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
                  <Image
                    width={18}
                    height={16}
                    className="w-[18px] h-[16px]"
                    alt="x-icon"
                    src="/icons/x-icon.svg"
                    unoptimized
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal onClose={onClose} show={show} selector={MODAL_SELECTOR_ID}>
      <div className="flex">
        <button
          onClick={onClose}
          className="absolute max-[480px]:top-[17px] max-[480px]:right-[17px] top-[37px] right-[37px] bg-white p-2"
        >
          <Image width={12} height={12} alt="close-btn-image" src="/icons/close-icon.svg" unoptimized />
        </button>
        {renderSubPageContent()}
        <div className="flex-1 max-md:hidden">
          <Image
            width={500}
            height={500}
            alt="x-icon"
            src={coverImage}
            style={{
              width: "100%",
              height: "100%",
            }}
            priority
          />
        </div>
      </div>
    </Modal>
  );
}
