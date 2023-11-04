import all from "src/services/market/all";
import botProfile from "src/services/market/bot-profile";
import botReview, {
    botReviewDelete,
    botReviewInsert,
    botReviewUpdate,
} from "src/services/market/bot-review";
import buy from "src/services/market/buy";
import getAllTags from "src/services/market/get-all-tags";
import personalize from "src/services/market/personalize";
import topRate from "src/services/market/top-rate";
import trendings from "src/services/market/trendings";
import userBots from "src/services/market/user-bots";
import {
    MarketAllParams,
    MarketBotProfileParams,
    MarketBotReviewDeleteParams,
    MarketBotReviewInsertParams,
    MarketBotReviewParams,
    MarketBotReviewUpdateParams,
    MarketBuyParams,
    MarketGetAllTagsParams,
    MarketPersonalizeParams,
    MarketTopRateParams,
    MarketTrendingsParams,
    MarketUserBotsParams,
} from "src/services/types";

const path = "/market";
const marketService = {
    all: (params: MarketAllParams) => all(path, params),
    botProfile: (params: MarketBotProfileParams) => botProfile(path, params),
    botReview: (params: MarketBotReviewParams) => botReview(path, params),
    botReviewInsert: (params: MarketBotReviewInsertParams) => botReviewInsert(path, params),
    botReviewDelete: (params: MarketBotReviewDeleteParams) => botReviewDelete(path, params),
    botReviewUpdate: (params: MarketBotReviewUpdateParams) => botReviewUpdate(path, params),
    personalize: (params: MarketPersonalizeParams) => personalize(path, params),
    trendings: (params: MarketTrendingsParams) => trendings(path, params),
    userBots: (params: MarketUserBotsParams) => userBots(path, params),
    getAllTags: (params: MarketGetAllTagsParams) => getAllTags(path, params),
    buy: (params: MarketBuyParams) => buy(path, params),
    topRate: (params: MarketTopRateParams) => topRate(path, params),
};

export default marketService;
