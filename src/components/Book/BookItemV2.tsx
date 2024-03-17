import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import { Book } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import ButtonAddToCart from "src/components/Buttons/ButtonAddToCart";
import LinkBase from "src/components/Links/LinkBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useResponsive } from "src/hooks/utils/useResponsive";

export interface BookItemV2Props {
    book: Book;
}

const BookItemV2 = (props: BookItemV2Props) => {
    const { book } = props;

    const isSmall = useResponsive("down", "sm");

    return (
        <LinkBase to={`/book/${book.id}`}>
            <BoxBase
                sx={{
                    cursor: "pointer",
                    border: "1px solid #3333330d",
                    "&:hover": {
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        transition: "all 0.3s ease 0s",
                    },
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    bgcolor: "white",
                }}
            >
                {book.discount !== 0 ? (
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
                            {book.discount}%
                        </TypographyBase>
                    </BoxBase>
                ) : null}
                <BoxBase
                    sx={{
                        p: {
                            xs: 1,
                            sm: 2,
                            md: 3,
                        },
                    }}
                >
                    <BoxCenter
                        sx={{
                            width: "100%",
                            paddingTop: "100%",
                            background: `url(${book.cover})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}
                    />
                </BoxBase>
                <BoxBase
                    sx={{
                        boxShadow: "0 0 10px 0 rgb(0 0 0 / 5%)",
                        flexGrow: 1,
                    }}
                >
                    <BoxHorizon
                        sx={{
                            borderTop: "1px solid #3333330d",
                            justifyContent: "space-between",
                            alignItems: "start",
                            p: 1,
                            boxSizing: "border-box",
                            height: "100%",
                            gap: {
                                xs: 0.25,
                                sm: 1,
                            },
                        }}
                    >
                        <BoxBase
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                                gap: {
                                    xs: 0.5,
                                    sm: 1,
                                },
                            }}
                        >
                            <BoxBase>
                                <TypographyBase
                                    sx={{
                                        fontSize: {
                                            xs: "0.9rem",
                                            sm: "1.1rem",
                                            md: "1.3rem",
                                        },
                                        fontWeight: 500,
                                    }}
                                >
                                    {book.title}
                                </TypographyBase>
                            </BoxBase>
                            <BoxBase
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr auto",
                                }}
                            >
                                <BoxHorizon
                                    sx={{
                                        alignItems: "stretch",
                                        flexWrap: "wrap",
                                        columnGap: {
                                            xs: 0.5,
                                            sm: 1,
                                        },
                                    }}
                                >
                                    <TypographyBase
                                        sx={{
                                            color: "primary.main",
                                            lineHeight: "1",
                                        }}
                                    >
                                        {book.current_price.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </TypographyBase>
                                    <TypographyBase
                                        sx={{
                                            textDecoration: "line-through",
                                            fontWeight: 400,
                                            fontSize: "0.9rem",
                                            color: "text.disabled",
                                            lineHeight: "1",
                                        }}
                                    >
                                        {book.old_price.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </TypographyBase>
                                </BoxHorizon>
                                {isSmall ? (
                                    <ButtonAddToCart
                                        trigger={
                                            <AddBoxSharpIcon
                                                fontSize="large"
                                                sx={{
                                                    "&:hover": {
                                                        color: "primary.main",
                                                        transition: "all 0.3s ease 0s",
                                                    },
                                                }}
                                            />
                                        }
                                        book={book}
                                    />
                                ) : null}
                            </BoxBase>
                        </BoxBase>
                        {!isSmall ? (
                            <ButtonAddToCart
                                trigger={
                                    <AddBoxSharpIcon
                                        fontSize="large"
                                        sx={{
                                            "&:hover": {
                                                color: "primary.main",
                                                transition: "all 0.3s ease 0s",
                                            },
                                        }}
                                    />
                                }
                                book={book}
                            />
                        ) : null}
                    </BoxHorizon>
                </BoxBase>
            </BoxBase>
        </LinkBase>
    );
};

export default BookItemV2;
