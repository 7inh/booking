import { AxiosError } from "axios";
import { doQuery } from "../services/services";

export interface UseGetVoiceProps {
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

export interface UseGetVoiceReturn {
    data: any[];
    isFetched: boolean;
    isFetching: boolean;
}

const useGetVoice = (props?: UseGetVoiceProps): UseGetVoiceReturn => {
    const { data, isFetched, isFetching } = doQuery({
        entity: "tts",
        action: "listVoice",
        params: {},
        option: {
            enable: true,
            onError: props?.onError,
            onSuccess: (data) => {
                props?.onSuccess?.(data);
            },
            select: (data) => {
                const voices = data?.data
                    ?.filter((item: any) => item.flag === "vn")
                    .map((item: any) => ({
                        ...item,
                        name: item[item.id],
                    }));

                return voices;
            },
        },
    });

    return {
        data: data || [],
        isFetched,
        isFetching,
    };
};

export default useGetVoice;
