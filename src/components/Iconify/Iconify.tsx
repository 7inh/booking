import { forwardRef } from "react";
// icons
import { Icon, IconifyIcon } from "@iconify/react";
// @mui
import Box, { BoxProps } from "@mui/material/Box";
//
export type IconifyProps = IconifyIcon | string;

interface Props extends BoxProps {
    icon: IconifyProps;
}

const Iconify = forwardRef<SVGElement, Props>(({ icon, width = 20, sx, ...other }, ref) => (
    <Box
        ref={ref}
        component={Icon}
        className="component-iconify"
        icon={icon}
        sx={{ width, height: width, ...sx }}
        {...other}
    />
));

Iconify.displayName = "Iconify";

export default Iconify;
