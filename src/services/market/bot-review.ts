import instance from "src/common/instances/instance";
import {
    MarketBotReviewDeleteParams,
    MarketBotReviewInsertParams,
    MarketBotReviewParams,
    MarketBotReviewUpdateParams,
} from "src/services/types";

const botReview = async (rootPath: string, { botToken, ...params }: MarketBotReviewParams) => {
    return await instance.get(`${rootPath}/bot_review/get/${botToken}`, { params });
};

export default botReview;

export const botReviewInsert = async (rootPath: string, params: MarketBotReviewInsertParams) => {
    return await instance.post(`${rootPath}/bot_review/insert`, params);
};

export const botReviewDelete = async (rootPath: string, params: MarketBotReviewDeleteParams) => {
    return await instance.delete(`${rootPath}/bot_review/delete`, { params });
};

export const botReviewUpdate = async (rootPath: string, params: MarketBotReviewUpdateParams) => {
    return await instance.put(`${rootPath}/bot_review/update`, params);
};
