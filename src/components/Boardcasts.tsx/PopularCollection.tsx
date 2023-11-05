import { BOOK_ITEM_WIDTH, PAGE_MAX_WIDTH } from "src/common/const";
import BookItem from "src/components/Book/BookItem";
import BoxBase from "src/components/Boxs/BoxBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";
import { book1 } from "src/test-utils/mocks/books";

const PopularCollection = () => {
    const t = useTranslation();

    const books = book1;

    return (
        <BoxBase
            sx={{
                maxWidth: PAGE_MAX_WIDTH,
                mx: "auto",
                my: 10,
            }}
        >
            <BoxBase textAlign="center">
                <TypographyBase variant="h3">
                    {t("broadcast.popularCollection.title")}
                </TypographyBase>
                <TypographyBase variant="body1" color="GrayText">
                    {t("broadcast.popularCollection.subTitle")}
                </TypographyBase>
            </BoxBase>
            <BoxBase
                sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fill, ${BOOK_ITEM_WIDTH}px)`,
                    justifyContent: "center",
                    gap: "20px",
                    width: "100%",
                    mt: 5,
                }}
            >
                {books.map((book) => {
                    return <BookItem key={book.id} book={book} />;
                })}
            </BoxBase>
        </BoxBase>
    );
};

export default PopularCollection;
