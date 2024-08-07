import { SVGProps } from "react";

export function MicrophoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12.686 4.667a2.667 2.667 0 0 0-5.334 0v4.445a2.667 2.667 0 1 0 5.334 0V4.667ZM16.235 9.11a6.224 6.224 0 0 1-6.223 6.222m0 0A6.224 6.224 0 0 1 3.79 9.11m6.223 6.223V18"
      />
    </svg>
  );
}
