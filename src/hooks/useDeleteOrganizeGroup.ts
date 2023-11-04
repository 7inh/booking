import { doMutation } from "../services/services";

export interface UseDeleteOrganizeGroupProps {
    onError?: (error: any) => void;
}

export interface UseDeleteOrganizeGroupReturn {}

const useDeleteOrganizeGroup = (props: UseDeleteOrganizeGroupProps) => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "organizeGroup",
        action: "deleteGroup",
        option: {
            onError: props.onError,
        },
    });

    return { mutateAsync, isLoading };
};

export default useDeleteOrganizeGroup;
