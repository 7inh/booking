import { BotDocument } from "src/common/types";
import { doQuery } from "../services/services";

export interface UseGetBotDocumentProps {
    botToken: string;
    sourceId?: number;
    filterKeys: string[];
    filterValues: string[];
    isFilterErrorDocument?: boolean;
    page: number;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export interface UseGetBotDocumentReturn {
    data: BotDocument[];
    total: number;
    isFetching: boolean;
    isRefetching: boolean;
    isFetched: boolean;
    refetch: () => void;
}

const useGetBotDocumentV2 = ({
    botToken,
    sourceId,
    filterKeys,
    filterValues,
    page,
    onSuccess,
    onError,
}: UseGetBotDocumentProps): UseGetBotDocumentReturn => {
    const { data, isFetching, refetch, isRefetching, isFetched } = doQuery({
        entity: "botDocument",
        action: "get",
        params: {
            botToken,
            sourceId,
            isGetAll: false,
            ...(filterKeys.length > 0
                ? {
                      filterKeys,
                      filterValues,
                  }
                : {}),
            numRows: 10,
            numPage: page,
        },
        option: {
            enable: Boolean(botToken) && (sourceId ? sourceId >= 0 : true),
            onError,
            onSuccess: (data) => {
                onSuccess?.(data);
            },
        },
    });

    const documentData = data?.data?.data;

    const documentBySource: any =
        documentData && !("docs" in documentData) ? Object.values(data?.data?.data || {}) : [];

    return {
        data: documentBySource && documentBySource.length > 0 ? documentBySource[0] : [],
        total: Math.ceil(data?.data?.data?.totalCount / 10) || 0,
        isFetching,
        refetch,
        isRefetching,
        isFetched,
    };
};

export default useGetBotDocumentV2;
