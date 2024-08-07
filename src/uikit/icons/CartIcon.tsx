import { SVGProps } from "react";

export function CartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M1.016 1H4.02l1.07 10.643a1.23 1.23 0 0 0 1.23 1.045h7.752a1.23 1.23 0 0 0 1.23-.836L16.94 6.93a1.229 1.229 0 0 0-.172-1.107 1.23 1.23 0 0 0-1.059-.517H4.451m9.412 11.688a.615.615 0 1 1 0-1.23.615.615 0 0 1 0 1.23Zm-7.997 0a.615.615 0 1 1 0-1.23.615.615 0 0 1 0 1.23Z"
      />
    </svg>
  );
}
