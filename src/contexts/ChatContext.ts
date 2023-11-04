import { createContext, useContext } from "react";

export interface ChatState {
    currentSelectedStoryId: string;
}

interface ChatContextProps extends ChatState {
    setCurrentSelectedStoryId: (storyId: string) => void;
}

const ChatContext = createContext<ChatContextProps>({
    currentSelectedStoryId: "",
    setCurrentSelectedStoryId: () => {},
});

ChatContext.displayName = "ChatContext";

const useChatContext = () => useContext(ChatContext);

export { ChatContext, useChatContext };
