import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BOOK_ITEM_HORIZON_WIDTH, PAGE_MAX_WIDTH } from "src/common/const";
import { Book } from "src/common/types";
import BookItemHorizon from "src/components/Book/BookItemHorizon";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import BoxVertical from "src/components/Boxs/BoxVertical";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useCartContext } from "src/contexts/CartContext";
import useGetRandom from "src/hooks/useGetRandom";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

const RandomBook = () => {
    const t = useTranslation();
    const snackbar = useSnackBar();
    const navigate = useNavigate();

    const { addToCart } = useCartContext();

    const lgDown = useResponsive("down", "lg");

    const [currentSelected, setCurrentSelected] = useState<Book | null>(null);

    const { data: books } = useGetRandom({
        onSuccess: (data) => {
            if (data.length > 0) setCurrentSelected(data[0]);
        },
    });

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
                    gridTemplateColumns: lgDown ? "1fr" : "1fr 400px",
                    gap: 3,
                    mx: 1,
                }}
            >
                <BoxBase
                    sx={{
                        border: "1px solid #3333330d",
                        minHeight: "400px",
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
                                backgroundImage: `url(${currentSelected.cover})`,
                                flexWrap: {
                                    xs: "wrap-reverse",
                                    md: "nowrap",
                                },

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
                                <TypographyBase
                                    variant="h3"
                                    fontWeight="bold"
                                    sx={{
                                        textShadow:
                                            "-1px 0px white, 1px 0px white, 0px -1px white, 0px 1px white, -1px -1px white, 1px 1px white, -1px 1px white, 1px -1px white",
                                    }}
                                >
                                    {currentSelected.title}
                                </TypographyBase>
                                <TypographyBase
                                    fontWeight="400"
                                    fontSize="40px"
                                    color="primary.main"
                                    sx={{
                                        textShadow:
                                            "-1px 0px white, 1px 0px white, 0px -1px white, 0px 1px white, -1px -1px white, 1px 1px white, -1px 1px white, 1px -1px white",
                                    }}
                                >
                                    {currentSelected.current_price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </TypographyBase>
                                <TypographyBase
                                    fontWeight="400"
                                    fontSize="30px"
                                    color="text.secondary"
                                    sx={{
                                        textDecoration: "line-through",
                                        textShadow: "0px 0px 5px white",
                                    }}
                                >
                                    {currentSelected.old_price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </TypographyBase>
                                <br />
                                <ButtonBase
                                    label={t("common.addToCart")}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mb: 1,
                                        bgcolor: "white",
                                    }}
                                    onClick={() => {
                                        addToCart({
                                            quantity: 1,
                                            book: currentSelected,
                                        });
                                        snackbar({
                                            message: t("success.addToCart"),
                                            severity: "success",
                                        });
                                    }}
                                />
                                <ButtonBase
                                    label={t("common.detail")}
                                    onClick={() => {
                                        navigate("/book/" + currentSelected.id);
                                    }}
                                    fullWidth
                                />
                            </BoxVertical>
                            <BoxCenter
                                sx={{
                                    zIndex: 2,
                                    flexShrink: 0,
                                    width: "100%",
                                    maxWidth: BOOK_ITEM_HORIZON_WIDTH * 2.5,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    src={currentSelected.cover.replace("compact", "master")}
                                    sx={{
                                        boxShadow: "0px 0px 10px 0px #3333330d",
                                        height: "auto",
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
