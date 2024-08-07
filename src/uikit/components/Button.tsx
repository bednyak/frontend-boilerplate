import React, { MouseEventHandler, ReactElement } from "react";

interface IProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  uppercase?: boolean;
  fontWeight?: "normal" | "bold" | "extrabold" | "light" | "medium" | "semibold" | "black";
  rightIcon?: ReactElement;
}

export function Button({
  text,
  onClick,
  className = "",
  type = "button",
  disabled,
  fullWidth,
  uppercase,
  fontWeight = "normal",
  rightIcon,
}: IProps) {
  function onButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      onClick(event);
    }
  }

  return (
    <button
      onClick={onButtonClick}
      className={`
				text-base
				px-4
				font-${fontWeight}
				flex
				flex-row
				items-center
				justify-center
				gap-2
				text-center
				${rightIcon ? "py-1.5" : "py-2"}
				${disabled ? "bg-lightGray text-disabled" : "bg-flashGreen text-black"}
				${uppercase ? "uppercase" : ""}
				${fullWidth ? "w-full" : ""}
				${className}
			`}
      type={type}
      disabled={disabled}
    >
      <span className={rightIcon ? "mt-1" : ""}>{text}</span>
      {rightIcon && <div className="">{rightIcon}</div>}
    </button>
  );
}
