"use client";

import { InfoIcon } from "@/uikit/icons/InfoIcon";
import { colors } from "@/root/theme";

interface IProps {
  text: string;
}

export function ErrorLabel({ text }: IProps) {
  return (
    <div className="rounded bg-error border border-errorDark flex flex-row items-center gap-2 p-2">
      <InfoIcon stroke={colors.errorDark} />
      <span className="text-errorDark">{text}</span>
    </div>
  );
}
