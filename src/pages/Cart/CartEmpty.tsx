import { CardMedia } from "@mui/material";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

const CartEmpty = () => {
    const t = useTranslation();

    return (
        <BoxBase>
            <BoxCenter>
                <CardMedia
                    component="img"
                    src="/images/empty-cart.png"
                    sx={{
                        width: "100%",
                        maxWidth: 400,
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            </BoxCenter>
            <TypographyBase
                sx={{
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    textAlign: "center",
                }}
            >
                {t("common.emptyCart")}
            </TypographyBase>
        </BoxBase>
    );
};

export default CartEmpty;
