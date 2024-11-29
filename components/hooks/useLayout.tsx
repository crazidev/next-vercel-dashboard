import { useEffect, useState } from "react";

const useLayout = () => {
    const [state, setState] = useState({
        isMobile: false,
        isTablet: false,
    });

    function calculateResponsive() {
        var _document = document.body;
        let isTablet = _document.clientWidth <= 768 && _document.clientWidth > 425;
        let isMobile = _document.clientWidth <= 425;

        return {
            isMobile: isMobile,
            isTablet: isTablet,
        };
    }

    useEffect(() => {
        window.addEventListener("resize", (e) => {
            let value = calculateResponsive();
            setState((prevState) => ({
                ...prevState, // preserve previous state
                isMobile: value.isMobile,
                isTablet: value.isTablet,
            }));
        });
    }, []);

    return state;
}

export default useLayout;