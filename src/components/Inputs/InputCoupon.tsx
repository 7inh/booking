import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { Coupon } from "src/common/types";
import ButtonBase from "src/components/Buttons/ButtonBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface InputCouponProps {
    sx?: TextFieldProps["sx"];
    onSubmit?: (coupon: Coupon) => void;
}

const InputCoupon = ({ sx, onSubmit }: InputCouponProps) => {
    const t = useTranslation();

    // todo: add coupon validation
    const [code, setCode] = useState<string>("");

    return (
        <TextField
            fullWidth
            size="small"
            sx={{
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "primary.main",
                        borderRadius: "1px",
                    },
                    "&:hover fieldset": {
                        borderColor: "primary.main",
                    },
                },
                "& .MuiInputBase-root": {
                    p: 0,
                },
                ...sx,
            }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                    onSubmit?.({
                        code,
                        discount: 10000,
                        value: 10000,
                    });
                }
            }}
            InputProps={{
                endAdornment: (
                    <ButtonBase
                        sx={{
                            flexShrink: 0,
                        }}
                        label={t("common.submitCoupon")}
                        onClick={() =>
                            onSubmit?.({
                                code,
                                discount: 10000,
                                value: 10000,
                            })
                        }
                    />
                ),
            }}
        />
    );
};

export default InputCoupon;
