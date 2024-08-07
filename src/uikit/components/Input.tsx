import React, { ReactElement } from "react";

interface IProps {
  placeholder: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  type?: string;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  flexDirection?: "row" | "col" | "row-reverse" | "col-reverse";
  containerClassName?: string;
}

export function Input({
  value,
  placeholder,
  label,
  name,
  type = "text",
  onChange,
  rightIcon,
  leftIcon,
  className,
  flexDirection = "col",
  containerClassName,
  ...inputProps
}: IProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`relative flex flex-${flexDirection} ${containerClassName}`}>
      {label && (
        <label className="block text-black text-sm uppercase mb-2 font-medium" htmlFor={label}>
          * {label}
        </label>
      )}
      <div className="flex flex-row items-center w-full">
        {leftIcon && <div className="absolute left-0 top-0 h-full flex items-center pl-3">{leftIcon}</div>}
        <input
          name={name}
          className={`
					appearance-none
					border-b
					w-full
					py-2.5
					px-3
					text-gray-700
					leading-tight
					outline-none
					${className}
					${leftIcon || rightIcon ? "pl-10 pr-10" : ""}
				`}
          id={label}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          {...(value && { value })}
          {...inputProps}
        />
        {rightIcon && <div className="absolute right-0 top-0 h-full flex items-center pr-3">{rightIcon}</div>}
      </div>
      {/* TODO: Add eye icon	*/}
    </div>
  );
}
