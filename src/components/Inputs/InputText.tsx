import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Button, InputAdornment, TextField, TextFieldProps } from "@mui/material";

export interface InputTextProps {
    sx?: TextFieldProps["sx"];
}

const InputText = ({ sx, ...props }: InputTextProps) => {
    return (
        <TextField
            {...props}
            size="small"
            sx={{
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "primary.main",
                        borderRadius: "1px",
                    },
                    "&:hover fieldset": {
                        borderColor: "primary.main",
                    },
                },
                "& .MuiInputBase-root": {
                    p: 0,
                },
                ...sx,
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            sx={{
                                boxShadow: "none",
                                p: 1,
                                borderRadius: "0 4px 4px 0",
                                "&:hover": {
                                    boxShadow: "none",
                                    bgcolor: "primary.light",
                                },
                            }}
                        >
                            <SearchOutlinedIcon />
                        </Button>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default InputText;
