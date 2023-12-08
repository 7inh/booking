import { Button, ButtonProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export interface CreateButtonProps extends Omit<ButtonProps, "color"> {
    onClick?: (event?: any) => void;
    label: string;
    rounded?: boolean;
    color?: string;
}

const ButtonBase = (props: CreateButtonProps) => {
    const { label, onClick, rounded, color, sx, ...rest } = props;
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
                borderColor: color,
                color,
                "&:hover": {
                    backgroundColor:
                        rest.variant === "outlined" ? theme.palette.primary.main : "primary.light",
                    boxShadow: "none",
                    color: "secondary.main",
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
