import CardMedia from "@mui/material/CardMedia";
import { Book } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface BookItemProps {
    book: Book;
}

const BOOK_ITEM_WIDTH = 300;
const BOOK_ITEM_HEIGHT = BOOK_ITEM_WIDTH * 1.7;

const BookItem = (props: BookItemProps) => {
    const { book } = props;
    return (
        <BoxBase
            sx={{
                width: BOOK_ITEM_WIDTH,
                height: BOOK_ITEM_HEIGHT,
                cursor: "pointer",
                border: "1px solid #3333330d",
                "&:hover": {
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    transition: "all 0.3s ease 0s",
                },
            }}
        >
            <BoxCenter p={5}>
                <CardMedia
                    component="img"
                    src={book.thumbnail}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </BoxCenter>
            <BoxBase
                sx={{
                    borderTop: "0.5px solid #E5E5E5",
                    p: 1,
                }}
            >
                <TypographyBase variant="h6">{book.name}</TypographyBase>
                <TypographyBase variant="h6" color="#ff6162">
                    {book.price}₫
                </TypographyBase>
            </BoxBase>
        </BoxBase>
    );
};

export default BookItem;
