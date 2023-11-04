import { Avatar, Box, BoxProps, Grid, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useCallback, useMemo } from "react";
import { toCapitalize } from "src/common/utils";
import useGetVoice from "src/hooks/useGetVoice";
import useTranslation from "src/hooks/utils/useTranslation";

export interface InformationAndAuthorProps extends BoxProps {
    version: string;
    tags: string[];
    language: string;
    voiceId: string;
    createTime: string;
    description: string;
    publishManual: string;
    publishNote: string;
    userAvt: string;
    authName: string;
    userBio: string;
}

const InformationAndAuthor = ({
    version,
    tags,
    language,
    voiceId,
    createTime,
    description,
    publishManual,
    publishNote,
    userAvt,
    authName,
    userBio,
    sx,
    ...props
}: InformationAndAuthorProps) => {
    const t = useTranslation();

    const { data: voices } = useGetVoice({});

    const voiceNameByVoiceId = useMemo(() => {
        const voice = voices.find((voice: any) => voice.id === voiceId);
        return voice?.name || "";
    }, [voices, voiceId]);

    const renderDataWithLabel = useCallback((label: string, data: string) => {
        return (
            <Grid container>
                <Grid item xs={3}>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#212B36",
                        }}
                    >
                        {label}
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#212B36",
                        }}
                    >
                        {data}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    return (
        <Box
            sx={{
                display: "grid",
                gridAutoRows: "1fr",
                gap: "16px",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "calc(70% - 16px) 30%",
                },
                ...sx,
            }}
            {...props}
        >
            <Box>
                <Typography
                    sx={{
                        fontSize: "22px",
                        fontWeight: 600,
                        color: "#1B1A57",
                        mb: 1.5,
                    }}
                >
                    {t("common.information")}
                </Typography>
                <Box
                    sx={{
                        boxShadow:
                            "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
                        borderRadius: "16px",
                    }}
                >
                    <Box
                        sx={{
                            py: 4,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
                        {renderDataWithLabel(t("common.version"), version)}
                        {renderDataWithLabel(t("common.tags"), tags.join(", "))}
                        {renderDataWithLabel(t("common.language"), toCapitalize(language))}
                        {renderDataWithLabel(t("common.voice"), voiceNameByVoiceId)}
                        {renderDataWithLabel(
                            t("common.createdAt"),
                            DateTime.fromFormat(createTime, "dd/MM/yyyy HH:mm:ss").toFormat(
                                "HH:mm:ss dd-MM-yyyy"
                            )
                        )}
                        {renderDataWithLabel(t("common.description"), description)}
                        {renderDataWithLabel(t("common.manual"), publishManual)}
                        {renderDataWithLabel(t("common.note"), publishNote)}
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "22px",
                        fontWeight: 600,
                        color: "#1B1A57",
                        mb: 1.5,
                    }}
                >
                    {t("common.author")}
                </Typography>
                <Box
                    sx={{
                        boxShadow:
                            "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
                        borderRadius: "16px",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        px: 4,
                    }}
                >
                    <Avatar
                        src={userAvt}
                        sx={{ width: 126, height: 126, fontSize: "80px" }}
                        imgProps={{ style: { objectFit: "contain" } }}
                    >
                        {authName
                            ?.split(" ")
                            .map((name: string) => name.charAt(0))
                            .splice(0, 2)}
                    </Avatar>
                    <br />
                    <Typography
                        sx={{
                            fontSize: "18px",
                            fontWeight: 600,
                            textAlign: "center",
                            wordBreak: "break-word",
                        }}
                    >
                        {authName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "#4F5E7B",
                            textAlign: "center",
                        }}
                    >
                        {userBio}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default InformationAndAuthor;
