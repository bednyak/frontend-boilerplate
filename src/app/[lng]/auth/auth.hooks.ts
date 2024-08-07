import { login, register } from "./actions/actions";
import { signInSchema, signUpSchema } from "./api/schema";

export enum FieldName {
  emailOrPhone = "emailOrPhone",
  Password = "password",
  RepeatPassword = "repeatPassword",
}

export const initialSignInState = {
  [FieldName.emailOrPhone]: "",
  [FieldName.Password]: "",
  errors: null,
};

export const initialSignUpState = {
  [FieldName.emailOrPhone]: "",
  [FieldName.Password]: "",
  [FieldName.RepeatPassword]: "",
  errors: null,
};

export function useAuth(onSuccess: () => void) {
  async function signIn(prevState: any, formData: FormData) {
    const validation = signInSchema.safeParse({
      [FieldName.emailOrPhone]: formData.get(FieldName.emailOrPhone),
      [FieldName.Password]: formData.get(FieldName.Password),
    });

    if (!validation.success) {
      return {
        [FieldName.emailOrPhone]: formData.get(FieldName.emailOrPhone),
        [FieldName.Password]: formData.get(FieldName.Password),
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const response = await login({
      emailOrPhone: formData.get(FieldName.emailOrPhone) as string,
      password: formData.get(FieldName.Password) as string,
    });

    if (!response.data) {
      return {
        [FieldName.emailOrPhone]: formData.get(FieldName.emailOrPhone),
        [FieldName.Password]: formData.get(FieldName.Password),
        errors: [response.errorMessage],
      };
    }

    onSuccess();
    return {
      [FieldName.emailOrPhone]: formData.get(FieldName.emailOrPhone),
      [FieldName.Password]: formData.get(FieldName.Password),
      errors: null,
    };
  }

  async function signUp(prevState: any, formData: FormData) {
    const validation = signUpSchema.safeParse({
      [FieldName.emailOrPhone]: formData.get(FieldName.emailOrPhone),
      [FieldName.Password]: formData.get(FieldName.Password),
      [FieldName.RepeatPassword]: formData.get(FieldName.RepeatPassword),
    });

    if (!validation.success) {
      return {
        [FieldName.emailOrPhone]: formData.get(FieldName.emailOrPhone),
        [FieldName.Password]: formData.get(FieldName.Password),
        [FieldName.RepeatPassword]: formData.get(FieldName.RepeatPassword),
        errors: validation.error.flatten().fieldErrors,
      };
    }

		const response = await register({
      emailOrPhone: formData.get(FieldName.emailOrPhone) as string,
      password: formData.get(FieldName.Password) as string,
    });

    if (!response.data) {
      return {
        [FieldName.emailOrPhone]: formData.get(FieldName.emailOrPhone),
        [FieldName.Password]: formData.get(FieldName.Password),
        errors: [response.errorMessage],
      };
    }

    onSuccess();
    return {
      [FieldName.emailOrPhone]: formData.get(FieldName.emailOrPhone),
      [FieldName.Password]: formData.get(FieldName.Password),
      [FieldName.RepeatPassword]: formData.get(FieldName.RepeatPassword),
      errors: null,
    };
  }

  return {
    signIn,
    signUp,
  };
}
