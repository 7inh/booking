import AddBoxIcon from "@mui/icons-material/AddBox";
import CardMedia from "@mui/material/CardMedia";
import { BOOK_ITEM_HEIGHT, BOOK_ITEM_WIDTH } from "src/common/const";
import { Book } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface BookItemProps {
    book: Book;
}

const BookItem = (props: BookItemProps) => {
    const { book } = props;
    return (
        <BoxBase
            sx={{
                cursor: "pointer",
                border: "1px solid #3333330d",
                "&:hover": {
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    transition: "all 0.3s ease 0s",
                },
            }}
        >
            <BoxCenter
                sx={{
                    p: 5,
                }}
            >
                <CardMedia
                    component="img"
                    src={book.thumbnail}
                    sx={{
                        overflow: "hidden",
                        width: BOOK_ITEM_WIDTH,
                        height: BOOK_ITEM_HEIGHT,
                        objectFit: "cover",
                    }}
                />
            </BoxCenter>
            <BoxBase
                sx={{
                    boxShadow: "0 0 10px 0 rgb(0 0 0 / 5%)",
                }}
            >
                <BoxHorizon
                    sx={{
                        borderTop: "1px solid #3333330d",
                        justifyContent: "space-between",
                        alignItems: "start",
                        p: 1,
                    }}
                >
                    <BoxBase>
                        <TypographyBase variant="h6">{book.name}</TypographyBase>
                        <TypographyBase variant="h6" color="#ff6162">
                            {book.price}₫
                        </TypographyBase>
                    </BoxBase>
                    <AddBoxIcon
                        fontSize="large"
                        sx={{
                            "&:hover": {
                                color: "#ff6162",
                                transition: "all 0.3s ease 0s",
                            },
                        }}
                    />
                </BoxHorizon>
            </BoxBase>
        </BoxBase>
    );
};

export default BookItem;
