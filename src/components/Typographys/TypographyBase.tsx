import Typography, { TypographyProps } from "@mui/material/Typography";

export interface TypographyBaseProps extends TypographyProps {
    children?: React.ReactNode;
}

const TypographyBase = ({ children, sx, ...rest }: TypographyBaseProps) => {
    return (
        <Typography
            {...rest}
            sx={{
                ...sx,
            }}
        >
            {children}
        </Typography>
    );
};

export default TypographyBase;
