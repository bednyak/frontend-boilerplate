import { SVGProps } from "react";

export function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 20}
      height={props.height || 20}
      fill="none"
      {...props}
    >
      <path
        stroke={props.stroke || "#717171"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.005 18.01a8.005 8.005 0 1 0 0-16.01 8.005 8.005 0 0 0 0 16.01ZM10.008 13.209v-3.202m0-3.202h.008"
      />
    </svg>
  );
}
