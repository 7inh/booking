import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import {
    BOOK_ITEM_HORIZON_HEIGHT,
    BOOK_ITEM_HORIZON_WIDTH,
    PAGE_MAX_WIDTH,
} from "src/common/const";
import { Book } from "src/common/types";
import BookItemHorizon from "src/components/Book/BookItemHorizon";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import BoxVertical from "src/components/Boxs/BoxVertical";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";
import { book1 } from "src/test-utils/mocks/books";

const RandomBook = () => {
    const t = useTranslation();

    const [currentSelected, setCurrentSelected] = useState<Book | null>(null);

    const books = book1.slice(0, 3);
    return (
        <BoxBase
            sx={{
                maxWidth: PAGE_MAX_WIDTH,
                mx: "auto",
            }}
        >
            <BoxBase
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 400px",
                    gap: 3,
                    mx: 1,
                }}
            >
                <BoxBase
                    sx={{
                        border: "1px solid #3333330d",
                    }}
                >
                    {currentSelected ? (
                        <BoxHorizon
                            sx={{
                                p: 5,
                                gap: 5,
                                justifyContent: "space-between",
                                alignItems: "stretch",
                                height: "100%",
                                boxSizing: "border-box",
                                position: "relative",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundImage: `url(${currentSelected.thumbnail})`,

                                "&:before": {
                                    content: "''",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backdropFilter: "blur(20px)",
                                },
                            }}
                        >
                            <BoxBase
                                sx={{
                                    bgcolor: "white",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    zIndex: 1,
                                    opacity: 0.7,
                                }}
                            />
                            <BoxVertical
                                sx={{
                                    justifyContent: "center",
                                    flexGrow: 1,
                                    zIndex: 2,
                                }}
                            >
                                <TypographyBase variant="h2" fontWeight="bold">
                                    {currentSelected.name}
                                </TypographyBase>
                                <TypographyBase fontWeight="400" fontSize="40px" color="#ff6162">
                                    {currentSelected.price}
                                </TypographyBase>
                                <br />
                                <ButtonBase
                                    label={t("common.addToCart")}
                                    variant="outlined"
                                    fullWidth
                                />
                            </BoxVertical>
                            <BoxCenter width="35%" flexShrink={0} zIndex={2}>
                                <CardMedia
                                    component="img"
                                    src={currentSelected.thumbnail}
                                    sx={{
                                        boxShadow: "0px 0px 10px 0px #3333330d",
                                        width: BOOK_ITEM_HORIZON_WIDTH,
                                        height: BOOK_ITEM_HORIZON_HEIGHT,
                                        transform: "scale(2.5)",
                                    }}
                                />
                            </BoxCenter>
                        </BoxHorizon>
                    ) : (
                        <BoxCenter height="100%">
                            <CircularProgress />
                        </BoxCenter>
                    )}
                </BoxBase>
                <BoxVertical
                    sx={{
                        gap: 2,
                    }}
                >
                    {books.map((book) => {
                        return (
                            <BookItemHorizon
                                key={book.id}
                                book={book}
                                onClick={() => {
                                    setCurrentSelected(book);
                                }}
                            />
                        );
                    })}
                </BoxVertical>
            </BoxBase>
        </BoxBase>
    );
};

export default RandomBook;
