import { Avatar, AvatarGroup } from "@mui/material";

export interface GroupAvatarListProps {
    groups: any[];
}

const GroupAvatarList = ({ groups }: GroupAvatarListProps) => {
    return (
        <AvatarGroup
            max={4}
            sx={{
                "& .MuiAvatar-root": {
                    width: 24,
                    height: 24,
                    fontSize: "12px",
                },
            }}
        >
            {groups.map((group) => (
                <Avatar key={group.groupId} src={group.groupAvatar}>
                    {group.groupName?.[0]}
                </Avatar>
            ))}
        </AvatarGroup>
    );
};

export default GroupAvatarList;
