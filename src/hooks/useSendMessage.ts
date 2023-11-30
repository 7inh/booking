import { useCallback } from "react";
import { ContactFormValuesProps } from "src/components/Forms/FormContact";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface UseSubmitContactProps {
    onSendMessageSuccess?: () => void;
}

export interface SubmitContactParams extends ContactFormValuesProps {}

const useSendMessage = ({ onSendMessageSuccess }: UseSubmitContactProps) => {
    const t = useTranslation();
    const snackbar = useSnackBar();

    const creteFormData = useCallback((data: SubmitContactParams) => {
        return {
            "entry.1382788981": data.name,
            "entry.766644093": data.email,
            "entry.1196178560": data.subject,
            "entry.382415978": data.message,
        };
    }, []);

    const submitContact = async (data: SubmitContactParams) => {
        try {
            const formData = creteFormData(data);
            const response: any = await fetch(
                "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdM3s5GK_ipFAOA12gzLaF3toiYHszq37kUyqsgS2upAGA8sg/formResponse",
                {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams(formData).toString(),
                }
            );

            console.log(response);

            onSendMessageSuccess?.();
            return response;
        } catch (error) {
            snackbar({
                message: t("error.submitContactError"),
                severity: "error",
            });
        }
    };

    return { submitContact };
};

export default useSendMessage;
