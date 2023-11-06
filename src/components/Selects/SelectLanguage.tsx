import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { flagIcon } from "src/common/utils";
import { useTranslationContext } from "src/contexts/TranslationContext";
import { ListLocale, LocaleType } from "src/locales/types";

const SelectLanguage = () => {
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
                bgcolor: "background.paper",
                "& fieldset": {
                    border: "1px solid rgba(145, 158, 171, 0.20)",
                },
                "& .MuiSelect-select": {
                    py: 0,
                    px: 1,
                },
            }}
            renderValue={(selected) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
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
