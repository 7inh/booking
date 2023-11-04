import publishInfo from "src/services/bot/publish-info";
import get from "src/services/organize-bots/get";
import { BotOrgPublishInfoParams, OrganizeBotsGetParams } from "src/services/types";

const path = "/organize/bot";
const organizeBotsService = {
    get: (params: OrganizeBotsGetParams) => get(path, params),
    publishInfo: (params: BotOrgPublishInfoParams) => publishInfo(path, params),
};

export default organizeBotsService;
