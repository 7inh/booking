import { BOT_SOURCE, BOT_SOURCE_OPTION } from "src/pages/Chat/types";

export const BOT_SOURCE_OPTIONS: BOT_SOURCE_OPTION[] = [
    {
        id: "bot_source_owner",
        label: "Owner",
        value: BOT_SOURCE.OWNER,
    },
    {
        id: "bot_source_kami_store",
        label: "Kami Store",
        value: BOT_SOURCE.KAMI_STORE,
    },
    {
        id: "bot_source_workspace",
        label: "Workspace",
        value: BOT_SOURCE.WORKSPACE,
    },
];
