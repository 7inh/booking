import { Box, BoxProps } from "@mui/material";
import { scrollbarSx } from "src/common/sxs";

export interface BoxBaseProps extends BoxProps {
    children?: React.ReactNode;
}

const BoxBase = ({ children, sx, ...rest }: BoxBaseProps) => {
    return (
        <Box
            {...rest}
            sx={{
                scrollbarSx,
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default BoxBase;
