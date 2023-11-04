import { doMutation } from "src/services/services";

export interface UseInsertMemberRolesProps {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

const useInsertMemberRoles = ({ onSuccess, onError }: UseInsertMemberRolesProps) => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "organizeMember",
        action: "insertRoles",
        option: {
            onSuccess,
            onError,
        },
    });

    return { mutateAsync, isLoading };
};

export default useInsertMemberRoles;
