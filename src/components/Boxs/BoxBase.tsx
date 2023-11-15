import { Box, BoxProps } from "@mui/material";
import { scrollbarSx } from "src/common/sxs";

export interface BoxBaseProps extends BoxProps {
    children?: React.ReactNode;
    showBorder?: boolean;
}

const BoxBase = ({ children, sx, showBorder, ...rest }: BoxBaseProps) => {
    return (
        <Box
            {...rest}
            sx={{
                scrollbarSx,
                border: showBorder ? "1px solid" : "none",
                borderColor: "grey.300",
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default BoxBase;
