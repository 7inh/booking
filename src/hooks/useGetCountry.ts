import { AxiosError } from "axios";
import { doQuery } from "../services/services";

export interface UseGetMemberRolesProps {
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

export interface UseGetMemberRolesReturn {}

const useGetCountry = (props: UseGetMemberRolesProps) => {
    const {
        data: response,
        refetch,
        isFetching,
    } = doQuery({
        entity: "common",
        action: "country",
        params: {},
        option: {
            enable: true,
            onError: props?.onError,
            onSuccess: props?.onSuccess,
        },
    });

    return {
        data: response?.data?.data || [],
        refetch,
        isFetching,
    };
};

export default useGetCountry;
