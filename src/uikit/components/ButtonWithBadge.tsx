import { PropsWithChildren } from "react";

interface IProps {
  badgeValue: number;
}

export function ButtonWithBadge({
  children,
  badgeValue,
  ...props
}: PropsWithChildren<IProps & React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button className="relative" {...props}>
      {children}
      <div className="absolute top-[-14px] left-[14px]">
        <div className="text-xs pt-[2px] px-[5px] bg-black text-white rounded-full">{badgeValue}</div>
      </div>
    </button>
  );
}
