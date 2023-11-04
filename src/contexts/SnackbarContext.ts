import { ComponentProps, createContext, useContext } from "react";
import MuiAlert from "@mui/material/Alert";

export interface SnackbarData {
    message: string;
    severity: ComponentProps<typeof MuiAlert>["severity"];
    id: string;
}

interface SnackbarContextProps {
    snackbars: SnackbarData[];
    setSnackbars: (snackbars: SnackbarData[]) => void;
    addSnackbar: (snackbar: SnackbarData) => void;
    removeSnackbar: (id: string) => void;
}

const SnackbarContext = createContext<SnackbarContextProps>({
    snackbars: [],
    setSnackbars: () => {},
    addSnackbar: () => {},
    removeSnackbar: () => {},
});

SnackbarContext.displayName = "SnackbarContext";

const useSnackbarContext = () => useContext(SnackbarContext);

export { SnackbarContext, useSnackbarContext };
