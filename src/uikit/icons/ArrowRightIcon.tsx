import { SVGProps } from "react";

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={12} fill="none" {...props}>
      <path
        fill="#000"
        d="M1 5.25a.75.75 0 0 0 0 1.5v-1.5Zm12.53 1.28a.75.75 0 0 0 0-1.06L8.757.697a.75.75 0 1 0-1.06 1.06L11.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06L13.53 6.53ZM1 6.75h12v-1.5H1v1.5Z"
      />
    </svg>
  );
}
