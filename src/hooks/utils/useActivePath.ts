import { useLocation } from "react-router-dom";

const useActivePath = (path: string) => {
    const location = useLocation();

    if (path.includes("http")) return false;

    const currentPath = location.pathname;
    const root = path.split("/")[1];

    if (path === "/" || path === "#") {
        return currentPath === "/" || currentPath === "/auth/login";
    }

    return currentPath.startsWith(`/${root}`);
};

export default useActivePath;
