import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import { BotPublishInfoParams } from "src/services/types";
import { doQuery } from "../services/services";

export interface UseGetPublishInfoProps extends BotPublishInfoParams {
    onSuccess?: (data: any) => void;
}

const useGetPublishInfo = (props: UseGetPublishInfoProps) => {
    const t = useTranslation();
    const snackbar = useSnackBar();

    const { data, isFetched, isLoading, isFetching, refetch } = doQuery({
        entity: "bot",
        action: "publishInfo",
        params: props,
        option: {
            enable: Boolean(props.botToken),
            onError: (error: any) => {
                if (error.response?.data?.data?.code !== "DATA_NOT_FOUND")
                    snackbar({ message: t("error.unKnownError"), severity: "error" });
            },
            onSuccess: (data) => {
                props.onSuccess?.(data?.data?.data);
            },
        },
    });

    return { data: data?.data?.data || [], isFetched, isLoading, isFetching, refetch };
};

export default useGetPublishInfo;
