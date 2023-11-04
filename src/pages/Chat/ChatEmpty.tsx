import { Box, Avatar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTranslation from "src/hooks/utils/useTranslation";

const ChatEmpty = () => {
    const t = useTranslation();
    const navigate = useNavigate();

    return (
        <Box
            width="100%"
            flexGrow={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Avatar
                src="/no_bot_found.svg"
                sx={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "400px",
                    px: "20px",
                    boxSizing: "border-box",
                }}
                variant="square"
            />
            <Typography
                mt={3}
                sx={{
                    fontSize: "24px",
                    fontWeight: 400,
                    textAlign: "center",
                }}
            >
                {t("message.noBotFound")}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    mt: 2,
                }}
            >
                <Button variant="outlined" onClick={() => navigate("/create-bot")}>
                    <Typography
                        sx={{
                            textTransform: "none",
                            flexShrink: 0,
                            fontWeight: 600,
                            fontSize: "14px",
                        }}
                        color="primary.main"
                    >
                        {t("common.createBot")}
                    </Typography>
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                        },
                    }}
                    onClick={() => navigate("/kami-store")}
                >
                    <Typography
                        sx={{
                            textTransform: "none",
                            flexShrink: 0,
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "white",
                        }}
                    >
                        {t("common.kamiStore")}
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default ChatEmpty;
