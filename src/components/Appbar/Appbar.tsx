import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Typography, AppBar as _AppBar } from "@mui/material";
import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import BoxVertical from "src/components/Boxs/BoxVertical";
import InputText from "src/components/Inputs/InputText";
import LinkBase from "src/components/Links/LinkBase";
import Logo from "src/components/Logo/Logo";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SelectLanguage from "src/components/Selects/SelectLanguage";

export interface AppBarProps {
    toggle?: () => void;
}

const AppBar = () => {
    const t = useTranslation();

    const mdDown = useResponsive("down", "md");

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
                    px: 1,
                    boxSizing: "border-box",
                    color: "primary.dark",
                }}
            >
                <BoxBase
                    sx={{
                        display: mdDown ? "flex" : "none",
                    }}
                >
                    <MenuRoundedIcon fontSize="large" />
                </BoxBase>
                <Logo />
                <BoxHorizon
                    sx={{
                        gap: "24px",
                        display: mdDown ? "none" : "flex",
                    }}
                >
                    {navData.map((item) => (
                        <LinkBase key={item.id} to={""}>
                            <Typography variant="body1">{item.title}</Typography>
                        </LinkBase>
                    ))}
                </BoxHorizon>
                <BoxHorizon gap={1}>
                    <InputText
                        sx={{
                            display: mdDown ? "none" : "",
                        }}
                    />
                    <BoxHorizon
                        color="primary.dark"
                        sx={{
                            cursor: "pointer",
                            color: "primary.main",
                        }}
                    >
                        <ShoppingBagOutlinedIcon fontSize="large" />
                        <BoxVertical>
                            <TypographyBase variant="caption">
                                {t("common.cart")} (0)
                            </TypographyBase>
                            <TypographyBase variant="caption" lineHeight={1}>
                                0.0₫
                            </TypographyBase>
                        </BoxVertical>
                    </BoxHorizon>
                    <SelectLanguage />
                </BoxHorizon>
            </BoxBase>
        </_AppBar>
    );
};

export default AppBar;
