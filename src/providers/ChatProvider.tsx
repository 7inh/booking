import { useCallback, useMemo, useState } from "react";
import { ChatContext, ChatState } from "src/contexts/ChatContext";

interface ChatProviderProps {
    children: React.ReactNode;
}

const ChatProvider = ({ children }: ChatProviderProps) => {
    const [state, setState] = useState<ChatState>({
        currentSelectedStoryId: "",
    });

    const setCurrentSelectedStoryId = useCallback((currentSelectedStoryId: string) => {
        setState((prevState) => ({
            ...prevState,
            currentSelectedStoryId,
        }));
    }, []);

    const value = useMemo(
        () => ({
            ...state,
            setCurrentSelectedStoryId,
        }),
        [state, setCurrentSelectedStoryId]
    );

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
