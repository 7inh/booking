import { useParams } from "react-router-dom";
import { PAGE_MAX_WIDTH } from "src/common/const";
import BookDetail from "src/components/Book/BookDetail";
import BoxBase from "src/components/Boxs/BoxBase";
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb";
import useGetItemById from "src/hooks/useGetItemById";
import useTranslation from "src/hooks/utils/useTranslation";
import Overview from "src/pages/Book/Overview";

const Book = () => {
    const t = useTranslation();

    const { id } = useParams<{ id: string }>();

    const { data: book } = useGetItemById({ id: parseInt(id || "0") });

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        name: t("pages.home.title"),
                        href: "/",
                    },
                    {
                        name: t("pages.book.title"),
                        href: "/book",
                    },
                ]}
            />
            <BoxBase
                sx={{
                    maxWidth: PAGE_MAX_WIDTH,
                    mx: "auto",
                    mt: 2,
                    mb: 5,
                }}
            >
                {book ? (
                    <BoxBase mx={1}>
                        <Overview book={book} />
                        <br />
                        <br />
                        <br />
                        <BookDetail book={book} />
                    </BoxBase>
                ) : null}
            </BoxBase>
        </>
    );
};

export default Book;
