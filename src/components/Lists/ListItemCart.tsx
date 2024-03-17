import { CartData } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import ItemCartDetail from "src/components/Items/ItemCartDetail";

export interface ListItemCartProps {
    items: CartData;
}

const ListItemCart = ({ items }: ListItemCartProps) => {
    return (
        <BoxBase
            flexGrow={1}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}
        >
            {Object.keys(items).map((cartId) => {
                const { book, eps } = items[cartId];
                return (
                    <ItemCartDetail key={`cart-${cartId}`} book={book} eps={eps} cartId={cartId} />
                );
            })}
        </BoxBase>
    );
};

export default ListItemCart;
