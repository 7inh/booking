import { Avatar } from "@mui/material";

export interface AvatarUserProps {
    avatar: string;
    displayName: string;
    size?: string;
}

const AvatarUser = ({ size, avatar, displayName }: AvatarUserProps) => {
    return (
        <Avatar
            src={avatar}
            sx={{ width: size || 32, height: size || 32, fontSize: parseInt(size || "32px") / 2.5 }}
            imgProps={{ style: { objectFit: "contain" } }}
        >
            {displayName
                ?.trim()
                ?.split(" ")
                .slice(0, 2)
                .map((item) => item[0])}
        </Avatar>
    );
};

export default AvatarUser;
