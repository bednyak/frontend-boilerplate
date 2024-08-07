import { SVGProps } from "react";

export function NavMenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.836 16.17H4.169m11.667-6.167H4.169m6.667-6.167H4.169"
      />
    </svg>
  );
}
