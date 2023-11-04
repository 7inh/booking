import { Box, Button, CardMedia, Typography } from "@mui/material";
import { DateTime } from "luxon";
import useTranslation from "src/hooks/utils/useTranslation";
import { getCardMessage } from "src/pages/Management/ManagementDetail/PublishBot/utils";

export interface CardMessageProps {
    createTime: string;
    publishState: string;
    botProfile: any;
    onPublishAgain: () => void;
}

const CardMessage = (props: CardMessageProps) => {
    const { createTime, publishState, botProfile, onPublishAgain } = props;

    const t = useTranslation();

    return (
        <Box
            sx={{
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CardMedia
                component="img"
                src={
                    publishState === "ACCEPT"
                        ? "/accept.svg"
                        : publishState === "DENY"
                        ? "/deny.svg"
                        : "/received.svg"
                }
                sx={{
                    height: "100%",
                    width: "auto",
                }}
            />
            <br />
            <Typography
                sx={{
                    color:
                        publishState === "ACCEPT"
                            ? "#4CAF50"
                            : publishState === "DENY"
                            ? "#F44336"
                            : "#1B1A57",
                    fontSize: "20px",
                    fontWeight: 500,
                }}
            >
                {t(`message.${getCardMessage(publishState)}`)}
            </Typography>
            <Typography
                sx={{
                    fontSize: "14px",
                    color: "#4F5E7B",
                }}
            >
                {publishState === "ACCEPT"
                    ? t("message.yourBotWillReadyWithin24h")
                    : t("message.requestedAt", {
                          time: DateTime.fromFormat(createTime, "dd/MM/yyyy HH:mm:ss").toFormat(
                              "HH:mm:ss dd-MM-yyyy"
                          ),
                      })}
            </Typography>
            <br />
            {!botProfile?.withDraw && (publishState === "DENY" || publishState === "ACCEPT") ? (
                <Button
                    variant="contained"
                    sx={{
                        boxShadow: "none",
                        borderRadius: "20px",
                        textTransform: "none",
                        "&:hover": {
                            boxShadow: "none",
                        },
                    }}
                    onClick={onPublishAgain}
                >
                    {t("common.publishAgain")}
                </Button>
            ) : null}
        </Box>
    );
};

export default CardMessage;
