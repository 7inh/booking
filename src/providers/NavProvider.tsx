import { useCallback, useMemo, useState } from "react";
import { NavContext } from "src/contexts/NavContext";

interface NavProviderProps {
    children: React.ReactNode;
}

interface NavState {
    open: boolean;
}

const NavProvider = ({ children }: NavProviderProps) => {
    const [state, setState] = useState<NavState>({
        open: true,
    });

    const toggle = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            open: !prevState.open,
        }));
    }, []);

    const value = useMemo(
        () => ({
            ...state,
            toggle,
        }),
        [state, toggle]
    );

    return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export default NavProvider;
