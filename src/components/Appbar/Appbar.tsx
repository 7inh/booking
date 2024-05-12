import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { AppBar as _AppBar } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import ButtonCart from "src/components/Buttons/ButtonCart";
import { DrawerMenu } from "src/components/Drawers/DrawerMenu/DrawerMenu";
import InputText from "src/components/Inputs/InputText";
import Logo from "src/components/Logo/Logo";
import SelectLanguage from "src/components/Selects/SelectLanguage";
import { useBoolean } from "src/hooks/utils/useBoolean";
import { useResponsive } from "src/hooks/utils/useResponsive";

export interface AppBarProps {
    toggle?: () => void;
}

const AppBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const mdDown = useResponsive("down", "md");

    const openDrawer = useBoolean(false);

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
            <DrawerMenu
                open={openDrawer.value}
                onClose={() => {
                    openDrawer.onFalse();
                }}
            />
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
                    <MenuRoundedIcon
                        fontSize="large"
                        onClick={() => {
                            openDrawer.onTrue();
                        }}
                    />
                </BoxBase>
                <Logo />
                <InputText
                    sx={{
                        display: mdDown ? "none" : "",
                        width: "100%",
                        maxWidth: "500px",
                        mx: 2,
                    }}
                    onSearch={(value) => {
                        window.dispatchEvent(new CustomEvent("clear-page"));
                        navigate("/shop");
                        setSearchParams({ q: value });
                    }}
                    onClear={() => {
                        window.dispatchEvent(new CustomEvent("clear-page"));
                        searchParams.delete("q");
                        searchParams.delete("page");
                        setSearchParams(searchParams);
                    }}
                />
                <BoxHorizon gap={1} flexShrink={0}>
                    <ButtonCart />
                    {mdDown ? null : <SelectLanguage />}
                </BoxHorizon>
            </BoxBase>
        </_AppBar>
    );
};

export default AppBar;
