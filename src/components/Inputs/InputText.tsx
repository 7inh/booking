import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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
                    pr: 0.5,
                },
                ...sx,
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                            <SearchOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default InputText;
