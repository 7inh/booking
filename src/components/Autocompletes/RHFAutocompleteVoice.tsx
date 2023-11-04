import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import useGetVoice from "src/hooks/useGetVoice";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

export interface RHFAutocompleteVoiceProps {
    onChange?: () => void;
    disabled?: boolean;
}

const RHFAutocompleteVoice = (props: RHFAutocompleteVoiceProps) => {
    const { onChange, disabled } = props;

    const t = useTranslation();
    const methods = useFormContext();
    const { getValues } = methods;

    const { data: voices = [], isFetching } = useGetVoice({
        onSuccess: (data) => {
            if (data.length > 0) {
                if (!getValues("voiceId")) {
                    methods.setValue("voiceId", data[0]);
                }
            }
        },
    });

    return (
        <RHFAutocomplete
            size="small"
            name="voiceId"
            disableClearable
            loading={isFetching}
            label={t("common.voice")}
            helperText={t("form.helperText.voice")}
            options={voices}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props: any, option) => (
                <Fragment key={uuidv4()}>
                    <Box {...props} px={1} pb={1} display="flex" flexDirection="column">
                        <Typography variant="body1" width="100%">
                            {option.name}
                        </Typography>
                    </Box>
                </Fragment>
            )}
            sx={{
                "& fieldset": {
                    border: "1px solid rgba(145, 158, 171, 0.20)",
                    borderRadius: "8px",
                },
                "& label": {
                    color: "#919EAB",
                },
            }}
            disabled={disabled}
            onChange={onChange}
        />
    );
};

export default RHFAutocompleteVoice;
