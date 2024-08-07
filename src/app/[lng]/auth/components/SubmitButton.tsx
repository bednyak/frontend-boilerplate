import { Button } from "@/uikit/components";
import React, { MouseEventHandler } from "react";
import { useFormStatus } from "react-dom";

interface IProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  uppercase?: boolean;
  fontWeight?: "normal" | "bold" | "extrabold" | "light" | "medium" | "semibold" | "black";
}

export function SubmitButton({
  text,
  onClick,
  className = "",
  type = "button",
  disabled,
  fullWidth,
  uppercase,
  fontWeight = "normal",
}: IProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  function onButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (pending) {
      event.preventDefault();
    }

    if (onClick) {
      onClick(event);
    }
  }

  return (
    <Button
      type={type}
      onClick={onButtonClick}
      disabled={isDisabled}
      className={className}
      fullWidth={fullWidth}
      uppercase={uppercase}
      fontWeight={fontWeight}
      text={text}
    />
  );
}
