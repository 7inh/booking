import count from "src/services/bot-document/count";
import deleteDocument from "src/services/bot-document/delete";
import get from "src/services/bot-document/get";
import insert from "src/services/bot-document/insert";
import update from "src/services/bot-document/update";
import {
    BotDocumentDeleteParams,
    BotDocumentGetParams,
    BotDocumentUpdateParams,
    BotDocumentCountParams,
    BotDocumentInsertParams,
} from "src/services/types";

const path = "/bot_document";
const botDocumentService = {
    get: (params: BotDocumentGetParams) => get(path, params),
    insert: (params: BotDocumentInsertParams) => insert(path, params),
    update: (params: BotDocumentUpdateParams) => update(path, params),
    delete: (params: BotDocumentDeleteParams) => deleteDocument(path, params),
    count: (params: BotDocumentCountParams) => count(path, params),
};

export default botDocumentService;
