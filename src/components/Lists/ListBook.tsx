import { BOOK_ITEM_WIDTH } from "src/common/const";
import { Book } from "src/common/types";
import BookItem from "src/components/Book/BookItem";
import BoxBase from "src/components/Boxs/BoxBase";

export interface ListBookProps {
    books: Book[];
}

const ListBook = ({ books }: ListBookProps) => {
    return (
        <BoxBase
            sx={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fill, ${BOOK_ITEM_WIDTH}px)`,
                justifyContent: "center",
                gap: "20px",
                width: "100%",
            }}
        >
            {books.map((book) => {
                return <BookItem key={book.id} book={book} />;
            })}
        </BoxBase>
    );
};

export default ListBook;
