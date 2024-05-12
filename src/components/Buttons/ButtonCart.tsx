import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Divider, Menu } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTotalCartValue } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import BoxVertical from "src/components/Boxs/BoxVertical";
import ButtonBase from "src/components/Buttons/ButtonBase";
import ItemCartInMenu from "src/components/Items/ItemCartInMenu";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useCartContext } from "src/contexts/CartContext";
import { useEffectOnce } from "src/hooks/utils/useEffectOnce";
import useTranslation from "src/hooks/utils/useTranslation";

export interface ButtonCartProps {}

const ButtonCart = () => {
    const t = useTranslation();
    const navigate = useNavigate();

    const { items, removeFromCart, refetchPrice } = useCartContext();

    const cartLength = useMemo(() => {
        return Object.keys(items).length;
    }, [items]);

    const cartTotalValue = useMemo(() => {
        return getTotalCartValue(items);
    }, [items]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffectOnce(() => {
        refetchPrice();
    });

    return (
        <>
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
                        {t("common.cart")} ({cartLength})
                    </TypographyBase>
                    <TypographyBase variant="caption" lineHeight={1}>
                        {cartTotalValue.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </TypographyBase>
                </BoxVertical>
            </BoxHorizon>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    marginTop: "16px",
                    "& .MuiMenu-paper": {
                        width: {
                            xs: "calc(100vw - 32px)",
                            sm: "100%",
                        },
                        maxWidth: "400px",
                        borderRadius: "0px",
                        p: 1,
                        px: 3,
                        boxSizing: "border-box",
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
                <BoxBase>
                    <TypographyBase
                        sx={{
                            fontWeight: 400,
                            fontSize: "1.2rem",
                            mb: 1,
                        }}
                    >
                        {t("common.cart")} ({cartLength})
                    </TypographyBase>
                    <Divider />
                    <br />
                    {Object.keys(items).map((cartId: string) => {
                        const { book, eps } = items[cartId];
                        return (
                            <ItemCartInMenu
                                key={`cart-item-${cartId}}`}
                                book={book}
                                eps={eps}
                                onRemove={() => {
                                    removeFromCart(cartId);
                                }}
                            />
                        );
                    })}
                    {cartLength ? (
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
                                <TypographyBase
                                    variant="body2"
                                    lineHeight={1}
                                    sx={{
                                        color: "#f44336",
                                    }}
                                >
                                    {cartTotalValue.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
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
                                    handleClose();
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
                </BoxBase>
            </Menu>
        </>
    );
};

export default ButtonCart;
