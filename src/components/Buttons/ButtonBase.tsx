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
                borderRadius: rounded ? "50px" : "1px",
                boxShadow: "none",
                py: 1,
                bgcolor: rest.variant === "outlined" ? "" : "primary.main",
                "&:hover": {
                    backgroundColor:
                        rest.variant === "outlined"
                            ? theme.palette.primary.main
                            : theme.palette.primary.dark,
                    boxShadow: "none",
                    color:
                        rest.variant === "outlined" ? "secondary.main" : theme.palette.primary.main,
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
