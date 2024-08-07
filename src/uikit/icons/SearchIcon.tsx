import React, { SVGProps } from "react";

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m18 18-3.86-3.86m0 0A7.111 7.111 0 1 0 4.083 4.083 7.111 7.111 0 0 0 14.14 14.14Z"
      />
    </svg>
  );
}
