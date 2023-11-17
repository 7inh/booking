import { PAGE_MAX_WIDTH } from "src/common/const";
import BookDetail from "src/components/Book/BookDetail";
import BoxBase from "src/components/Boxs/BoxBase";
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb";
import Overview from "src/pages/Book/Overview";
import { book2 } from "src/test-utils/mocks/books";

const Book = () => {
    const book = book2;

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        name: "Home",
                        href: "/",
                    },
                    {
                        name: "Shop",
                        href: "/shop",
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
                <BoxBase mx={1}>
                    <Overview book={book} />
                    <br />
                    <br />
                    <br />
                    <BookDetail book={book} />
                </BoxBase>
            </BoxBase>
        </>
    );
};

export default Book;
