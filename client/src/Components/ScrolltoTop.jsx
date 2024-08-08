import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrolltoTop({ children }) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children || null;
}

export default ScrolltoTop;
