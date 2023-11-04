import useSnackBar from "src/hooks/utils/useSnackBar";
import { doMutation } from "../services/services";

export interface UseRemoveUserFromOrgOrGroupProps {
    onSuccess?: (data: any, variables: any, context: any) => void;
}

const useRemoveUserFromOrgOrGroup = ({ onSuccess }: UseRemoveUserFromOrgOrGroupProps) => {
    const snackbar = useSnackBar();

    const { mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "organizeMember",
        action: "removeFromOrgOrGroup",
        option: {
            onSuccess,
            onError: (error: any) => {
                snackbar({
                    message: error.response?.data.message || "Unknown error",
                    severity: "error",
                });
            },
        },
    });

    return { mutateAsync, isSuccess, isError, isLoading };
};

export default useRemoveUserFromOrgOrGroup;
