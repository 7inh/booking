import { Button, ButtonProps, Typography } from "@mui/material";

export interface ButtonPrimaryProps extends ButtonProps {
    children?: React.ReactNode;
    label?: string;
}

const ButtonPrimary = (props: ButtonPrimaryProps) => {
    const { children, label, sx, ...rest } = props;
    return (
        <Button
            {...rest}
            fullWidth
            sx={{
                bgcolor: "primary.main",
                color: "white",
                borderRadius: "8px",
                "&:hover": {
                    bgcolor: "primary.light",
                },
                ...sx,
            }}
        >
            {label ? (
                <Typography
                    sx={{
                        textTransform: "none",
                        fontSize: "14px",
                        fontWeight: 500,
                        py: 0.25,
                    }}
                >
                    {label}
                </Typography>
            ) : null}
            {children}
        </Button>
    );
};

export default ButtonPrimary;
