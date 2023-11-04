import { InputAdornment, IconButton } from "@mui/material";
import { IconSearchOutline } from "src/components/Icons/IconExternal";
import RHFTextField from "src/components/RHFs/RHFTextField";

export interface SearchBarRHFProps {
    placeholder?: string;
}

const SearchBarRHF = (props: SearchBarRHFProps) => {
    const { placeholder } = props;

    return (
        <RHFTextField
            fullWidth
            name="search"
            sx={{
                "& fieldset": {
                    borderRadius: "8px",
                    borderColor: "rgba(145, 158, 171, 0.20)",
                    color: "rgba(145, 158, 171, 1)",
                },
                "& .MuiInputBase-root": {
                    pr: 0.25,
                },
            }}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            InputProps={{
                endAdornment: (
                    <InputAdornment
                        position="end"
                        sx={{
                            color: "rgba(145, 158, 171, 1)",
                        }}
                    >
                        <IconButton type="submit">
                            <IconSearchOutline />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBarRHF;
