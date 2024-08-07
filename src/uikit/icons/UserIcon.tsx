import { SVGProps } from "react";

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
      <path
        stroke={props.stroke || "#0a0003"}
        strokeWidth={1.5}
        d="M10.012 8.4a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM16.41 14.397c0 1.988 0 3.6-6.4 3.6s-6.4-1.612-6.4-3.6 2.865-3.6 6.4-3.6c3.534 0 6.4 1.612 6.4 3.6Z"
      />
    </svg>
  );
}
