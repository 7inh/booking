import { useCallback } from "react";
import { BookDetail } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BookDetailProps {
    book: BookDetail;
}

const BookDetail = ({ book }: BookDetailProps) => {
    const t = useTranslation();

    const renderDetail = useCallback((label: string, value: string) => {
        return (
            <BoxBase
                sx={{
                    display: "grid",
                    gridTemplateColumns: "minmax(200px, 300px) 1fr",
                    gap: 1,
                    borderBottom: "1px solid",
                    borderBottomColor: "secondary.light",
                    py: 1,
                }}
            >
                <TypographyBase
                    sx={{
                        fontSize: "18px",
                        fontWeight: 500,
                        color: "primary.main",
                    }}
                >
                    {label}
                </TypographyBase>
                <TypographyBase
                    sx={{
                        fontSize: "18px",
                        fontWeight: 300,
                        color: "primary.dark",
                        flexShrink: 0,
                    }}
                >
                    {value}
                </TypographyBase>
            </BoxBase>
        );
    }, []);

    return (
        <BoxBase>
            <TypographyBase
                sx={{
                    fontSize: "30px",
                    fontWeight: 500,
                    mb: 2,
                }}
            >
                {t("pages.book.detail")}
            </TypographyBase>

            {renderDetail(t("pages.book.author"), book.author)}
            {renderDetail(t("pages.book.publisher"), book.publisher)}
            {renderDetail(t("pages.book.publishDate"), book.publishDate)}
            {renderDetail(t("pages.book.language"), book.language)}
            {renderDetail(t("pages.book.quantity"), book.quantity.toString())}
            {renderDetail(t("pages.book.sold"), book.sold.toString())}
            {renderDetail(
                t("pages.book.availability"),
                t("pages.shop.filter.availabilityList." + book.availability)
            )}
            {renderDetail(t("pages.book.format"), book.format)}
            {renderDetail(t("pages.book.pages"), book.pages.toString())}
            {renderDetail(
                t("pages.book.dimensions"),
                `${book.width} x ${book.height} x ${book.length} cm`
            )}
            {renderDetail(t("pages.book.weight"), `${book.weight} g`)}
            {renderDetail(t("pages.book.rare"), t(`pages.shop.filter.rareList.${book.rare}`))}
            {renderDetail(
                t("pages.book.variant"),
                t(`pages.shop.filter.variantList.${book.variant}`)
            )}
        </BoxBase>
    );
};

export default BookDetail;
