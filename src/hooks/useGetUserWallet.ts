import useSnackBar from "src/hooks/utils/useSnackBar";
import { doQuery } from "../services/services";
import { UserWalletGetParams } from "src/services/types";
import useTranslation from "src/hooks/utils/useTranslation";

export interface UseGetUserWalletProps extends UserWalletGetParams {
    onSuccess?: (data: any) => void;
}

const useGetUserWallet = (props: UseGetUserWalletProps) => {
    const { onSuccess, ...params } = props;
    const snackbar = useSnackBar();
    const t = useTranslation();

    const {
        data: response,
        refetch,
        isFetching,
    } = doQuery({
        entity: "userWallet",
        action: "get",
        params: params,
        option: {
            enable: Boolean(props.walletId),
            onError: () => {
                snackbar({ message: t("error.unKnownError"), severity: "error" });
            },
            onSuccess: onSuccess,
        },
    });

    return {
        data: response?.data?.data || [],
        refetch,
        isFetching,
    };
};

export default useGetUserWallet;
