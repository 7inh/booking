export interface CommonCountryParams {}
export interface CommonCityParams {}
export interface CommonDistrictParams {
    idCity: string;
}
export interface CommonWardParams {
    idDistrict: string;
}
export interface CommonLLMParams {
    botToken?: string;
}

export interface CommonKCoinParams {}

export interface LoginParams {
    email: string;
    password: string;
}

export interface AuthVerifyTokenParams {
    token: string;
}

export interface AuthRegisterParams {
    email: string;
    password: string;
    displayName: string;
    phoneNumber?: string;
    country?: string;
    language?: string;
    zipcode?: string;
}

export interface RefreshTokenParams {
    refreshToken: string;
    accessToken: string;
}

export interface AccountGetParams {}

export interface AccountRequestVerifyParams {
    phoneNumber?: string;
}

export interface AccountVerifyParams {
    mail: string;
    verifyToken: string;
}

export interface AccountPhoneVerifyParams {
    id?: string;
    verifyToken: string;
}

export interface AccountForgotPasswordParams {
    email: string;
}

export interface AccountChangePasswordParams {
    oldPassword: string;
    password: string;
}

export interface AccountResetPasswordParams {
    email: string;
    password: string;
}

export interface AccountUpdateParams {
    displayName: string;
    phoneNumber: string;
    language: string;
    bio: string;
    country: string;
    idCity: string;
    idDistrict: string;
    idWard: string;
    zipcode: string;
}

export interface AccountUploadAvatarParams {
    avatar: File;
}

export interface AccountVerifyResetPasswordParams {
    email: string;
    verifyToken: string;
}

export interface ChatCompletionsParams {
    messages: {
        role: "user" | "assistant";
        content: string;
    }[];
    botToken: string;
}

export interface MarketAllParams {
    isGetAll?: boolean;
    numRows?: number;
    numPage?: number;
    organizeId?: string[];
    groupId?: string[];
    filterKeys?: string[];
    filterValues?: string[];
}

export interface MarketBotProfileParams {
    botToken: string;
}

export interface MarketBotReviewParams {
    botToken: string;
    isGetAll?: boolean;
    numRows?: number;
    numPage?: number;
}

export interface MarketBotReviewInsertParams {
    botToken: string;
    star: number;
    comment: string;
    idParent?: number;
}

export interface MarketBotReviewDeleteParams {
    idReview: string;
}

export interface MarketBotReviewUpdateParams {
    idReview: string;
    star: number;
    comment: string;
}

export interface MarketUserBotsParams {}

export interface MarketPersonalizeParams {
    isGetAll?: boolean;
    numRows?: number;
    numPage?: number;
}

export interface MarketTopRateParams {
    isGetAll?: boolean;
    numRows?: number;
    numPage?: number;
}

export interface MarketTrendingsParams {
    isGetAll?: boolean;
    numRows?: number;
    numPage?: number;
}

export interface MarketBuyParams {
    botToken: string;
}

export interface MarketGetAllTagsParams {}

export interface BotUpdateParams {
    botToken: string;

    botName: string;
    description: string;
    facts?: string[] | null;
    tags: string[];
    voiceId?: string;
    language?: string;
    onlyContext?: boolean;
    startMessage?: string;
    chatColor?: string;
}

export interface BotUpdatePromptParams {
    botToken: string;
    prompt: string;
}

export interface BotGetAllTagsParams {
    options?: string;
    organizeId?: string;
    groupId?: string;
}

export interface BotUpdateQPromptParams {
    botToken: string;
    qPrompt: string;
}

export interface BotDeleteParams {
    botToken: string;
}

export interface BotRegisterParams {
    botName: string;
    voiceId: string;
    organizeId?: string;
    description: string;
    groupId?: string | null;
    facts?: string[];
    tags?: string[];
    language?: string;
    onlyContext?: boolean;
    startMessage?: string;
    llm?: string;
    avatar?: File;
    chatColor?: string;
}

export interface BotUploadAvatarParams {
    botToken: string;
    avatar: File;
}

export interface BotProfileParams {
    botToken: string;
}

export interface BotPublishParams {
    botToken: string;
    price?: number;
    note?: string;
    description?: string;
    manual?: string;
    tags?: string[];
    isPublishOrg: boolean;
    extends?: {
        organizeId: string;
        groupId?: string;
    };
    images?: File[];
}

export interface BotPublishInsertCommentPreviewParams {
    botToken: string;
    publishVersion: string;
    comment?: string;
    images?: File[];
}

export interface BotPublishInfoParams {
    botToken: string;
}

export interface BotStoryParams {
    botToken: string;
}

export interface BotStoryLatestParams {
    botToken: string;
}

export interface BotStoryShareGetParams {
    shareId: string;
}

export interface BotStoryShareParams {
    storyId: string;
}

export interface BotCalculatePriceAfterChangeBotTypeParams {
    botToken: string;
    botType: string;
}

export interface BotStoryUpdateParams {
    storyId: string;
    storyName: string;
}

export interface BotStoryDetailParams {
    storyId: string;
}

export interface BotStoryDeleteParams {
    storyId: string;
}

export interface BotStoryDeleteHistoryParams {
    storyId: string;
}

export interface BotStoryInsertParams {
    botToken: string;
    storyName: string;
}

export interface BotPublishDeleteRequestParams {
    botToken: string;
    publishVersion: string;
}

