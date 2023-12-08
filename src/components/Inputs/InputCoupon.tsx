import { TextField, TextFieldProps } from "@mui/material";
import { useCallback, useState } from "react";
import { Coupon } from "src/common/types";
import { isRequestSuccessful } from "src/common/utils";
import ButtonBase from "src/components/Buttons/ButtonBase";
import IconLoadingBackdrop from "src/components/Icons/IconLoadingBackdrop";
import useCoupon from "src/hooks/useCoupon";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface InputCouponProps {
    coupons?: Coupon[];
    sx?: TextFieldProps["sx"];
    onSubmit?: (coupon: Coupon) => void;
}

const InputCoupon = ({ coupons, sx, onSubmit }: InputCouponProps) => {
    const t = useTranslation();
    const snackbar = useSnackBar();

    const [code, setCode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { mutateAsync: applyCoupon } = useCoupon();

    const handleApplyCoupon = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: any = await applyCoupon({ code });
            console.log(response);
            if (isRequestSuccessful(response)) {
                const coupon = response.data;
                if (coupons?.find((coupon) => coupon.code === code)) {
                    setCode("");
                    return;
                } else {
                    onSubmit?.(coupon);
                }
            }
        } catch (error) {
            console.log(error);
            snackbar({
                severity: "error",
                message: t("error.cantApplyCoupon"),
            });
        } finally {
            setIsLoading(false);
        }
    }, [applyCoupon, code, coupons, onSubmit, snackbar, t]);

    return (
        <>
            <IconLoadingBackdrop open={isLoading} />
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
                        handleApplyCoupon();
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <ButtonBase
                            sx={{
                                flexShrink: 0,
                            }}
                            label={t("common.submitCoupon")}
                            onClick={handleApplyCoupon}
                        />
                    ),
                }}
            />
        </>
    );
};

export default InputCoupon;
