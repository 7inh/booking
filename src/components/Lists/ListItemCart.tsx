import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CardMedia, TextField } from "@mui/material";
import { CartItem } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useCartContext } from "src/contexts/CartContext";

export interface ListItemCartProps {
    items: CartItem[];
}

const ListItemCart = ({ items }: ListItemCartProps) => {
    const { updateCart, removeFromCart } = useCartContext();

    return (
        <BoxBase
            flexGrow={1}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}
        >
            {items.map((item) => (
                <BoxHorizon
                    key={item.book.id}
                    sx={{
                        alignItems: "stretch",
                    }}
                >
                    <CardMedia
                        component="img"
                        src={item.book.cover}
                        sx={{
                            width: "100px",
                            height: "100px",
                            objectFit: "scale-down",
                            p: 0.75,
                            flexShrink: 0,
                        }}
                    />
                    <BoxBase
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            pb: 0.75,
                        }}
                    >
                        <BoxBase>
                            <TypographyBase
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: 600,
                                }}
                            >
                                {item.book.title}
                            </TypographyBase>
                            <TypographyBase
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    color: "#f44336",
                                }}
                            >
                                {(item.book.current_price * item.quantity).toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </TypographyBase>
                        </BoxBase>
                        <BoxBase
                            showBorder
                            sx={{
                                display: "flex",
                                alignItems: "stretch",
                                justifyContent: "center",
                                userSelect: "none",
                                width: "fit-content",
                            }}
                        >
                            <BoxCenter
                                sx={{
                                    cursor: "pointer",
                                    px: 2,
                                }}
                                onClick={() => {
                                    updateCart(item.book.id, Math.max(item.quantity - 1, 1));
                                }}
                            >
                                <TypographyBase
                                    sx={{
                                        fontSize: "20px",
                                        fontWeight: 500,
                                        textAlign: "center",
                                    }}
                                >
                                    -
                                </TypographyBase>
                            </BoxCenter>
                            <TextField
                                sx={{
                                    width: "50px",
                                    textAlign: "center",
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            border: "none",
                                            borderRadius: "0px",
                                        },
                                        height: "100%",
                                        input: {
                                            p: 0,
                                            height: "100%",
                                            textAlign: "center",
                                        },
                                    },
                                    bgcolor: "#f5f5f5",
                                }}
                                value={item.quantity}
                                onChange={(event: any) => {
                                    if (isNaN(event.target.value)) {
                                        return;
                                    }
                                    updateCart(
                                        item.book.id,
                                        Math.max(Number(event.target.value), 1)
                                    );
                                }}
                            />
                            <BoxCenter
                                sx={{
                                    cursor: "pointer",
                                    px: 2,
                                }}
                                onClick={() => {
                                    updateCart(item.book.id, item.quantity + 1);
                                }}
                            >
                                <TypographyBase
                                    sx={{
                                        fontSize: "20px",
                                        fontWeight: 500,
                                    }}
                                >
                                    +
                                </TypographyBase>
                            </BoxCenter>
                        </BoxBase>
                    </BoxBase>
                    <BoxCenter p={1}>
                        <DeleteForeverIcon
                            sx={{
                                cursor: "pointer",
                                color: "#f44336",
                                fontSize: "30px",
                            }}
                            onClick={() => {
                                removeFromCart(item.book.id);
                            }}
                        />
                    </BoxCenter>
                </BoxHorizon>
            ))}
        </BoxBase>
    );
};

export default ListItemCart;
