import calculatePriceAfterChangeBotType from "src/services/bot/calculate-price-after-change-bottype";
import chatBody from "src/services/bot/chatBody";
import deleteBot from "src/services/bot/delete";
import getAllTags from "src/services/bot/get-all-tags";
import profile from "src/services/bot/profile";
import publish from "src/services/bot/publish";
import publishDeleteRequest from "src/services/bot/publish-delete-request";
import publishGetMinMaxPrice from "src/services/bot/publish-get-min-max-price";
import publishInfo from "src/services/bot/publish-info";
import publishInsertCommentPreview from "src/services/bot/publish-insert-comment-preview";
import register from "src/services/bot/register";
import story from "src/services/bot/story";
import storyDelete from "src/services/bot/story-delete";
import storyDeleteHist from "src/services/bot/story-delete-hist";
import storyDetail from "src/services/bot/story-detail";
import storyInsert from "src/services/bot/story-insert";
import storyLatest from "src/services/bot/story-latest";
import storyShare from "src/services/bot/story-share";
import storyShareGet from "src/services/bot/story-share-get";
import storyUpdate from "src/services/bot/story-update";
import update from "src/services/bot/update";
import updatePrompt from "src/services/bot/update-prompt";
import updateQPrompt from "src/services/bot/update-q-prompt";
import uploadAvatar from "src/services/bot/upload-avatar";
import userBots from "src/services/bot/user-bots";
import {
    BotProfileParams,
    BotUpdateParams,
    BotUserBotParams,
    BotUploadAvatarParams,
    BotDeleteParams,
    BotRegisterParams,
    BotUpdatePromptParams,
    BotChatBodyParams,
    BotUpdateQPromptParams,
    BotGetAllTagsParams,
    BotPublishParams,
    BotPublishInfoParams,
    BotPublishGetMinMaxPriceParams,
    BotPublishInsertCommentPreviewParams,
    BotPublishDeleteRequestParams,
    BotStoryParams,
    BotStoryLatestParams,
    BotStoryInsertParams,
    BotStoryDetailParams,
    BotStoryDeleteParams,
    BotStoryUpdateParams,
    BotCalculatePriceAfterChangeBotTypeParams,
    BotStoryDeleteHistoryParams,
    BotStoryShareParams,
    BotStoryShareGetParams,
} from "src/services/types";

const path = "/bot";
const botService = {
    profile: (params: BotProfileParams) => profile(path, params),
    userBots: (params: BotUserBotParams) => userBots(path, params),
    update: (params: BotUpdateParams) => update(path, params),
    uploadAvatar: (params: BotUploadAvatarParams) => uploadAvatar(path, params),
    delete: (params: BotDeleteParams) => deleteBot(path, params),
    register: (params: BotRegisterParams) => register(path, params),
    updatePrompt: (params: BotUpdatePromptParams) => updatePrompt(path, params),
    updateQPrompt: (params: BotUpdateQPromptParams) => updateQPrompt(path, params),
    chatBody: (params: BotChatBodyParams) => chatBody(path, params),
    getAllTags: (params: BotGetAllTagsParams) => getAllTags(path, params),
    publish: (params: BotPublishParams) => publish(path, params),
    publishInfo: (params: BotPublishInfoParams) => publishInfo(path, params),
    publishGetMinMaxPrice: (params: BotPublishGetMinMaxPriceParams) =>
        publishGetMinMaxPrice(path, params),
    publishInsertCommentPreview: (params: BotPublishInsertCommentPreviewParams) =>
        publishInsertCommentPreview(path, params),
    publishDeleteRequest: (params: BotPublishDeleteRequestParams) =>
        publishDeleteRequest(path, params),
    story: (params: BotStoryParams) => story(path, params),
    storyLatest: (params: BotStoryLatestParams) => storyLatest(path, params),
    storyInsert: (params: BotStoryInsertParams) => storyInsert(path, params),
    storyDetail: (params: BotStoryDetailParams) => storyDetail(path, params),
    storyDelete: (params: BotStoryDeleteParams) => storyDelete(path, params),
    storyDeleteHist: (params: BotStoryDeleteHistoryParams) => storyDeleteHist(path, params),
    storyUpdate: (params: BotStoryUpdateParams) => storyUpdate(path, params),
    storyShare: (params: BotStoryShareParams) => storyShare(path, params),
    storyShareGet: (params: BotStoryShareGetParams) => storyShareGet(path, params),
    calculatePriceAfterChangeBotType: (params: BotCalculatePriceAfterChangeBotTypeParams) =>
        calculatePriceAfterChangeBotType(path, params),
};

export default botService;
