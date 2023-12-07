import { CardMedia } from "@mui/material";
import { BOOK_ITEM_HORIZON_HEIGHT, BOOK_ITEM_HORIZON_WIDTH } from "src/common/const";
import { Book } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import BoxVertical from "src/components/Boxs/BoxVertical";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface BookItemHorizonProps {
    book: Book;
    onClick?: () => void;
}

const BookItemHorizon = (props: BookItemHorizonProps) => {
    const { book, onClick } = props;
    return (
        <BoxBase
            sx={{
                cursor: "pointer",
                border: "1px solid #3333330d",
                "&:hover": {
                    boxShadow: "0px 0px 10px 0px #3333330d",
                    transition: "all 0.3s ease",
                },
            }}
            onClick={onClick}
        >
            <BoxHorizon
                sx={{
                    p: 2,
                    alignItems: "stretch",
                    gap: 1,
                }}
            >
                <BoxBase>
                    <CardMedia
                        component="img"
                        src={book.cover.replace("compact", "large")}
                        sx={{
                            width: BOOK_ITEM_HORIZON_WIDTH,
                            height: BOOK_ITEM_HORIZON_HEIGHT,
                        }}
                    />
                </BoxBase>
                <BoxVertical
                    sx={{
                        p: 1,
                        gap: 1,
                    }}
                >
                    <TypographyBase
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: 400,
                        }}
                    >
                        {book.title}
                    </TypographyBase>
                    <BoxHorizon gap={1}>
                        <TypographyBase variant="h6" color="primary.main">
                            {book.current_price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </TypographyBase>
                        <TypographyBase
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                textDecoration: "line-through",
                            }}
                        >
                            {book.old_price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </TypographyBase>
                    </BoxHorizon>
                </BoxVertical>
            </BoxHorizon>
        </BoxBase>
    );
};

export default BookItemHorizon;
