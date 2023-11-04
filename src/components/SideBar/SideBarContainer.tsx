import { Drawer } from "@mui/material";
import { memo } from "react";
import { scrollbarSx } from "src/common/sxs";
import { NAV } from "src/components/SideBar/const";
import { useNavContext } from "src/contexts/NavContext";
import { useResponsive } from "src/hooks/utils/useResponsive";

export interface SideBarContainerProps {
    children?: React.ReactNode;
}

const SideBarContainer = ({ children }: SideBarContainerProps) => {
    const { open, toggle } = useNavContext();
    const lgUp = useResponsive("up", "lg");

    return (
        <Drawer
            variant={lgUp ? "permanent" : "temporary"}
            open={open}
            onClose={() => (open ? toggle() : null)}
            sx={{
                border: "none",
                height: "100%",
            }}
            PaperProps={{
                sx: {
                    width: open ? NAV.W_VERTICAL : NAV.W_MINI,
                    borderRight: "1px dashed",
                    borderColor: "divider",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    ...scrollbarSx,
                },
            }}
        >
            {children}
        </Drawer>
    );
};

export default memo(SideBarContainer);
