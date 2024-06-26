import { Skeleton } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BOOK_ITEM_HORIZON_WIDTH, PAGE_MAX_WIDTH } from "src/common/const";
import { Book } from "src/common/types";
import BookItemHorizon from "src/components/Book/BookItemHorizon";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import BoxVertical from "src/components/Boxs/BoxVertical";
import ButtonBase from "src/components/Buttons/ButtonBase";
import DialogSelectEps from "src/components/Dialogs/DialogSelectEps";
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

    const [confirmText, setConfirmText] = useState<string>("");
    const [currentSelected, setCurrentSelected] = useState<Book | null>(null);
    const currentViewRef = useRef<HTMLDivElement | null>(null);

    const { data: books, isFetching } = useGetRandom({
        onSuccess: (data) => {
            if (data.length > 0) setCurrentSelected(data[0]);
        },
    });

    const renderDialogSelectEps = useMemo(() => {
        if (!confirmText || !currentSelected) return null;

        return (
            <DialogSelectEps
                open={true}
                onClose={() => setConfirmText("")}
                confirmText={confirmText}
                itemId={currentSelected.id}
                onConfirm={(selectedListItemEps) => {
                    addToCart({
                        book: currentSelected,
                        eps: selectedListItemEps,
                    });
                    snackbar({
                        message: t("success.addToCart"),
                        severity: "success",
                    });
                }}
            />
        );
    }, [addToCart, confirmText, currentSelected, snackbar, t]);

    return (
        <BoxBase
            sx={{
                maxWidth: PAGE_MAX_WIDTH,
                mx: "auto",
            }}
        >
            {renderDialogSelectEps}
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
                    ref={currentViewRef}
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
                                    bgcolor: "rgba(255, 255, 255, 0.5)",
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
                                    sx={{
                                        fontSize: "2rem",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        textShadow:
                                            "-1px 0px white, 1px 0px white, 0px -1px white, 0px 1px white, -1px -1px white, 1px 1px white, -1px 1px white, 1px -1px white",
                                    }}
                                >
                                    {currentSelected.title}
                                </TypographyBase>
                                <TypographyBase
                                    fontWeight="400"
                                    fontSize="2.2rem"
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
                                    fontSize="1.5rem"
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
                                    onClick={() => setConfirmText(t("common.addToCart"))}
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
                    {!isFetching
                        ? books.map((book) => {
                              return (
                                  <BookItemHorizon
                                      key={book.id}
                                      book={book}
                                      onClick={() => {
                                          setCurrentSelected(book);
                                          if (currentViewRef.current) {
                                              currentViewRef.current.scrollIntoView({
                                                  behavior: "smooth",
                                                  block: "center",
                                              });
                                          }
                                      }}
                                  />
                              );
                          })
                        : null}
                    {isFetching || books.length === 0 ? (
                        <BoxBase
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gap: 1,
                                height: "100%",
                            }}
                        >
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="rectangular"
                                    sx={{
                                        flexGrow: 1,
                                        height: "100%",
                                    }}
                                />
                            ))}
                        </BoxBase>
                    ) : null}
                </BoxVertical>
            </BoxBase>
        </BoxBase>
    );
};

export default RandomBook;
