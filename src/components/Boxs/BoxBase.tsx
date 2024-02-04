import React, { forwardRef } from "react";
import { Box, BoxProps } from "@mui/material";
import { scrollbarSx } from "src/common/sxs";

export interface BoxBaseProps extends BoxProps {
    children?: React.ReactNode;
    showBorder?: boolean;
}

const BoxBase = forwardRef<HTMLDivElement, BoxBaseProps>(
    ({ children, sx, showBorder, ...rest }, ref) => {
        return (
            <Box
                ref={ref}
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
    }
);

BoxBase.displayName = "BoxBase";

export default BoxBase;
