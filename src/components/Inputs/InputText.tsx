import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Button, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface InputTextProps {
    sx?: TextFieldProps["sx"];
    onSearch?: (text: string) => void;
}

const InputText = ({ sx, onSearch, ...props }: InputTextProps) => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q") || "";
    const [search, setSearch] = useState("");

    const handleSearch = useCallback(() => {
        onSearch?.(search);
    }, [onSearch, search]);

    // clear search when q is empty
    useEffect(() => {
        if (!q) {
            setSearch("");
        }
    }, [q]);

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                    handleSearch();
                }
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
                            onClick={handleSearch}
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
