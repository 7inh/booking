import { useNavigate } from "react-router-dom";
import { Book } from "src/common/types";
import BookItemHorizonV2 from "src/components/Book/BookItemHorizonV2";
import BoxBase from "src/components/Boxs/BoxBase";

export interface ListBookHorizonProps {
    books: Book[];
}

const ListBookHorizon = ({ books }: ListBookHorizonProps) => {
    const navigate = useNavigate();
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
                        onClick={() => {
                            navigate(`/book/${book.id}`);
                        }}
                    />
                );
            })}
        </BoxBase>
    );
};

export default ListBookHorizon;
