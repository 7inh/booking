import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Button, InputAdornment, TextField, TextFieldProps } from "@mui/material";

export interface InputTextProps {
    sx?: TextFieldProps["sx"];
}

const InputText = ({ sx, ...props }: InputTextProps) => {
    return (
        <TextField
            {...props}
            fullWidth
            size="small"
            sx={{
                width: "300px",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "#E0E0E0",
                    },
                    "&:hover fieldset": {
                        borderColor: "#E0E0E0",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#E0E0E0",
                    },
                },
                "& .MuiInputBase-root": {
                    pr: 0.2,
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
