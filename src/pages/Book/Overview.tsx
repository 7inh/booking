import { CardMedia } from "@mui/material";
import { BookDetail } from "src/common/types";
import { addCommas } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import InputQuantity from "src/components/Inputs/InputQuantity";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useCartContext } from "src/contexts/CartContext";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface OverviewProps {
    book: BookDetail;
}

const Overview = ({ book }: OverviewProps) => {
    const { addToCart } = useCartContext();
    const snackbar = useSnackBar();
    const t = useTranslation();

    return (
        <BoxBase
            sx={{
                display: "grid",
                gridTemplateColumns: "450px 1fr",
                gap: 4,
            }}
        >
            <BoxBase showBorder p={10}>
                <CardMedia component="img" image={book.cover} alt={book.title} />
            </BoxBase>
            <BoxBase>
                <TypographyBase
                    sx={{
                        fontSize: "30px",
                        fontWeight: 500,
                    }}
                >
                    {book.title}
                </TypographyBase>
                <TypographyBase
                    sx={{
                        fontSize: "24px",
                        fontWeight: 500,
                        color: "primary.main",
                    }}
                >
                    {addCommas(book.current_price)}₫
                </TypographyBase>
                <TypographyBase
                    sx={{
                        fontSize: "18px",
                        fontWeight: 300,
                        color: "primary.dark",
                    }}
                >
                    {book.description}
                </TypographyBase>
                <br />

                <br />
                <BoxBase>
                    <BoxHorizon>
                        <InputQuantity
                            onAddToCart={(quantity) => {
                                addToCart({ book, quantity });
                                snackbar({
                                    message: t("success.addToCart"),
                                    severity: "success",
                                });
                            }}
                        />
                    </BoxHorizon>
                </BoxBase>
            </BoxBase>
        </BoxBase>
    );
};

export default Overview;
