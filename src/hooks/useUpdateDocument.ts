import { doMutation } from "src/services/services";

export interface UseUpdateDocumentProps {
    onSuccess?: (data: any, variables: any, context: any) => void;
    onError?: (error: any, variables: any, context: any) => void;
}

const useUpdateDocument = ({ onSuccess, onError }: UseUpdateDocumentProps) => {
    const { mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "botDocument",
        action: "update",
        option: {
            onSuccess,
            onError,
        },
    });

    return { mutateAsync, isSuccess, isError, isLoading };
};

export default useUpdateDocument;
