import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Typography } from "@mui/material";
import { memo, useState } from "react";
import BotAvatar from "src/components/Bot/BotAvatar";
import LinkBase from "src/components/Links/LinkBase";
import useTranslation from "src/hooks/utils/useTranslation";
import BotInformation from "src/pages/Chat/BotInformation";
import HistoryList from "src/pages/Chat/HistoryList";
import InformationCollapse from "src/pages/Chat/InformationCollapse";

export interface InformationCardProps {
    botToken: string;
    botName: string;
    avatar: string;
    chatColor: string;
    description: string;
    version: string;
    tags?: string[];
    language: string;
    voiceId: string;
    isOwner?: boolean;
    price?: number;
}

const InformationCard = (props: InformationCardProps) => {
    const {
        botToken,
        botName,
        avatar,
        chatColor,
        description,
        version,
        tags = [],
        language,
        voiceId,
        isOwner,
        price,
    } = props;

    const t = useTranslation();

    const [isReadMore, setIsReadMore] = useState(false);

    return (
        <Box
            sx={{
                flexGrow: 1,
                width: "100%",
            }}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                px={2}
                textAlign="center"
                mt={2}
                mb={2}
            >
                <BotAvatar botName={botName} size="96px" src={avatar || ""} chatColor={chatColor} />
                <br />
                <LinkBase disabled={!isOwner} to={`/management/${botToken}`}>
                    <Typography
                        sx={{
                            fontSize: "16px",
                            fontWeight: 600,
                            lineHeight: "24px",
                            "&:hover": {
                                ...(botToken && {
                                    textDecoration: isOwner ? "underline" : "none",
                                    cursor: isOwner ? "pointer" : "default",
                                }),
                            },
                        }}
                    >
                        {botName || "..."}
                    </Typography>
                </LinkBase>

                <Box textAlign="left">
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 300,
                            lineHeight: "22px",
                            ...(!isReadMore
                                ? {
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      display: "-webkit-box",
                                      WebkitLineClamp: "2",
                                      WebkitBoxOrient: "vertical",
                                  }
                                : {}),
                        }}
                    >
                        {description}
                    </Typography>
                </Box>
                {description && description.length >= 80 ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            color: "primary.main",
                        }}
                        onClick={() => setIsReadMore(!isReadMore)}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "22px",
                            }}
                        >
                            {isReadMore ? t("common.showLess") : t("common.readMore")}
                        </Typography>
                        <ChevronRightIcon />
                    </Box>
                ) : null}
            </Box>
            <InformationCollapse title={t("common.information")}>
                <BotInformation
                    botName={botName}
                    version={version}
                    tags={tags}
                    language={language}
                    voiceId={voiceId}
                    price={price}
                />
            </InformationCollapse>
            <InformationCollapse title={t("common.history")}>
                <HistoryList botToken={botToken} />
            </InformationCollapse>
        </Box>
    );
};

export default memo(InformationCard);
