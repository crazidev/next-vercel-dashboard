"use client";

import { useState, useEffect } from "react";

export function Shape1({ className }: { className: any }): JSX.Element {
  const [isDark, setDark] = useState(true);

  return (
    <>
      <svg
        id="sw-js-blob-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className={className}
      >
        {" "}
        <defs>
          {" "}
          <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
            {" "}
            <stop
              id="stop1"
              stopColor={isDark ? "var(--accent-2)" : "var(--accent-4)"}
              offset="0%"
            ></stop>{" "}
            <stop
              id="stop2"
              stopColor={isDark ? "var(--gray-3)" : "var(--gray-4)"}
              offset="100%"
            ></stop>{" "}
          </linearGradient>{" "}
        </defs>{" "}
        <path
          fill="url(#sw-gradient)"
          d="M22.1,-38.6C28.1,-35,31.7,-27.7,33.4,-20.7C35,-13.6,34.6,-6.8,33.9,-0.4C33.2,6,32.2,12,29.7,17.5C27.1,22.9,23,27.8,17.8,33C12.6,38.2,6.3,43.7,0.6,42.7C-5.1,41.6,-10.2,34.1,-12.8,27.4C-15.5,20.7,-15.6,14.9,-17.9,10.5C-20.2,6.1,-24.6,3,-29,-2.6C-33.4,-8.2,-37.9,-16.3,-35,-19.6C-32,-22.8,-21.6,-21.1,-14.6,-24.1C-7.5,-27.1,-3.7,-34.7,2.2,-38.5C8.1,-42.3,16.2,-42.2,22.1,-38.6Z"
          width="100%"
          height="100%"
          transform="translate(50 50)"
          strokeWidth="0"
          // style="transition: 0.3s;"
          stroke="url(#sw-gradient)"
        ></path>{" "}
      </svg>
    </>
  );
}
