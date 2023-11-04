import { doMutation } from "../services/services";

export interface UseDeleteMemberRolesProps {
    onError?: (error: any) => void;
}

export interface UseDeleteMemberRolesReturn {}

const useDeleteMemberRoles = (props: UseDeleteMemberRolesProps) => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "organizeMember",
        action: "deleteRoles",
        option: {
            onError: props.onError,
        },
    });

    return { mutateAsync, isLoading };
};

export default useDeleteMemberRoles;
