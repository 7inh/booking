import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import useGetLanguageModel from "src/hooks/useGetLanguageModel";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

export interface RHFAutocompleteLLMProps {
    botToken?: string;
    onChange?: () => void;
}

const RHFAutocompleteLLM = (props: RHFAutocompleteLLMProps) => {
    const { botToken, onChange } = props;

    const t = useTranslation();
    const methods = useFormContext();
    const { getValues } = methods;

    const { data: languageModels } = useGetLanguageModel({
        botToken,
        onSuccess: (data) => {
            if (data.length > 0) {
                if (!getValues("llm")) {
                    const defaultModel = data.find((item: any) => item.default);
                    methods.setValue("llm", defaultModel || data[0]);
                }
            }
        },
    });

    return (
        <RHFAutocomplete
            required
            size="small"
            name="llm"
            label={t("common.languageModel")}
            helperText={t("form.helperText.languageModel")}
            disableClearable
            options={languageModels}
            getOptionLabel={(option: any) => option.modelName}
            isOptionEqualToValue={(option, value) => option.modelName === value.modelName}
            renderOption={(props: any, option) => (
                <Fragment key={uuidv4()}>
                    <Box {...props} px={1} pb={1} display="flex" flexDirection="column">
                        <Typography variant="body1" width="100%">
                            {option.modelName}
                        </Typography>
                        <Typography variant="caption" width="100%">
                            {t("common.price")}: {option.price}
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
            onChange={onChange}
        />
    );
};

export default RHFAutocompleteLLM;
