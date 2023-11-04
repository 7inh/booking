import { useAccountContext } from "src/contexts/AccountContext";
import { doQuery } from "../services/services";

export interface UseGetAccountProfileProps {
    onError?: (error: any) => void;
}

const useGetAccountInfoV2 = ({ onError }: UseGetAccountProfileProps) => {
    const { user, setDetail } = useAccountContext();

    const {
        data = {},
        isLoading,
        isFetching,
        isSuccess,
        refetch,
    } = doQuery({
        entity: "account",
        action: "get",
        params: {},
        option: {
            enable: Boolean(user?.userToken),
            onError,
            onSuccess: (data) => {
                setDetail(data);
            },
            select: (data) => data?.data?.data,
        },
    });

    return { account: data, isLoading, isFetching, isSuccess, refetch };
};

export default useGetAccountInfoV2;
