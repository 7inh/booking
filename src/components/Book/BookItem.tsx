import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import { BOOK_ITEM_HEIGHT, BOOK_ITEM_WIDTH } from "src/common/const";
import { Book } from "src/common/types";
import { addCommas } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useCartContext } from "src/contexts/CartContext";

export interface BookItemProps {
    book: Book;
}

const BookItem = (props: BookItemProps) => {
    const { book } = props;

    const navigate = useNavigate();

    const { addToCart } = useCartContext();

    return (
        <BoxBase
            sx={{
                cursor: "pointer",
                border: "1px solid #3333330d",
                "&:hover": {
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    transition: "all 0.3s ease 0s",
                },
                position: "relative",
            }}
            onClick={() => navigate(`/book/${book.id}`)}
        >
            {book.discount !== "0%" ? (
                <BoxBase
                    sx={{
                        bgcolor: "primary.main",
                        position: "absolute",
                        top: 5,
                        left: 5,
                        zIndex: 1,
                        borderRadius: "50px",
                        minWidth: "50px",
                    }}
                >
                    <TypographyBase
                        sx={{
                            color: "white",
                            fontSize: "14px",
                            px: 1,
                            py: 0.25,
                            fontWeight: 400,
                            textAlign: "center",
                        }}
                    >
                        {book.discount}
                    </TypographyBase>
                </BoxBase>
            ) : null}
            <BoxCenter
                sx={{
                    p: 5,
                }}
            >
                <CardMedia
                    component="img"
                    src={book.cover}
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
                        <TypographyBase variant="h6">{book.title}</TypographyBase>
                        <BoxHorizon
                            gap={1}
                            sx={{
                                alignItems: "stretch",
                            }}
                        >
                            <TypographyBase variant="h6" color="primary.main">
                                {addCommas(book.current_price)}₫
                            </TypographyBase>
                            <TypographyBase
                                sx={{
                                    textDecoration: "line-through",
                                    fontWeight: 400,
                                    fontSize: "0.9rem",
                                    color: "text.disabled",
                                    mt: 0.45,
                                }}
                            >
                                {addCommas(book.old_price)}₫
                            </TypographyBase>
                        </BoxHorizon>
                    </BoxBase>
                    <AddBoxSharpIcon
                        fontSize="large"
                        sx={{
                            "&:hover": {
                                color: "primary.main",
                                transition: "all 0.3s ease 0s",
                            },
                        }}
                        onClick={() =>
                            addToCart({
                                book,
                                quantity: 1,
                            })
                        }
                    />
                </BoxHorizon>
            </BoxBase>
        </BoxBase>
    );
};

export default BookItem;
