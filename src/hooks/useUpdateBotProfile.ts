import { doMutation } from "src/services/services";

export interface UseUpdateDocumentProps {
    onSuccess?: (data: any, variables: any, context: any) => void;
    onError?: (error: any) => void;
}

const useUpdateBotProfile = ({ onSuccess, onError }: UseUpdateDocumentProps) => {
    const { mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "bot",
        action: "update",
        option: {
            onSuccess,
            onError,
        },
    });

    return { mutateAsync, isSuccess, isError, isLoading };
};

export default useUpdateBotProfile;
