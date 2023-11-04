import { AxiosError } from "axios";
import { BotSource } from "src/common/types";
import { doQuery } from "../services/services";

export interface UseGetBotSourceProps {
    botToken: string;
    sourceId?: number;
    enable?: boolean;
    filterValues?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
}

export interface UseGetBotSourceReturn {
    data: BotSource[];
    refetch: () => void;
}

const useGetBotSource = ({
    botToken,
    enable,
    sourceId,
    filterValues,
    onSuccess,
    onError,
}: UseGetBotSourceProps): UseGetBotSourceReturn => {
    const { data: response, refetch } = doQuery({
        entity: "botSource",
        action: "get",
        params: {
            botToken,
            sourceId,
            ...(filterValues
                ? {
                      isGetAll: false,
                      filterKeys: ["source"],
                      filterValues: [filterValues || ""],
                  }
                : {}),
        },
        option: {
            enable: Boolean(botToken) && (enable ?? true),
            onError,
            onSuccess: (data: any) => {
                onSuccess?.(data);
            },
        },
    });

    if (response?.data) {
        const { data } = response.data;

        return {
            data: data?.map((item: any) => ({
                idSource: item.id as number,
                source: item.source as string,
                title: item.title as string,
                description: item.description as string,
                note: item.note as string,
            })),
            refetch,
        };
    }

    return {
        data: [],
        refetch,
    };
};

export default useGetBotSource;
