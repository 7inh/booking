import { useLayoutEffect, useState } from "react";
import { Bot } from "src/common/types";
import { getFilterKeysAndValues } from "src/common/utils";
import { BotUserBotParams } from "src/services/types";
import { doQuery } from "../services/services";

export interface UseGetUserBotsProps extends BotUserBotParams {
    search?: string;
    tags?: string[];
    itemsPerPage?: number;
}

export interface UseMarketAllReturn {
    data: Bot[];
    totalCount: number;
    totalItems: number;
    refetch: () => void;
    isFetching: boolean;
    isFetched: boolean;
}

const useGetUserBots = (props?: UseGetUserBotsProps): UseMarketAllReturn => {
    const [totalCount, setTotalCount] = useState(0);

    const {
        data: response,
        refetch,
        isFetching,
        isFetched,
    } = doQuery({
        entity: "bot",
        action: "userBots",
        params: {
            ...props,
            organizeId: props?.organizeId,
            groupId: props?.groupId,
            options: props?.options,
            ...(getFilterKeysAndValues(
                {
                    botName: props?.search ? [props?.search] : [],
                    tags: props?.tags || [],
                },
                ["botName", "tags"]
            ) || {}),
            isGetAll: props?.isGetAll ?? false,
            numPage: props?.numPage,
            numRows: props?.itemsPerPage || 10,
        },
    });

    useLayoutEffect(() => {
        if (response?.data?.data?.totalCount && response?.data?.data?.totalCount !== totalCount)
            setTotalCount(response?.data?.data?.totalCount);
    }, [response?.data?.data?.totalCount, totalCount]);

    return {
        data: (response?.data?.data?.bots || []).map((bot: any) => ({
            id: bot.botToken,
            authName: bot.authName,
            avatar: bot.avatar,
            botName: bot.botName,
            description: bot.description,
            language: bot.language,
            version: bot.version,
            isPublic: bot.isPublic,
            isBuy: bot.isBuy,
            level: bot.level,
            organizeId: bot.organizeId,
            groupId: bot.groupId,
            price: bot.price,
            chatColor: bot.chatColor,
            botType: bot.botType,
        })),
        totalItems: totalCount,
        totalCount: Math.ceil(totalCount / 10),
        refetch,
        isFetching,
        isFetched,
    };
};

export default useGetUserBots;
