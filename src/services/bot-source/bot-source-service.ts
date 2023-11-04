import deleteSource from "src/services/bot-source/delete";
import get from "src/services/bot-source/get";
import insert from "src/services/bot-source/insert";
import update from "src/services/bot-source/update";
import {
    BotSourceDeleteParams,
    BotSourceGetParams,
    BotSourceInsertParams,
    BotSourceUpdateParams,
} from "src/services/types";

const path = "/bot_source";
const botSourceService = {
    get: (params: BotSourceGetParams) => get(path, params),
    insert: (params: BotSourceInsertParams) => insert(path, params),
    update: (params: BotSourceUpdateParams) => update(path, params),
    delete: (params: BotSourceDeleteParams) => deleteSource(path, params),
};

export default botSourceService;
