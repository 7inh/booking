import { Avatar, Box } from "@mui/material";
import { IconPublished } from "src/components/Icons/IconExternal";

export interface BotAvatarProps {
    src?: string;
    botName: string;
    chatColor?: string;
    size?: string;
    isPublic?: boolean;
}

const BotAvatar = (props: BotAvatarProps) => {
    const { src, botName, chatColor, size, isPublic } = props;
    const avatarSize = size || "48px";
    const iconSize = Math.max(parseInt(avatarSize) / 4, 15);

    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <Avatar
                src={src || chatColor || "/botot.jpg"}
                sx={{
                    width: avatarSize,
                    height: avatarSize,
                    bgcolor: src || chatColor,
                    fontSize: parseInt(avatarSize) / 2.5,
                }}
                imgProps={{ style: { objectFit: "contain" } }}
            >
                {botName
                    ?.trim()
                    ?.split(" ")
                    ?.slice(0, 2)
                    ?.map((item) => item[0])}
            </Avatar>
            {isPublic ? (
                <IconPublished
                    sx={{
                        color: "rgba(34, 197, 94, 1)",
                        position: "absolute",
                        bottom: -2,
                        right: 0,
                        borderRadius: "50%",
                        width: iconSize,
                        height: iconSize,
                    }}
                />
            ) : null}
        </Box>
    );
};

export default BotAvatar;
