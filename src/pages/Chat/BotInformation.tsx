import { Box, Grid, Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { Capitalize } from "src/common/utils";
import BotPriceV3 from "src/components/Bot/BotPriceV3";
import useGetVoice from "src/hooks/useGetVoice";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BotInformationProps {
    botName: string;
    version: string;
    tags?: string[];
    language: string;
    voiceId: string;
    price?: number;
}

const BotInformation = (props: BotInformationProps) => {
    const { botName, version, tags = [], language, voiceId, price } = props;
    const t = useTranslation();

    const { data: voices } = useGetVoice({});

    const voiceNameByVoiceId = useMemo(() => {
        const voice = voices?.find((voice: any) => voice.id === voiceId);
        return voice?.name || "";
    }, [voiceId, voices]);

    const renderLabelWithValue = useCallback((label: string, value: string) => {
        return (
            <Grid container width="100%">
                <Grid item xs={5}>
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 700,
                            lineHeight: "22px",
                        }}
                    >
                        {label}
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography
                        sx={{
                            color: "#878787",
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: "22px",
                            wordBreak: "break-word",
                        }}
                    >
                        {value}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    return (
        <>
            <Box my={2}>
                <BotPriceV3 price={price} />
            </Box>
            <Stack mx={2} spacing={1.5}>
                {renderLabelWithValue(t("common.botName"), botName)}
                {renderLabelWithValue(t("common.version"), version)}
                {renderLabelWithValue(t("common.tags"), tags.join(", "))}
                {renderLabelWithValue(t("common.language"), Capitalize(language))}
                {renderLabelWithValue(t("common.voice"), voiceNameByVoiceId)}
            </Stack>
        </>
    );
};

export default BotInformation;
