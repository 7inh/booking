import { InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const InputText = () => {
    return (
        <TextField
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
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchOutlinedIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default InputText;
