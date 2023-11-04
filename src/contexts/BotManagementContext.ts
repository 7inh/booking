import { createContext, useContext } from "react";

export interface BotManagementState {
    state: "loading" | "loaded" | "empty";
    currentSelectedSourceId: number;
    currentSelectedSourceState: string;
    isProcessing: boolean;
    isFilterErrorDocument: boolean;
    searchText: string;
    documentProcessValue: number;
}

interface BotManagementContextProps extends BotManagementState {
    setManagementState: (isEmpty: BotManagementState["state"]) => void;
    setIsProcessing: (isProcessing: boolean) => void;
    setCurrentSelectedSourceId: (sourceId: number) => void;
    setCurrentSelectedSourceState: (sourceState: string) => void;
    setSearchText: (searchText: string) => void;
    setIsFilterErrorDocument: (isFilterErrorDocument: boolean) => void;
    setDocumentProcessValue: (documentProcessValue: number) => void;
}

const BotManagementContext = createContext<BotManagementContextProps>({
    state: "loading",
    setManagementState: () => {},
    isProcessing: false,
    setIsProcessing: () => {},
    currentSelectedSourceId: -1,
    setCurrentSelectedSourceId: () => {},
    currentSelectedSourceState: "",
    setCurrentSelectedSourceState: () => {},
    searchText: "",
    setSearchText: () => {},
    isFilterErrorDocument: false,
    setIsFilterErrorDocument: () => {},
    documentProcessValue: 100,
    setDocumentProcessValue: () => {},
});

BotManagementContext.displayName = "BotManagementContext";

const useBotManagementContext = () => useContext(BotManagementContext);

export { BotManagementContext, useBotManagementContext };
