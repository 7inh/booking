import { CardMedia } from "@mui/material";
import { BookDetail } from "src/common/types";
import { addCommas } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import InputQuantity from "src/components/Inputs/InputQuantity";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface OverviewProps {
    book: BookDetail;
}

const Overview = ({ book }: OverviewProps) => {
    return (
        <BoxBase
            sx={{
                display: "grid",
                gridTemplateColumns: "450px 1fr",
                gap: 4,
            }}
        >
            <BoxBase showBorder p={10}>
                <CardMedia component="img" image={book.thumbnail} alt={book.name} />
            </BoxBase>
            <BoxBase>
                <TypographyBase
                    sx={{
                        fontSize: "30px",
                        fontWeight: 500,
                    }}
                >
                    {book.name}
                </TypographyBase>
                <TypographyBase
                    sx={{
                        fontSize: "24px",
                        fontWeight: 500,
                        color: "primary.main",
                    }}
                >
                    {addCommas(book.price)}₫
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
                <BoxBase>
                    <BoxHorizon>
                        <InputQuantity />
                    </BoxHorizon>
                </BoxBase>
            </BoxBase>
        </BoxBase>
    );
};

export default Overview;
