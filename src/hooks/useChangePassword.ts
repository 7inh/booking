import { doMutation } from "src/services/services";

export interface UseBuyKcoinProps {
    onError?: (error: any) => void;
}

const useChangePassword = ({ onError }: UseBuyKcoinProps) => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "account",
        action: "changePassword",
        option: {
            onError: (error: any) => {
                onError?.(error);
            },
        },
    });

    return { mutateAsync, isLoading };
};

export default useChangePassword;
