import { useCallback, useMemo, useState } from "react";
import { BotManagementContext, BotManagementState } from "src/contexts/BotManagementContext";

interface BotManagementProviderProps {
    children: React.ReactNode;
}

const BotManagementProvider = ({ children }: BotManagementProviderProps) => {
    const [state, setState] = useState<BotManagementState>({
        state: "loading",
        currentSelectedSourceId: -1,
        isProcessing: false,
        searchText: "",
        currentSelectedSourceState: "",
        isFilterErrorDocument: false,
        documentProcessValue: 0,
    });

    const setCurrentSelectedSourceId = useCallback((currentSelectedSourceId: number) => {
        setState((prevState) => ({
            ...prevState,
            currentSelectedSourceId,
        }));
    }, []);

    const setIsProcessing = useCallback((isProcessing: boolean) => {
        setState((prevState) => ({
            ...prevState,
            isProcessing,
        }));
    }, []);

    const setSearchText = useCallback((searchText: string) => {
        setState((prevState) => ({
            ...prevState,
            searchText,
        }));
    }, []);

    const setCurrentSelectedSourceState = useCallback((currentSelectedSourceState: string) => {
        setState((prevState) => ({
            ...prevState,
            currentSelectedSourceState,
        }));
    }, []);

    const setIsFilterErrorDocument = useCallback((isFilterErrorDocument: boolean) => {
        setState((prevState) => ({
            ...prevState,
            isFilterErrorDocument,
        }));
    }, []);

    const setDocumentProcessValue = useCallback((documentProcessValue: number) => {
        setState((prevState) => ({
            ...prevState,
            documentProcessValue,
        }));
    }, []);

    const setManagementState = useCallback((state: BotManagementState["state"]) => {
        setState((prevState) => ({
            ...prevState,
            state,
        }));
    }, []);

    const value = useMemo(
        () => ({
            ...state,
            setManagementState,
            setCurrentSelectedSourceId,
            setIsProcessing,
            setSearchText,
            setCurrentSelectedSourceState,
            setIsFilterErrorDocument,
            setDocumentProcessValue,
        }),
        [
            state,
            setManagementState,
            setCurrentSelectedSourceId,
            setIsProcessing,
            setSearchText,
            setCurrentSelectedSourceState,
            setIsFilterErrorDocument,
            setDocumentProcessValue,
        ]
    );

    return <BotManagementContext.Provider value={value}>{children}</BotManagementContext.Provider>;
};

export default BotManagementProvider;
