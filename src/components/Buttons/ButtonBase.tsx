import { Button, ButtonProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export interface CreateButtonProps extends ButtonProps {
    onClick?: (event?: any) => void;
    label: string;
    rounded?: boolean;
}

const ButtonBase = (props: CreateButtonProps) => {
    const { label, onClick, rounded, sx, ...rest } = props;
    const theme = useTheme();

    return (
        <Button
            variant="contained"
            onClick={onClick}
            sx={{
                textTransform: "none",
                borderRadius: rounded ? "50px" : "8px",
                boxShadow: "none",
                color: "#fff",
                "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                    boxShadow: "none",
                },
                ...sx,
            }}
            {...rest}
        >
            {label}
        </Button>
    );
};

export default ButtonBase;
