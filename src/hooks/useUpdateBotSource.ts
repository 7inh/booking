import { doMutation } from "src/services/services";

export interface UseUpdateDocumentProps {
    onSuccess?: (data: any, variables: any, context: any) => void;
    onError?: (error: any, variables: any, context: any) => void;
}

const useUpdateBotSource = ({ onSuccess, onError }: UseUpdateDocumentProps) => {
    const { mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "botSource",
        action: "update",
        option: {
            onSuccess,
            onError,
        },
    });

    return { mutateAsync, isSuccess, isError, isLoading };
};

export default useUpdateBotSource;
