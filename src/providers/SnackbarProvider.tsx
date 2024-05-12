import { useCallback, useEffect, useMemo, useState } from "react";
import SnackBarStack from "src/components/SnackbarStack/SnackBarStack";
import { SnackbarContext } from "src/contexts/SnackbarContext";
import { SnackbarData } from "src/contexts/SnackbarContext";
import useTranslation from "src/hooks/utils/useTranslation";

interface SnackbarProviderProps {
    children: React.ReactNode;
}

interface SnackbarState {
    snackbars: SnackbarData[];
}

const SnackBarProvider = ({ children }: SnackbarProviderProps) => {
    const t = useTranslation();
    const [state, setState] = useState<SnackbarState>({
        snackbars: [],
    });

    const setSnackbars = useCallback((newSnackbar: SnackbarData[]) => {
        setState((prevState) => ({
            ...prevState,
            snackbars: newSnackbar,
        }));
    }, []);

    const addSnackbar = useCallback((newSnackbar: SnackbarData) => {
        setState((prevState) => ({
            ...prevState,
            snackbars: [newSnackbar, ...prevState.snackbars].slice(0, 3),
        }));
    }, []);

    const removeSnackbar = useCallback((id: string) => {
        setState((prevState) => ({
            ...prevState,
            snackbars: prevState.snackbars.filter((snackbar) => snackbar.id !== id),
        }));
    }, []);

    const value = useMemo(
        () => ({
            ...state,
            setSnackbars,
            addSnackbar,
            removeSnackbar,
        }),
        [state, setSnackbars, addSnackbar, removeSnackbar]
    );

    useEffect(() => {
        const handler = () => {
            addSnackbar({
                message: t("error.netWorkError"),
                severity: "error",
                id: "network-err",
            });
        };

        window.addEventListener("net-work-err", handler);

        return () => {
            window.removeEventListener("net-work-err", handler);
        };
    }, [addSnackbar, t]);

    return (
        <SnackbarContext.Provider value={value}>
            <SnackBarStack />
            {children}
        </SnackbarContext.Provider>
    );
};

export default SnackBarProvider;
