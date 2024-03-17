import { Book } from "src/common/types";
import BookItemHorizonV2 from "src/components/Book/BookItemHorizonV2";
import BoxBase from "src/components/Boxs/BoxBase";

export interface ListBookHorizonProps {
    books: Book[];
}

const ListBookHorizon = ({ books }: ListBookHorizonProps) => {
    return (
        <BoxBase
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                justifyContent: "center",
                gap: "20px",
                width: "100%",
            }}
        >
            {books.map((book) => {
                return (
                    <BookItemHorizonV2
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

export default ListBookHorizon;
