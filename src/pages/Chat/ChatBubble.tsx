import { Box } from "@mui/material";

export interface ChatBubbleProps {
    children: React.ReactNode;
}

const ChatBubble = ({ children }: ChatBubbleProps) => {
    return (
        <Box
            sx={{
                // background color near pink
                backgroundColor: "#FF7748",
                maxWidth: "50%",
                borderRadius: 2,
                p: 2,
                boxSizing: "border-box",
                position: "absolute",
                bottom: "65%",
                zIndex: 1,
                color: "white",
                ":after": {
                    content: "''",
                    position: "absolute",
                    width: 0,
                    height: 0,
                    borderLeft: "30px solid transparent",
                    borderRight: "30px solid transparent",
                    borderTop: "30px solid #FF7748",
                    left: "70%",
                    bottom: "-30px",
                },
            }}
        >
            {children}
        </Box>
    );
};

export default ChatBubble;
