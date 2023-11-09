import { Alert } from "@mui/material";
import { ComponentProps } from "react";

export interface Message {
    key?: string;
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
}

export interface Account {
    avatar?: string;
    email: string;
    displayName: string;
}

export interface Bot {
    id: string;
    authName: string;
    avatar: string | null;
    botName: string;
    description: string;
    isPublic?: boolean;
    isBuy?: boolean;
    level: number;
    price?: number;

    withDraw?: boolean;
    llm?: string;

    version?: string;
    ownerToken?: string;
    facts?: string[];
    tags?: string[];
    voiceId?: string;
    language?: string;
    onlyContext?: boolean;
    startMessage?: string;
    chatColor: string;
    botType: string;

    organizeId?: string;
    groupId?: string;

    editable?: boolean;

    publishNote?: string;
    publishManual?: string;
    publishDescription?: string;

    prompt?: string;
    promptVariable?: string;
    qPrompt?: string;
    qPromptVariable?: string;
}

export interface BotSource {
    idSource: number;
    source: string;
    title: string;
    description: string;
    note: string;
}

export interface BotDocument {
    idDocument: string;
    raw: string;
    summary: string;
    sourceId: number;
    priority: number;

    local?: boolean;
    isDirty?: boolean;
    botToken?: string;
    state?: string;
    stateDesc?: string;
}

export interface MyCustomEventDetail {
    message: string;
    severity: ComponentProps<typeof Alert>["severity"];
}

export interface User {
    roles: string;
    userToken: string;
    orgRoles?: {
        organizationId: string;
        roles: string[];
        groupInfo?: {
            groupId: string;
            roles: string[];
            name: string;
        }[];
    }[];
}

export interface FilterBot {
    search: string;
    tags: string[];
    orgs: any[];
    groups: any[];
}

export interface FilterInOrg {
    search: string;
    groups: any[] | null;
}

export interface PreviewComment {
    id: string;
    comment: string;
    createTime: string;
    displayName: string;
    previewImg: string[];
}

export interface IncreaseType {
    type: "POINT" | "BOT" | "TOKEN";
    quantity: number;
    exchangeType: "NUMBER" | "PERCENT";
}

export interface VoucherType {
    giftCode: string;
    type: "VOUCHER" | "GIFTCODE";
    increaseType: IncreaseType[];
    state: "ACTIVE" | "INACTIVE";
    expireTime: string;
}

export interface GiftIncreaseTypeItem {
    type: "POINT" | "BOT" | "TOKEN";
    quantity: number;
    exchangeType: "NUMBER";
}

export interface Transaction {
    type: "GIFT_CODE" | "PACKAGE" | "VOUCHER";
    title: string;
    price: number | null;
    createTime: string;
    expireTime: string;
    state: "ACTIVE" | "INACTIVE";
    detail: {
        type: "BOT" | "TOKEN" | "POINT";
        amount: number;
    }[];
}

export interface PackageType {
    productId: string;
    price: number | string;
    productName: string;
    bought: boolean;
    amount: number | string;
    numBot: number | string;
    numLimitToken: number | string;
}

export interface GiftType {
    productId: string;
    price: number;
    productName: string;
    amount: number;
    numBot: number;
    numLimitToken: number;
    bought: boolean;
}

export interface Book {
    id: string;
    name: string;
    thumbnail: string;
    price: number;
}

export interface BookDataCustom {
    key: string;
    name: string;
    checkBoxState: "checked" | "unchecked";
}
