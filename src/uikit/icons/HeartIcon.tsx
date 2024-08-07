import { SVGProps } from "react";

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={16} fill="none" {...props}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m15.69 9.082-5.348 5.349a1.89 1.89 0 0 1-2.674 0L2.321 9.083A4.726 4.726 0 1 1 9.005 2.4a4.726 4.726 0 0 1 6.684 6.683Z"
      />
    </svg>
  );
}
