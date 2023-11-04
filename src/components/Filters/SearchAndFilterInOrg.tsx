import { InputAdornment } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FilterInOrg } from "src/common/types";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useTranslation from "src/hooks/utils/useTranslation";
import SearchIcon from "@mui/icons-material/Search";
import FormProvider from "src/providers/FormProvider";

export interface SearchAndFilterInOrgProps {
    searchLabel?: string;
    onApply?: (data: FilterInOrg) => void;
}

const defaultValues: FilterInOrg = {
    search: "",
    groups: null,
};

const SearchAndFilterInOrg = (props: SearchAndFilterInOrgProps) => {
    const { searchLabel, onApply } = props;

    const t = useTranslation();

    const methods = useForm<FilterInOrg>({
        defaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit = useCallback(
        (data: FilterInOrg) => {
            console.log(data);
            onApply?.(data);
        },
        [onApply]
    );

    return (
        <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                width: "100%",
            }}
        >
            <RHFTextField
                fullWidth
                size="small"
                name="search"
                label={searchLabel || t("common.search")}
                sx={{
                    "& fieldset": {
                        border: "1px solid rgba(145, 158, 171, 0.20)",
                        borderRadius: "8px",
                    },
                    "& label": {
                        color: "#919EAB",
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </FormProvider>
    );
};

export default SearchAndFilterInOrg;
