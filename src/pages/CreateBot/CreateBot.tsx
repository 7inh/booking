import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonNewIndex from "src/components/Buttons/ButtonNewIndex";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import FormCreateBot from "src/components/Forms/FormCreateBot";
import { IconKnowledgeBase, IconProfile } from "src/components/Icons/IconExternal";
import useTranslation from "src/hooks/utils/useTranslation";

const FORM_ID = "create-bot-form";

const CreateBot = () => {
    const t = useTranslation();
    const navigate = useNavigate();

    const [tab, setTab] = useState(0);
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [shouldIndexer, setShouldIndexer] = useState(false);
    const [sourceLength, setSourceLength] = useState(0);
    const [botToken, setBotToken] = useState("");

    const handleChangeChatTab = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const renderBotProfile = useMemo(
        () => (
            <Box
                visibility={tab === 0 ? "visible" : "hidden"}
                height={tab === 0 ? "auto" : 0}
                overflow={tab === 0 ? "visible" : "hidden"}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Box maxWidth="1116px" width="100%">
                    <FormCreateBot
                        id={FORM_ID}
                        mt={5}
                        shouldSubmit={shouldSubmit}
                        onCreateSuccess={(botToken) => {
                            if (botToken && sourceLength > 0) {
                                setTab(1);
                                setBotToken(botToken);
                                setShouldIndexer(true);
                            } else if (botToken) {
                                navigate("/management");
                            }
                        }}
                    />
                </Box>
            </Box>
        ),
        [navigate, shouldSubmit, sourceLength, tab]
    );

    const renderKnowledgeBase = useMemo(
        () => (
            <Box
                visibility={tab === 1 ? "visible" : "hidden"}
                height={tab === 1 ? "auto" : 0}
                overflow="hidden"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Box maxWidth="1116px" width="100%">
                    <ButtonNewIndex
                        mt={5}
                        botToken={botToken}
                        shouldSubmit={shouldIndexer}
                        onChangeSourceLength={(length) => setSourceLength(length)}
                        onIndexerSuccess={() => {
                            navigate("/management");
                        }}
                    />
                </Box>
            </Box>
        ),
        [botToken, navigate, shouldIndexer, tab]
    );

    useEffect(() => {
        if (shouldSubmit) {
            setShouldSubmit(false);
        }
    }, [shouldSubmit]);

    useEffect(() => {
        if (shouldIndexer) {
            setShouldIndexer(false);
        }
    }, [shouldIndexer]);

    return (
        <Box display="flex" height="100%">
            <Box px={4} width="100%" boxSizing="border-box" minWidth="900px" height="100%">
                <CustomBreadcrumbs
                    heading={t("page.createBot.title")}
                    links={[
                        {
                            href: "/create-bot",
                            name: t("page.createBot.title"),
                        },
                    ]}
                />

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                    <Tabs value={tab} onChange={handleChangeChatTab}>
                        <Tab
                            label={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <IconProfile />
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            textTransform: "none",
                                            fontWeight: 600,
                                            lineHeight: "22px",
                                        }}
                                    >
                                        {t("common.profile")}
                                    </Typography>
                                </Box>
                            }
                        />
                        <Tab
                            label={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <IconKnowledgeBase />
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            textTransform: "none",
                                            fontWeight: 600,
                                            lineHeight: "22px",
                                        }}
                                    >
                                        {t("common.knowledgeBase")}
                                    </Typography>
                                </Box>
                            }
                        />
                    </Tabs>

                    <LoadingButton
                        color="inherit"
                        size="small"
                        variant="contained"
                        onClick={() => {
                            setTab(0);
                            setShouldSubmit(true);
                        }}
                        sx={(theme) => ({
                            height: "36px",
                            boxShadow: 0,
                            backgroundColor: theme.palette.primary.main,
                            color: "#fff",
                            textTransform: "none",
                            borderRadius: "8px",
                            "&:hover": {
                                boxShadow: 0,
                                backgroundColor: theme.palette.primary.dark,
                            },
                        })}
                    >
                        {t("common.createBot")}
                    </LoadingButton>
                </Box>

                {renderBotProfile}
                {renderKnowledgeBase}
                <br />
            </Box>
        </Box>
    );
};

export default CreateBot;
