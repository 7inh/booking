import accountService from "src/services/account/account-service";
import authService from "src/services/auth/auth-service";
import botDocumentService from "src/services/bot-document/bot-document-service";
import botSourceService from "src/services/bot-source/bot-source-service";
import botService from "src/services/bot/bot-service";
import commonService from "src/services/common/common-service";
import coreService from "src/services/core/core-service";
import marketService from "src/services/market/market-service";
import organizeBotsService from "src/services/organize-bots/organize-bots-service";
import organizeGroupService from "src/services/organize-group/organize-group-service";
import organizeMemberService from "src/services/organize-member/organize-member-service";
import organizeService from "src/services/organize/organize-service";
import tmpService from "src/services/tmp/tmp-service";
import userWalletService from "src/services/user-wallet/user-wallet-service";
import { createQueryService, createMutationService } from "src/services/utils";
import readerService from "src/services/reader/reader-service";
import ttsService from "src/services/tss/text-to-speech-service";
import giftService from "src/services/gift/gift-service";
import paymentService from "src/services/payment/payment-service";

export const entityWithAction = {
    common: commonService,
    auth: authService,
    account: accountService,
    market: marketService,
    bot: botService,
    botDocument: botDocumentService,
    reader: readerService,
    botSource: botSourceService,
    core: coreService,
    organize: organizeService,
    organizeGroup: organizeGroupService,
    organizeMember: organizeMemberService,
    organizeBots: organizeBotsService,
    tmp: tmpService,
    userWallet: userWalletService,
    tts: ttsService,
    gift: giftService,
    payment: paymentService,
};

export const doQuery = createQueryService(entityWithAction);
export const doMutation = createMutationService(entityWithAction);

export default doQuery;
