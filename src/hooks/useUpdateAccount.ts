import { doMutation } from "src/services/services";

export interface UseUpdateAccountProps {
    onSuccess?: (data: any, variables: any, context: any) => void;
    onError?: (error: any) => void;
}

const useUpdateAccount = ({ onSuccess, onError }: UseUpdateAccountProps) => {
    const { mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "account",
        action: "update",
        option: {
            onSuccess,
            onError,
        },
    });

    return { mutateAsync, isSuccess, isError, isLoading };
};

export default useUpdateAccount;
