import { TextField } from "@mui/material";
import { useState } from "react";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface InputQuantityProps {}

const InputQuantity = (props: InputQuantityProps) => {
    const t = useTranslation();

    const [value, setValue] = useState(1);

    return (
        <BoxBase
            sx={{
                display: "grid",
                gridAutoRows: "1fr",
                columnGap: 1,
                rowGap: 2,
            }}
        >
            <BoxBase
                showBorder
                sx={{
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "center",
                    userSelect: "none",
                }}
            >
                <BoxCenter
                    sx={{
                        cursor: "pointer",
                        px: 2,
                    }}
                    onClick={() => {
                        if (value > 1) {
                            setValue(value - 1);
                        }
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
                        // hidden border
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                border: "none",
                            },
                            height: "100%",
                            input: {
                                p: 0,
                                py: 3,
                                height: "100%",
                                textAlign: "center",
                            },
                        },
                    }}
                    value={value}
                    onChange={(event: any) => {
                        if (isNaN(event.target.value)) {
                            return;
                        }
                        setValue(Number(event.target.value));
                    }}
                />
                <BoxCenter
                    sx={{
                        cursor: "pointer",
                        px: 2,
                    }}
                    onClick={() => {
                        setValue(value + 1);
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
            <ButtonBase
                label={t("common.addToCart")}
                sx={{
                    fontWeight: 400,
                    textTransform: "uppercase",
                }}
            ></ButtonBase>
            <ButtonBase
                label={t("common.buyNow")}
                sx={{
                    gridColumn: "1 / 3",
                    fontSize: "20px",
                }}
            ></ButtonBase>
        </BoxBase>
    );
};

export default InputQuantity;
