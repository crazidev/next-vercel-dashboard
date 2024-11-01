import Cookies from "js-cookie";

export function calculateResponsive() {
  let isTablet =
    window.screen.availWidth <= 768 && window.screen.availWidth > 425;
  let isMobile = window.screen.availWidth <= 425;

  return {
    isMobile: isMobile,
    isTablet: isTablet,
    isDark: Cookies.get("theme") == "dark",
  };
}
