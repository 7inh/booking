import { forwardRef } from "react";
import { Icon as _Icon, IconifyIcon } from "@iconify/react";
import Box, { BoxProps } from "@mui/material/Box";

export type IconifyProps = IconifyIcon | string;

interface Props extends BoxProps {
    icon: IconifyProps;
}

const Icon = forwardRef<SVGElement, Props>(({ icon, width = 20, sx, ...other }, ref) => (
    <Box
        ref={ref}
        component={_Icon}
        className="component-iconify"
        icon={icon}
        sx={{ width, height: width, ...sx }}
        {...other}
    />
));

Icon.displayName = "Icon";

export default Icon;
