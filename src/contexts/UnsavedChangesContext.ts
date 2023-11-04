import { createContext, useContext } from "react";

export interface UnsavedChangesState {
    shouldBlock: boolean;
}

interface UnsavedChangesContextProps extends UnsavedChangesState {
    setShouldBlock: (shouldBlock: UnsavedChangesState["shouldBlock"]) => void;
}

const UnsavedChangesContext = createContext<UnsavedChangesContextProps>({
    shouldBlock: false,
    setShouldBlock: () => {},
});

UnsavedChangesContext.displayName = "UnsavedChangesContext";

const useUnsavedChangesContext = () => useContext(UnsavedChangesContext);

export { UnsavedChangesContext, useUnsavedChangesContext };
