import { AxiosError } from "axios";
import { doQuery } from "../services/services";

export interface UseGetBotSourceProps {
    botToken: string;
    sourceId?: number;
    enable?: boolean;
    filterValues?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
    page?: number;
}

export interface UseGetBotSourceReturn {
    data: any[];
    refetch: () => void;
    isFetched: boolean;
    isFetching: boolean;
}

const useGetBotSourceV2 = ({
    botToken,
    enable,
    sourceId,
    filterValues,
    onSuccess,
    onError,
    page,
}: UseGetBotSourceProps): UseGetBotSourceReturn => {
    const {
        data = [],
        refetch,
        isFetched,
        isFetching,
    } = doQuery({
        entity: "botSource",
        action: "get",
        params: {
            botToken,
            ...(sourceId ? { sourceId } : {}),
            ...(filterValues
                ? {
                      isGetAll: false,
                      filterKeys: ["contentDocument"],
                      filterValues: [filterValues || ""],
                  }
                : {}),
            ...(page ? { numPage: page, numRows: 10 } : {}),
            isGetAll: false,
        },
        option: {
            enable: Boolean(botToken) && (enable ?? true),
            onError,
            onSuccess: (data: any) => {
                onSuccess?.(data);
            },
            select: (data) => data?.data?.data || [],
        },
    });

    return {
        data,
        refetch,
        isFetched,
        isFetching,
    };
};

export default useGetBotSourceV2;
