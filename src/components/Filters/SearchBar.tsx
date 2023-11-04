import { TextField, InputAdornment } from "@mui/material";
import { IconSearchOutline } from "src/components/Icons/IconExternal";

export interface SearchBarProps {
    placeholder?: string;
    onSearch: (value: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
    const { placeholder, onSearch } = props;

    return (
        <TextField
            fullWidth
            placeholder={placeholder}
            variant="outlined"
            size="small"
            onChange={(e) => onSearch(e.target.value)}
            sx={{
                minWidth: "52px",
                "& .MuiInputBase-root": {
                    paddingLeft: 1.5,
                },
                "& fieldset": {
                    borderRadius: "8px",
                    borderColor: "rgba(145, 158, 171, 0.20)",
                    color: "rgba(145, 158, 171, 1)",
                },
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment
                        position="start"
                        sx={{
                            color: "rgba(145, 158, 171, 1)",
                        }}
                    >
                        <IconSearchOutline />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBar;
