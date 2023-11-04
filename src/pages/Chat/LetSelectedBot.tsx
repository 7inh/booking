import { Avatar, Box } from "@mui/material";
import useTranslation from "src/hooks/utils/useTranslation";

const LetSelectedBot = () => {
    const t = useTranslation();

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Box
                sx={{
                    width: "80%",
                    height: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Box
                    width="80%"
                    sx={{
                        fontSize: "32px",
                    }}
                >
                    {t("message.clickOnABotInTheListToStartChatting")}
                </Box>

                <Avatar
                    src="/chatpanel_selectbot.svg"
                    sx={{
                        width: "100%",
                        height: "auto",
                    }}
                    imgProps={{ style: { objectFit: "contain" } }}
                    variant="square"
                />
            </Box>
        </Box>
    );
};

export default LetSelectedBot;
