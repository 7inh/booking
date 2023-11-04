import { AxiosError } from "axios";
import { doQuery } from "../services/services";

export interface UseGetMemberRolesProps {
    organizeId: string;
    groupId?: string;
    email?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

export interface UseGetMemberRolesReturn {}

const useGetMemberRoles = ({ onSuccess, onError, ...props }: UseGetMemberRolesProps) => {
    const {
        data: response,
        refetch,
        isFetching,
    } = doQuery({
        entity: "organizeMember",
        action: "getRoles",
        params: props,
        option: {
            enable: Boolean(props.organizeId),
            onError,
            onSuccess,
        },
    });

    return {
        data: response?.data?.data || [],
        refetch,
        isFetching,
    };
};

export default useGetMemberRoles;
