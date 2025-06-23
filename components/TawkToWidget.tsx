"use client";

import { useEffect } from "react";

const TawkToWidget = ({
  accountKey = process.env.NEXT_PUBLIC_Tawk_AccountKey,
  widgetId = process.env.NEXT_PUBLIC_Tawk_WidgetId,
  unstable = false,
}) => {
  useEffect(() => {
    if (accountKey === undefined || widgetId === undefined) {
      return;
    }

    // Set global variables
    window.$_Tawk_AccountKey = accountKey;
    window.$_Tawk_WidgetId = widgetId;
    window.$_Tawk_Unstable = unstable;
    window.$_Tawk = window.$_Tawk || {};

    const initializeTawk = () => {
      // Prevent multiple initializations
      // @ts-ignore
      if (window.$_Tawk.init !== undefined) {
        return;
      }

      // @ts-ignore
      window.$_Tawk.init = true;

      const files = [
        "https://embed.tawk.to/_s/v4/app/685389b9a70/js/twk-main.js",
        "https://embed.tawk.to/_s/v4/app/685389b9a70/js/twk-vendor.js",
        "./tawk.to/twk-chunk-vendors.js",
        "https://embed.tawk.to/_s/v4/app/685389b9a70/js/twk-chunk-common.js",
        "https://embed.tawk.to/_s/v4/app/685389b9a70/js/twk-runtime.js",
        "https://embed.tawk.to/_s/v4/app/685389b9a70/js/twk-app.js",
      ];

      // Add polyfills if needed
      if (typeof Promise === "undefined") {
        files.unshift(
          "https://embed.tawk.to/_s/v4/app/685389b9a70/js/twk-promise-polyfill.js"
        );
      }

      if (
        typeof Symbol === "undefined" ||
        typeof Symbol.iterator === "undefined"
      ) {
        files.unshift(
          "https://embed.tawk.to/_s/v4/app/685389b9a70/js/twk-iterator-polyfill.js"
        );
      }

      if (typeof Object.entries === "undefined") {
        files.unshift(
          "https://embed.tawk.to/_s/v4/app/685389b9a70/js/twk-entries-polyfill.js"
        );
      }

      if (!window.crypto) {
        (window as any).crypto = (window as any).msCrypto;
      }

      if (typeof Event !== "function") {
        files.unshift(
          "https://embed.tawk.to/_s/v4/app/685389b9a70/js/twk-event-polyfill.js"
        );
      }

      if (!Object.values) {
        files.unshift(
          "https://embed.tawk.to/_s/v4/app/685389b9a70/js/twk-object-values-polyfill.js"
        );
      }

      if (typeof Array.prototype.find === "undefined") {
        files.unshift(
          "https://embed.tawk.to/_s/v4/app/685389b9a70/js/twk-arr-find-polyfill.js"
        );
      }

      // Load scripts
      const firstScript = document.getElementsByTagName("script")[0];

      files.forEach((src) => {
        const script = document.createElement("script");
        script.src = src;
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");
        script.async = true;
        firstScript.parentNode.insertBefore(script, firstScript);
      });
    };

    // Initialize based on document ready state
    if (document.readyState === "complete") {
      initializeTawk();
    } else {
      const handleLoad = () => {
        initializeTawk();
        window.removeEventListener("load", handleLoad);
      };

      window.addEventListener("load", handleLoad, false);

      // Cleanup function
      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, [accountKey, widgetId, unstable]);
  // This component doesn't render anything visible
  return null;
};

export default TawkToWidget;
