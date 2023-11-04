import { AxiosError } from "axios";
import { doQuery } from "../services/services";

export interface UseGetCityProps {
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

const useGetCity = ({ onError, onSuccess, ...params }: UseGetCityProps) => {
    const {
        data: response,
        refetch,
        isFetching,
    } = doQuery({
        entity: "common",
        action: "city",
        params,
        option: {
            enable: true,
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

export default useGetCity;
