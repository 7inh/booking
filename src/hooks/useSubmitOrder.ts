import { useCallback } from "react";
import { OrderFormValuesProps } from "src/components/Forms/FormCheckOut";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface UseSubmitOrderProps {
    onSubmitOrderSuccess?: () => void;
}

export interface SubmitOrderParams extends OrderFormValuesProps {
    items: string;
    coupon?: string[];
    shippingFee?: number;
    total?: number;
}

const useSubmitOrder = ({ onSubmitOrderSuccess }: UseSubmitOrderProps) => {
    const t = useTranslation();
    const snackbar = useSnackBar();

    const creteFormData = useCallback((data: SubmitOrderParams) => {
        return {
            "entry.1570352896": data.name,
            "entry.1983796691": data.email,
            "entry.1303480121": data.phone,
            "entry.1340620684": data.address,
            "entry.354818500": data.date,
            "entry.26560222": data.note,
            "entry.439999531": data.items,
            "entry.1516049135": data.coupon?.join(",") || "",
            "entry.1238688360": data.shippingFee?.toString() || "",
            "entry.265817064": data.total?.toString() || "",
        };
    }, []);

    const submitOrder = async (data: SubmitOrderParams) => {
        try {
            const formData = creteFormData(data);
            const response: any = await fetch(
                "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc10uxZMdx3IQ4WE-767dwNHsQMurCWE-eYc7MFNNrKlC5pmA/formResponse",
                {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams(formData).toString(),
                }
            );

            onSubmitOrderSuccess?.();
            return response;
        } catch (error) {
            snackbar({
                message: t("error.submitOrderError"),
                severity: "error",
            });
        }
    };

    return { submitOrder };
};

export default useSubmitOrder;
