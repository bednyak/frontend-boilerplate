"use client";

import { useFormState } from "react-dom";
import React, { useState } from "react";
import { Dictionary } from "@/infrastructure/localization";
import { Input } from "@/uikit/components/Input";
import { FieldName, initialSignUpState, useAuth } from "@/app/[lng]/auth/auth.hooks";
import { ErrorLabel } from "@/app/[lng]/auth/components/ErrorLabel";
import { SubmitButton } from "./SubmitButton";

interface IProps {
  translations: Dictionary;
  onSuccess: () => void;
}

export function SignUp({ translations, onSuccess }: IProps) {
  const { signUp } = useAuth(onSuccess);
  const [state, formAction] = useFormState(signUp, initialSignUpState);
  const [formDirty, setFormDirty] = useState(false);

  function handleFormChange() {
    !formDirty && setFormDirty(true);
  }

  return (
    <form action={formAction}>
      <div className="overflow-scroll max-h-[200px] hide-scrollbar">
        <div className="mb-6">
          <Input
            name={FieldName.emailOrPhone}
            placeholder={translations.authModal.signUpTab.emailOrPhoneInputPlaceholder}
            label={translations.authModal.signUpTab.emailOrPhoneInputLabel}
            onChange={handleFormChange}
            autoComplete="email"
          />
        </div>
        <div className="mb-6">
          <Input
            name={FieldName.Password}
            type="password"
            placeholder={translations.authModal.signUpTab.passwordInputPlaceholder}
            label={translations.authModal.signUpTab.passwordInputLabel}
            onChange={handleFormChange}
            autoComplete="current-password"
          />
        </div>
        <div className="mb-6">
          <Input
            name={FieldName.RepeatPassword}
            type="password"
            placeholder={translations.authModal.signUpTab.repeatPasswordInputPlaceholder}
            label={translations.authModal.signUpTab.repeatPasswordInputLabel}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="bg-white w-full h-10 blur-sm mt-[-17px]"></div>
      <div className="flex items-center justify-between mt-2 mb-6">
        <SubmitButton
          type="submit"
          uppercase
          fullWidth
          fontWeight="bold"
          disabled={!formDirty}
          text={translations.authModal.signUpTab.signUpBtn}
        />
      </div>
      <div className="mb-6">{state.errors ? <ErrorLabel text={translations.authModal.validationError} /> : <> </>}</div>
    </form>
  );
}
