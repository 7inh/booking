import { PAGE_MAX_WIDTH } from "src/common/const";
import { Book } from "src/common/types";
import BookItemV2 from "src/components/Book/BookItemV2";
import BoxBase from "src/components/Boxs/BoxBase";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface CollectionBaseProps {
    title: string;
    subTitle: string;
    books: Book[];
    hidden?: boolean;
}

const CollectionBase = ({ title, subTitle, books, hidden }: CollectionBaseProps) => {
    return (
        <BoxBase
            sx={{
                maxWidth: PAGE_MAX_WIDTH,
                mx: "auto",
                my: 10,
                display: hidden ? "none" : "block",
            }}
        >
            <BoxBase textAlign="center">
                <TypographyBase variant="h3">{title}</TypographyBase>
                <TypographyBase variant="body1" color="GrayText">
                    {subTitle}
                </TypographyBase>
            </BoxBase>
            <BoxBase
                sx={{
                    px: 1,
                    boxSizing: "border-box",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr 1fr",
                        md: "1fr 1fr 1fr",
                        lg: "1fr 1fr 1fr 1fr",
                    },
                    justifyContent: "center",
                    gap: {
                        xs: "5px",
                        sm: "10px",
                        md: "20px",
                    },
                    width: "100%",
                    mt: 5,
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
        </BoxBase>
    );
};

export default CollectionBase;
