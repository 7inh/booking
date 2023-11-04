import { forwardRef } from "react";
// @mui
import Box, { BoxProps } from "@mui/material/Box";

// ----------------------------------------------------------------------

export interface SvgColorProps extends BoxProps {
    src: string;
    isDisabled?: boolean;
}

export const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
    ({ src, isDisabled, sx, ...other }, ref) => (
        <Box
            component="span"
            ref={ref}
            sx={{
                width: 24,
                height: 24,
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                filter: isDisabled ? "grayscale(100%)" : "none",
                ...sx,
            }}
            {...other}
        />
    )
);

SvgColor.displayName = "SvgColor";

const IconCommon = {
    save: (isDisabled?: boolean) => <SvgColor isDisabled={isDisabled} src={"/icons/save.svg"} />,
    delete: (isDisabled?: boolean) => (
        <SvgColor isDisabled={isDisabled} src={"/icons/delete.svg"} />
    ),
};

export default IconCommon;
