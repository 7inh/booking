import { useCallback, useMemo, useState } from "react";
import { UnsavedChangesContext, UnsavedChangesState } from "src/contexts/UnsavedChangesContext";

interface UnsavedChangesProviderProps {
    children: React.ReactNode;
}

const UnsavedChangesProvider = ({ children }: UnsavedChangesProviderProps) => {
    const [state, setState] = useState<UnsavedChangesState>({
        shouldBlock: false,
    });

    const setShouldBlock = useCallback(
        (shouldBlock: boolean) => {
            setState((prevState) => ({ ...prevState, shouldBlock }));
        },
        [setState]
    );

    const value = useMemo(
        () => ({
            ...state,
            setShouldBlock,
        }),
        [state, setShouldBlock]
    );

    return (
        <UnsavedChangesContext.Provider value={value}>{children}</UnsavedChangesContext.Provider>
    );
};

export default UnsavedChangesProvider;
