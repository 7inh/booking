import { Book } from "src/common/types";
import BookItemV2 from "src/components/Book/BookItemV2";
import BoxBase from "src/components/Boxs/BoxBase";

export interface ListBookProps {
    books: Book[];
}

const ListBook = ({ books }: ListBookProps) => {
    return (
        <BoxBase
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr 1fr",
                    lg: "1fr 1fr 1fr",
                },
                gap: {
                    xs: "5px",
                    sm: "10px",
                    md: "20px",
                },
                justifyContent: "center",
                width: "100%",
            }}
        >
            {books.map((book) => {
                return (
                    <BookItemV2
                        key={book.id}
                        book={{
                            ...book,
                            cover: book.cover.replace("compact", "large"),
                        }}
                    />
                );
            })}
        </BoxBase>
    );
};

export default ListBook;
