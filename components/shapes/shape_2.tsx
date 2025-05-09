"use client";
import { useState, useEffect } from "react";

export function Shape2({ className }: { className: any }): JSX.Element {
  const [isDark, setDark] = useState(false);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        // xmlns:svgjs="http://svgjs.dev/svgjs"
        viewBox="0 0 600 600"
        opacity="0.6"
        className={className}
      >
        <path
          d="M10.329340934753418,594.6107788085938C-53.44311320781708,466.1676603953043,-98.0538905064265,152.39520835876465,0.4491018056869507,7.185628890991211C98.9520941178004,-138.02395057678223,251.04789904753366,68.26348050435384,305.83831787109375,158.98204040527344C360.6287366946538,249.70060030619305,202.84430948893228,201.4969940185547,164.8203582763672,279.34130859375C126.79640706380209,357.1856231689453,243.26347001393637,287.42516072591144,191.76646423339844,392.5149841308594C140.2694584528605,497.6048075358073,74.10179507732391,723.0538972218832,10.329340934753418,594.6107788085938C-53.44311320781708,466.1676603953043,-98.0538905064265,152.39520835876465,0.4491018056869507,7.185628890991211"
          fill='url("#SvgjsLinearGradient1004")'
          transform="matrix(0.81450625,-4.521417962255469e-17,4.521417962255469e-17,0.81450625,24.129473836827273,54.719175945568054)"
        ></path>
        <defs>
          <linearGradient id="SvgjsLinearGradient1004">
            <stop
              stopColor={isDark ? "var(--accent-2)" : "var(--accent-4)"}
              offset="0"
            ></stop>
            <stop
              stopColor={isDark ? "var(--gray-2)" : "var(--gray-3)"}
              offset="1"
            ></stop>
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}