export interface BotOrgPublishInfoParams {
    botToken: string;
}

export interface BotPublishGetMinMaxPriceParams {
    botToken: string;
}

export interface BotChatBodyParams {
    botToken: string;
    messages: {
        role: string;
        content: string;
    }[];
}

export interface BotUserBotParams {
    options?: number | number[];
    organizeId?: string[];
    groupId?: string[];
    filterKeys?: string[];
    filterValues?: string[];
    isGetAll?: boolean;
    numPage?: number;
    numRows?: number;
    orderKey?: string;
    orderValue?: string;
}

export interface ReaderCountTokensParams {
    file: File | null;
    fileName: string;
}

export interface IndexerIndexFileParams {
    botToken: string;
    file: File | null;
    title?: string;
    description?: string;
    note?: string;
}

export interface IndexerRawTextParams {
    botToken: string;
    title?: string;
    content?: string;
    note?: string;
}

export interface IndexerSingleDocumentParams {}

export interface BotSourceGetParams {
    botToken: string;
    sourceId?: number;
    isGetAll?: boolean;
    filterKeys?: string[];
    filterValues?: string[];
    numRows?: number;
    numPage?: number;
}

export interface BotSourceInsertParams {
    botToken: string;
    source: string;
    title: string;
    description?: string;
    note?: string;
    file: File;
}

export interface BotSourceUpdateParams {
    id: number;
    botToken: string;
    source: string;
    title: string;
    description?: string;
    note?: string;
}

export interface BotSourceDeleteParams {
    id: number;
}

export interface BotDocumentGetParams {
    botToken: string;
    sourceId?: number;
    isGetAll?: boolean;
    filterKeys?: string[];
    filterValues?: string[];
    numPage?: number;
    numRows?: number;
}

export interface BotDocumentCountParams {
    sourceId: number;
}

export interface BotDocumentInsertParams {
    documents: {
        title?: string;
        botToken: string;
        raw: string;
        isRaw: boolean;
        summary?: string;
        sourceId?: number;
        priority?: number;
    }[];
}

export interface BotDocumentUpdateParams {
    documents: {
        idDocument: string;
        botToken: string;
        summary: string;
        raw: string;
        sourceId: number;
        priority: number;
    }[];
}

export interface BotDocumentDeleteParams {
    idDocument: string;
    botToken: string;
}

export interface CoreVoiceParams {}
export interface VoiceParams {}

export interface OrganizeGetParams {
    isGetAll?: boolean;
    numPage?: number;
    numRows?: number;
}
export interface OrganizeDetailParams {
    id: string;
}

export interface OrganizeJoinedParams {}

export interface OrganizeInsertParams {
    ownerToken: string;
    name: string;
    description: string;
    major: string;
}

export interface OrganizeBotsGetParams {
    organizeId: string;
    groupId?: string;
    isGetAll?: boolean;
    numPage?: number;
    numRows?: number;
}

export interface OrganizeGroupGetParams {
    organizeId: string;
    groupId?: string;
    isGetAll?: boolean;
    numPage?: number;
    numRows?: number;
    filterKey?: string;
    filterValue?: string;
}

export interface OrganizeGroupDetailParams {
    organizeId: string;
    groupId: string;
}

export interface OrganizeGroupJoinedParams {
    organizeId: string[];
}

export interface OrganizeGroupInsertParams {
    organizeId: string;
    name: string;
    description?: string;
    avatar?: File;
}

export interface OrganizeGroupDeleteParams {
    organizeId: string;
    groupId: string[];
}

export interface OrganizeGroupUpdateParams {
    organizeId: string;
    groupId: string;
    name: string;
    description: string;
    avatar?: File;
}

export interface OrganizeMemberGetParams {
    organizeId: string;
    groupId?: string;
    isGetAll?: boolean;
    numPage?: number;
    numRows?: number;
}

export interface OrganizeMemberGetRoleParams {
    organizeId: string;
    groupId?: string;
    email?: string;
}

export interface OrganizeMemberInsertParams {
    organizeId?: string;
    inviteOrganize: boolean;
    groupId?: string;
    listInvite: string[];
}

export interface OrganizeMemberInsertRolesParams {
    organizeId: string;
    addOrganize: boolean;
    groupId: string | null;
    listRoles: {
        email: string;
        role: string;
    }[];
}

export interface OrganizeMemberDeleteRolesParams {
    organizeId: string;
    deleteOrganize: boolean;
    groupId: string | null;
    listDelete: {
        email: string;
        role: string;
    }[];
}

export interface OrganizeMemberDeleteParams {
    organizeId: string;
    deleteOrganize: boolean;
    groupId?: string;
    listDelete: string[];
}

export interface OrganizeMemberVerifyParams {
    groupId: string;
    verifyToken: string;
}

export interface UserWalletGetParams {
    walletId: string;
}

export interface UserWalletGetTransactionParams {
    walletId: string;
}

export interface GiftInsertParams {
    gifts: {
        increaseMoney: number;
        expireTime: string;
        quantity: number;
    }[];
}

export interface GiftGetInfoParams {
    giftCode: string;
    caseCheck: "GIFTCODE" | "VOUCHER";
}

export interface GiftUseParams {
    giftCode: string;
}

export interface PaymentInitParams {
    productId: string;
    quantity: number;
    vouchers: string[];
}

export interface PaymentCancelPackageParams {
    productId: string;
}
