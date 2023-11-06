import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { AppBar as _AppBar } from "@mui/material";
import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import BoxVertical from "src/components/Boxs/BoxVertical";
import InputText from "src/components/Inputs/InputText";
import Logo from "src/components/Logo/Logo";
import SelectLanguage from "src/components/Selects/SelectLanguage";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";

export interface AppBarProps {
    toggle?: () => void;
}

const AppBar = () => {
    const t = useTranslation();

    const mdDown = useResponsive("down", "md");

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
                <InputText
                    sx={{
                        display: mdDown ? "none" : "",
                        width: "100%",
                        mx: 10,
                    }}
                />
                <BoxHorizon gap={1} flexShrink={0}>
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
