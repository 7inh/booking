import { createContext, useContext } from "react";

interface NavContextProps {
    open: boolean;
    toggle: () => void;
}

const NavContext = createContext<NavContextProps>({
    open: false,
    toggle: () => {},
});

NavContext.displayName = "NavContext";

const useNavContext = () => useContext(NavContext);

export { NavContext, useNavContext };
