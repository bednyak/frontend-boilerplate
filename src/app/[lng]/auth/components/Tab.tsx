"use client";

export enum TabOption {
  SIGN_IN = "signIn",
  SIGN_UP = "signUp",
}

interface IProps {
  onClick: (tab: TabOption) => void;
  text: string;
  tabOption: TabOption;
  isActive?: boolean;
}

export function Tab({ onClick, text, tabOption, isActive }: IProps) {
  const activeTextClass = isActive ? "text-black" : "text-mediumGray";
  const activeBoxClass = isActive ? "bg-flashGreen border-black" : "bg-mediumGray border-mediumGray";

  return (
    <button
      onClick={() => onClick(tabOption)}
      className={`
				flex
				items-center
				gap-2
				font-extrabold
				transition duration-300
				text-xl
				uppercase
				${activeTextClass}
			`}
    >
      <div
        className={`
				size-[12px]
				rounded-sm
				border
				mb-[4px]
				${activeBoxClass}
			`}
      ></div>
      <span>{text}</span>
    </button>
  );
}
