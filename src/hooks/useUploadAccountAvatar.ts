import { doMutation } from "src/services/services";

export interface UseUpdateAccountAvatarProps {
    onSuccess?: (data: any, variables: any, context: any) => void;
    onError?: (error: any, variables: any, context: any) => void;
}

const useUploadAccountAvatar = ({ onSuccess, onError }: UseUpdateAccountAvatarProps) => {
    const { mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "account",
        action: "uploadAvatar",
        option: {
            onSuccess,
            onError,
        },
    });

    return { mutateAsync, isSuccess, isError, isLoading };
};

export default useUploadAccountAvatar;
