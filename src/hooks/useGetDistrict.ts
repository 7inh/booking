import { AxiosError } from "axios";
import { CommonDistrictParams } from "src/services/types";
import { doQuery } from "../services/services";

export interface UseGetDistrictProps extends CommonDistrictParams {
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

const useGetDistrict = (props: UseGetDistrictProps) => {
    const { onSuccess, onError, ...params } = props;

    const {
        data: response,
        refetch,
        isFetching,
    } = doQuery({
        entity: "common",
        action: "district",
        params,
        option: {
            enable: Boolean(props.idCity),
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

export default useGetDistrict;
