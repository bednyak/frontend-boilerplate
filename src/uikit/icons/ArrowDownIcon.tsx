import { SVGProps } from "react";

export function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m4.01 6.42 5.995 5.994L16 6.42"
      />
    </svg>
  );
}
