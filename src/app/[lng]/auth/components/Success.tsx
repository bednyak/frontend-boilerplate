"use client";

import Image from "next/image";

interface IProps {
  title: string;
  icon?: string;
}

const ICON_SIZE = 120;

// display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100%;

export function Success({ title, icon = "check-green-success" }: IProps) {
  const formattedTitle = title.split("\n").map((str, index) => (
    <h2 className="text-center text-gray-700 text-xl font-black uppercase" key={`${str}-${index}`}>
      {str}
    </h2>
  ));

  return (
    <div className="flex flex-col items-center justify-center h-full gap-20 p-[40px]">
      <div>{formattedTitle}</div>
      <Image
        className="mb-[2px]"
        width={ICON_SIZE}
        height={ICON_SIZE}
        alt={title}
        src={`/icons/${icon}.svg`}
        unoptimized
      />
    </div>
  );
}
