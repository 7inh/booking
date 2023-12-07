import { useCallback, useMemo } from "react";
import { BookDetail } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BookDetailProps {
    book: BookDetail;
}

const mapPublisher = (publisher: number) => {
    switch (publisher) {
        case 1:
            return "NSB Kim Đồng";
        case 2:
            return "NSB Trẻ";
        default:
            return "";
    }
};

const mapAvailability = (availability: number) => {
    switch (availability) {
        case 1:
            return "preOrder";
        case 2:
            return "available";
        case 3:
            return "outOfStock";
        default:
            return "";
    }
};

const mapFormat = (format: number) => {
    switch (format) {
        case 1:
            return "paperback";
        case 2:
            return "hardcover";
        default:
            return "";
    }
};

const mapRare = (rare: number) => {
    switch (rare) {
        case 1:
            return "normal";
        case 2:
            return "special";
        case 3:
            return "limited";
        case 4:
            return "collection";
        default:
            return "";
    }
};

const BookDetail = ({ book }: BookDetailProps) => {
    const t = useTranslation();

    const updatingTranslate = useMemo(() => t("common.updating"), [t]);

    const renderDetail = useCallback((label: string, value: string) => {
        return (
            <BoxBase
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr 1fr",
                        md: "minmax(200px, 300px) 1fr",
                    },
                    gap: 1,
                    borderBottom: "1px solid",
                    borderBottomColor: "secondary.light",
                    py: 1,
                }}
            >
                <TypographyBase
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "primary.main",
                    }}
                >
                    {label}
                </TypographyBase>
                <TypographyBase
                    sx={{
                        fontSize: "1rem",
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
                    fontSize: "1.7rem",
                    fontWeight: 500,
                    mb: 2,
                }}
            >
                {t("pages.book.detail")}
            </TypographyBase>

            {renderDetail(t("pages.book.author"), book.author)}
            {renderDetail(t("pages.book.publisher"), mapPublisher(book.publisher))}
            {renderDetail(
                t("pages.book.availability"),
                t("pages.shop.filter.availabilityList." + mapAvailability(book.availability))
            )}
            {renderDetail(
                t("pages.book.format"),
                t("pages.shop.filter.formatList." + mapFormat(book.format))
            )}
            {renderDetail(t("pages.book.pages"), book.pages.toString())}
            {renderDetail(t("pages.book.size"), `${book.size}`)}
            {renderDetail(t("pages.book.weight"), `${book.weight}`)}
            {renderDetail(
                t("pages.book.rare"),
                book.rare
                    ? t(`pages.shop.filter.rareList.${mapRare(book.rare)}`)
                    : updatingTranslate
            )}
        </BoxBase>
    );
};

export default BookDetail;
