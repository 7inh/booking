import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { CardMedia, Divider, Menu, AppBar as _AppBar } from "@mui/material";
import { useMemo, useState } from "react";
import { PAGE_MAX_WIDTH } from "src/common/const";
import { addCommas } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import BoxVertical from "src/components/Boxs/BoxVertical";
import ButtonBase from "src/components/Buttons/ButtonBase";
import InputText from "src/components/Inputs/InputText";
import Logo from "src/components/Logo/Logo";
import SelectLanguage from "src/components/Selects/SelectLanguage";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useCartContext } from "src/contexts/CartContext";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export interface AppBarProps {
    toggle?: () => void;
}

const AppBar = () => {
    const { items, removeFromCart } = useCartContext();
    const t = useTranslation();
    const navigate = useNavigate();

    const mdDown = useResponsive("down", "md");

    const cartTotalValue = useMemo(() => {
        return items.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
    }, [items]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        maxWidth: "500px",
                        mx: 2,
                    }}
                />
                <BoxHorizon gap={1} flexShrink={0}>
                    <BoxHorizon
                        color="primary.dark"
                        sx={{
                            cursor: "pointer",
                            color: "primary.main",
                            userSelect: "none",
                        }}
                        onClick={(event) => {
                            handleClick(event as any);
                        }}
                    >
                        <ShoppingBagOutlinedIcon fontSize="large" />
                        <BoxVertical>
                            <TypographyBase variant="caption">
                                {t("common.cart")} ({items.length})
                            </TypographyBase>
                            <TypographyBase variant="caption" lineHeight={1}>
                                {addCommas(cartTotalValue)}₫
                            </TypographyBase>
                        </BoxVertical>
                    </BoxHorizon>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        sx={{
                            marginTop: "16px",
                            // set min width
                            "& .MuiMenu-paper": {
                                minWidth: "300px",
                                borderRadius: "0px",
                                p: 1,
                                px: 3,
                                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
                            },
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <TypographyBase
                            sx={{
                                fontWeight: 400,
                                fontSize: "1.2rem",
                                mb: 1,
                            }}
                        >
                            {t("common.cart")} ({items.length})
                        </TypographyBase>
                        <Divider />
                        <br />
                        {items.map((item) => {
                            return (
                                <BoxHorizon
                                    key={item.book.id}
                                    sx={{
                                        width: "100%",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 1,
                                    }}
                                >
                                    <BoxHorizon
                                        gap={1}
                                        sx={{
                                            alignItems: "stretch",
                                            width: "100%",
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            src={item.book.thumbnail}
                                            sx={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "scale-down",
                                                p: 0.5,
                                            }}
                                        />
                                        <BoxVertical gap={1} flexGrow={1}>
                                            <TypographyBase variant="caption">
                                                {item.book.title}
                                            </TypographyBase>
                                            <BoxHorizon gap={1}>
                                                <TypographyBase
                                                    variant="caption"
                                                    lineHeight={1}
                                                    sx={{
                                                        bgcolor: "grey.300",
                                                        p: 0.5,
                                                        px: 1,
                                                    }}
                                                >
                                                    {item.quantity}
                                                </TypographyBase>
                                                <TypographyBase variant="caption" lineHeight={1}>
                                                    {addCommas(item.book.price)}₫
                                                </TypographyBase>
                                            </BoxHorizon>
                                        </BoxVertical>
                                        <CloseIcon
                                            fontSize="small"
                                            sx={{
                                                cursor: "pointer",
                                                color: "primary.dark",
                                                mt: 0.5,
                                            }}
                                            onClick={() => {
                                                removeFromCart(item.book.id);
                                            }}
                                        />
                                    </BoxHorizon>
                                </BoxHorizon>
                            );
                        })}
                        {items.length ? (
                            <>
                                <br />
                                <Divider />
                                <BoxHorizon
                                    sx={{
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        my: 1,
                                    }}
                                >
                                    <TypographyBase variant="body1">
                                        {t("common.totalCart")}
                                    </TypographyBase>
                                    <TypographyBase variant="body2" lineHeight={1}>
                                        {addCommas(cartTotalValue)}₫
                                    </TypographyBase>
                                </BoxHorizon>
                                <Divider />
                                <ButtonBase
                                    sx={{
                                        mt: 2,
                                    }}
                                    fullWidth
                                    label={t("common.checkout")}
                                    onClick={() => {
                                        navigate("/cart");
                                    }}
                                ></ButtonBase>
                            </>
                        ) : (
                            <BoxBase>
                                <TypographyBase
                                    sx={{
                                        color: "grey.500",
                                        py: 2,
                                    }}
                                    variant="body2"
                                    textAlign="center"
                                >
                                    {t("common.emptyCart")}
                                </TypographyBase>
                            </BoxBase>
                        )}
                    </Menu>
                    <SelectLanguage />
                </BoxHorizon>
            </BoxBase>
        </_AppBar>
    );
};

export default AppBar;
