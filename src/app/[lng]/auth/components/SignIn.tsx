"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import { Dictionary } from "@/infrastructure/localization";
import { Input } from "@/uikit/components/Input";
import { FieldName, initialSignInState, useAuth } from "@/app/[lng]/auth/auth.hooks";
import { ErrorLabel } from "@/app/[lng]/auth/components/ErrorLabel";
import { SubmitButton } from "./SubmitButton";

interface IProps {
  translations: Dictionary;
  onSuccess: () => void;
}

export function SignIn({ translations, onSuccess }: IProps) {
  const { signIn } = useAuth(onSuccess);
  const [state, formAction] = useFormState(signIn, initialSignInState);
  const [formDirty, setFormDirty] = useState(false);

  function handleFormChange() {
    !formDirty && setFormDirty(true);
  }

  return (
    <form action={formAction}>
      <div className="mb-6">
        <Input
          name={FieldName.emailOrPhone}
          placeholder={translations.authModal.signInTab.emailOrPhoneInputPlaceholder}
          label={translations.authModal.signInTab.emailOrPhoneInputLabel}
          onChange={handleFormChange}
          autoComplete="email"
        />
      </div>
      <div className="mb-6">
        <Input
          name={FieldName.Password}
          type="password"
          placeholder={translations.authModal.signInTab.passwordInputPlaceholder}
          label={translations.authModal.signInTab.passwordInputLabel}
          onChange={handleFormChange}
          autoComplete="current-password"
        />
      </div>
      <div className="flex items-center justify-between mt-10 mb-6">
        <SubmitButton
          type="submit"
          uppercase
          fullWidth
          fontWeight="bold"
          disabled={!formDirty}
          text={translations.authModal.signInTab.signInBtn}
        />
      </div>
      <div className="mb-6">{state.errors ? <ErrorLabel text={translations.authModal.validationError} /> : <> </>}</div>
    </form>
  );
}
