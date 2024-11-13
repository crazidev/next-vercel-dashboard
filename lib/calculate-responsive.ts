import Cookies from "js-cookie";

export function calculateResponsive() {
  let isTablet =
    document.body.clientWidth <= 768 && document.body.clientWidth > 425;
  let isMobile = document.body.clientWidth <= 425;
  
  return {
    isMobile: isMobile,
    isTablet: isTablet,
    isDark: Cookies.get("theme") == "dark",
  };
}
