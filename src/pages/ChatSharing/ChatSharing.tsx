import { AppBar, Avatar, Box, Button, Container } from "@mui/material";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import LinkBase from "src/components/Links/LinkBase";
import useGetShareStory from "src/hooks/useGetShareStory";
import useTranslation from "src/hooks/utils/useTranslation";

const ChatSharing = () => {
    const { shareId = "" } = useParams();
    const t = useTranslation();

    const {
        data: { history = [] },
    } = useGetShareStory({ shareId });

    const renderBotAvatar = useMemo(() => {
        return (
            <Avatar
                variant="square"
                src="/kami_icon.svg"
                sx={{
                    bgcolor: "primary.main",
                    borderRadius: 1,
                }}
                imgProps={{
                    style: {
                        objectFit: "scale-down",
                        width: "60%",
                    },
                }}
            />
        );
    }, []);

    const renderUserAvatar = useMemo(() => {
        return (
            <Avatar
                variant="square"
                sx={{
                    borderRadius: 1,
                }}
            />
        );
    }, []);

    const renderNavbarHeader = useMemo(() => {
        return (
            <AppBar
                component="nav"
                position="sticky"
                sx={{
                    backgroundColor: "#100c21",
                }}
                elevation={0}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 2,
                    }}
                >
                    <LinkBase to="https://kamimind.ai/">
                        <Box
                            sx={{
                                width: "129px",
                                height: "57px",
                                backgroundImage: "url(/logo-kamimind.svg)",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                            }}
                        ></Box>
                    </LinkBase>
                    <LinkBase to="https://kamimind.ai/">
                        <Button
                            variant="contained"
                            sx={{
                                background: "#ff8367",
                                color: "#fff",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "22.4px",
                                letterSpacing: "0.2px",
                                borderRadius: "20px",
                                "&:hover": {
                                    background: "#ff8367",
                                    filter: "brightness(85%)",
                                },
                            }}
                        >
                            {t("auth.signIn")}
                        </Button>
                    </LinkBase>
                </Container>
            </AppBar>
        );
    }, [t]);

    return (
        <Box>
            {renderNavbarHeader}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {history.map((item: any) => {
                    const { key, role, content } = item;
                    return (
                        <Box
                            key={key}
                            sx={{
                                bgcolor: role === "assistant" ? "#F7F7F7" : "white",
                                width: "100%",
                                display: "flex",
                                borderBottom: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: 700,
                                    width: "100%",
                                    mx: "auto",
                                    my: 2,
                                    display: "flex",
                                }}
                            >
                                {role === "assistant" ? renderBotAvatar : renderUserAvatar}
                                <Box
                                    sx={{
                                        px: 2,
                                        mt: 1,
                                        fontSize: "14px",
                                        fontWeight: 400,
                                        "& pre": {
                                            textWrap: "wrap",
                                        },
                                        "& p": {
                                            whiteSpace: "pre-wrap",
                                            m: 0,
                                        },
                                        "& p ~ p": {
                                            mt: 1,
                                        },
                                        textAlign: "justify !important",
                                    }}
                                    borderRadius={2}
                                >
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default ChatSharing;
