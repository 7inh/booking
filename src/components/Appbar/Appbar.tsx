import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Typography, AppBar as _AppBar } from "@mui/material";
import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import InputText from "src/components/Inputs/InputText";
import Logo from "src/components/Logo/Logo";
import useTranslation from "src/hooks/utils/useTranslation";

export interface AppBarProps {
    toggle?: () => void;
}

const AppBar = () => {
    const t = useTranslation();

    const navData = [
        {
            id: 1,
            title: t("nav.home"),
        },
        {
            id: 2,
            title: t("nav.shop"),
        },
        {
            id: 3,
            title: t("nav.about"),
        },
        {
            id: 4,
            title: t("nav.contact"),
        },
    ];

    return (
        <_AppBar
            elevation={0}
            sx={{
                boxShadow:
                    "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
                bgcolor: "white",
                position: "sticky",
            }}
        >
            <BoxBase
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "68px",
                    maxWidth: PAGE_MAX_WIDTH,
                    width: "100%",
                    mx: "auto",
                    color: "primary.dark",
                }}
            >
                <Logo />
                <BoxHorizon
                    sx={{
                        gap: "24px",
                    }}
                >
                    {navData.map((item) => (
                        <Typography key={item.id} variant="body1">
                            {item.title}
                        </Typography>
                    ))}
                </BoxHorizon>
                <BoxHorizon gap={1}>
                    <InputText />
                    <ShoppingBagOutlinedIcon />
                </BoxHorizon>
            </BoxBase>
        </_AppBar>
    );
};

export default AppBar;
