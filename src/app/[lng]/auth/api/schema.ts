import { z } from "zod";

const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

export const signInSchema = z.object({
  emailOrPhone: z.union([
    z.string().email(),
    z.string().regex(PHONE_REGEX), // Simplified E.164 format example
  ]),
  password: z.string().min(6, { message: "invalidPassword" }),
});

export const signUpSchema = z
  .object({
    emailOrPhone: z.union([
      z.string().email({ message: "invalidEmailOrPhone" }),
      z.string().regex(PHONE_REGEX), // Simplified E.164 format example
    ]),
    password: z.string().min(6, { message: "invalidPassword" }),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "passwordsDoNotMatch",
    path: ["repeatPassword"],
  });
