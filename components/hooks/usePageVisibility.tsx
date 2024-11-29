import { useState, useEffect } from "react";

function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof document === "undefined") return true; // Default to true on the server
    return !document.hidden;
  });

  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

export default usePageVisibility;
