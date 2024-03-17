import { useCallback } from "react";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface UseSubmitContactProps {
    onSubscribeSuccess?: () => void;
}

const useSubscribe = ({ onSubscribeSuccess }: UseSubmitContactProps) => {
    const t = useTranslation();
    const snackbar = useSnackBar();

    const creteFormData = useCallback((email: string) => {
        return {
            "entry.266247859": email,
        };
    }, []);

    const subscribe = async (email: string) => {
        try {
            const formData = creteFormData(email);
            const response: any = await fetch(
                "https://docs.google.com/forms/u/0/d/e/1FAIpQLScZkja9MHjPoWDniED-J18FXXcU01tGyEvRFx4rWJp_Sw1SXw/formResponse",
                {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams(formData).toString(),
                }
            );

            onSubscribeSuccess?.();
            return response;
        } catch (error) {
            snackbar({
                message: t("error.sendEmailSubscribe"),
                severity: "error",
            });
        }
    };

    return { subscribe };
};

export default useSubscribe;
