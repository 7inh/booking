import { AxiosError } from "axios";
import { CommonWardParams } from "src/services/types";
import { doQuery } from "../services/services";

export interface UseGetWardProps extends CommonWardParams {
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

const useGetWard = (props: UseGetWardProps) => {
    const { onSuccess, onError, ...params } = props;

    const {
        data: response,
        refetch,
        isFetching,
    } = doQuery({
        entity: "common",
        action: "ward",
        params,
        option: {
            enable: Boolean(props.idDistrict),
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

export default useGetWard;
