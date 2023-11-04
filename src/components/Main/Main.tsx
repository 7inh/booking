import Box, { BoxProps } from "@mui/material/Box";

export default function Main({ children, sx, ...other }: BoxProps) {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                overflow: "auto",
                height: "100%",
                ...sx,
            }}
            {...other}
        >
            {children}
        </Box>
    );
}
