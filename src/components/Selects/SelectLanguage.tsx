import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { flagIcon } from "src/common/utils";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useTranslationContext } from "src/contexts/TranslationContext";
import { ListLocale, LocaleType } from "src/locales/types";

export interface SelectLanguageProps {
    fullWidth?: boolean;
}

const SelectLanguage = ({ fullWidth }: SelectLanguageProps) => {
    const { locale, setLocale, extendTranslation } = useTranslationContext();

    const handleChange = (event: SelectChangeEvent) => {
        setLocale(event.target.value as LocaleType);
    };

    return (
        <Select
            value={locale}
            size="small"
            onChange={handleChange}
            sx={{
                borderRadius: "1px",
                bgcolor: "background.paper",
                "& fieldset": {
                    border: "1px solid #D72323",
                },
                "& .MuiSelect-select": {
                    py: 0,
                    px: 1,
                },
                width: fullWidth ? "100%" : "auto",
            }}
            renderValue={(selected) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TypographyBase
                        sx={{
                            fontSize: "16px",
                            fontWeight: 400,
                        }}
                    >
                        {fullWidth ? extendTranslation(selected, "currentLanguage") : null}
                    </TypographyBase>
                    <Typography fontSize="40px" lineHeight={1}>
                        {flagIcon(selected)}
                    </Typography>
                </Box>
            )}
        >
            {ListLocale.map((locale) => (
                <MenuItem
                    key={locale}
                    value={locale}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <Typography>{extendTranslation(locale, "currentLanguage")}</Typography>
                    <Typography>{flagIcon(locale)}</Typography>
                </MenuItem>
            ))}
        </Select>
    );
};

export default SelectLanguage;
