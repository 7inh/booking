import { Message } from "src/common/types";
import { BOT_SOURCE, BOT_SOURCE_TYPE } from "src/pages/Chat/types";

export const getChatStyle = (
    role: Message["role"]
): {
    place: "start" | "end";
    backgroundColor: string;
    color: string;
} => {
    const baseStyle = {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "22px",
    };

    if (role === "user") {
        return {
            ...baseStyle,
            place: "end",
            backgroundColor: "#4F5E7B",
            color: "#fff",
        };
    }

    return {
        ...baseStyle,
        place: "start",
        backgroundColor: "#f3f4f6",
        color: "#000",
    };
};

export const getUserBotOptionsByBotSource = (
    botSource: BOT_SOURCE_TYPE | undefined
): number | number[] | undefined => {
    switch (botSource) {
        case BOT_SOURCE.OWNER:
            return 0;
        case BOT_SOURCE.KAMI_STORE:
            return 1;
        case BOT_SOURCE.WORKSPACE:
            return [2, 3];
        default:
            return undefined;
    }
};
