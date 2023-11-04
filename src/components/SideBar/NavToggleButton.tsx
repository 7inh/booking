// @mui
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { bgBlur } from "src/common/theme";
import Iconify from "src/components/Iconify/Iconify";
import { NAV } from "src/components/SideBar/const";
import { useNavContext } from "src/contexts/NavContext";
import { useResponsive } from "src/hooks/utils/useResponsive";

// ----------------------------------------------------------------------

export default function NavToggleButton({ sx, ...other }: IconButtonProps) {
    const theme = useTheme();
    const { open, toggle } = useNavContext();

    const lgUp = useResponsive("up", "lg");

    if (!lgUp) {
        return null;
    }

    return (
        <IconButton
            size="small"
            onClick={() => {
                toggle();
            }}
            sx={{
                p: 0.5,
                top: 32,
                position: "fixed",
                left: (open ? NAV.W_VERTICAL : NAV.W_MINI) - 12,
                zIndex: theme.zIndex.drawer + 1,
                border: `dashed 1px ${theme.palette.divider}`,
                ...bgBlur({ opacity: 0.48, color: theme.palette.background.default }),
                "&:hover": {
                    bgcolor: "background.default",
                },
                ...sx,
            }}
            {...other}
        >
            <Iconify
                width={16}
                icon={open ? "eva:arrow-ios-back-fill" : "eva:arrow-ios-forward-fill"}
            />
        </IconButton>
    );
}
