export function calculateResponsive() {
  let isTablet =
    window.screen.availWidth <= 768 && window.screen.availWidth > 425;
  let isMobile = window.screen.availWidth <= 425;

  return {
    isMobile: isMobile,
    isTablet: isTablet,
    isDark:
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  };
}
