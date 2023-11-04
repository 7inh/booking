import { doMutation } from "../services/services";

export interface UseDeleteDocumentProps {
    onSuccess?: (data: any, variables: any, context: any) => void;
    onError?: (error: any) => void;
}

const useDeleteBot = ({ onSuccess, onError }: UseDeleteDocumentProps) => {
    const { mutate, mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "bot",
        action: "delete",
        option: {
            onSuccess,
            onError,
        },
    });

    return { mutate, mutateAsync, isSuccess, isError, isLoading };
};

export default useDeleteBot;
