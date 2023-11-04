import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterInOrg } from "src/common/types";
import BotItem from "src/components/Bot/BotItem";
import CreateButton from "src/components/Buttons/CreateButton";
import CreateBotDialog from "src/components/Dialogs/CreateBotDialog";
import SearchAndFilterInOrg from "src/components/Filters/SearchAndFilterInOrg";
import { useAccountContext } from "src/contexts/AccountContext";
import useGetUserBots from "src/hooks/useGetUserBots";
import useTranslation from "src/hooks/utils/useTranslation";

const BotList = ({
    organizeId,
    groups,
    ownerId,
    isAllowCreateBot = false,
}: {
    organizeId: string;
    groups: any[];
    ownerId?: string;
    isAllowCreateBot?: boolean;
}) => {
    const {
        user: { userToken, orgRoles },
    } = useAccountContext();
    const isAdminOrg = ownerId === userToken;

    const t = useTranslation();
    const navigate = useNavigate();

    const [openCreateBotDialog, setOpenCreateBotDialog] = useState(false);
    const [filter, setFilter] = useState<FilterInOrg>({
        search: "",
        groups: [],
    });

    const { data: bots = [], refetch } = useGetUserBots({
        organizeId: [organizeId],
    });

    const userRoles = useMemo(() => {
        return orgRoles?.find((item: any) => item.organizeId === organizeId)?.groupInfo;
    }, [orgRoles, organizeId]);
    const groupsHavePermission = useMemo(
        () =>
            userRoles?.filter((item) => item.roles.includes("CREATOR")).map((item) => item.groupId),
        [userRoles]
    );
    const groupsAllowCreateBot = useMemo(
        () =>
            groups.filter((item) =>
                groupsHavePermission?.some((id: string) => id === item.groupId)
            ),
        [groups, groupsHavePermission]
    );
    const filteredBots = useMemo(
        () =>
            bots.filter((bot: any) =>
                bot.botName.toLowerCase().includes(filter.search.toLowerCase())
            ),
        [bots, filter.search]
    );

    const renderCreateBotDialog = useMemo(() => {
        if (!openCreateBotDialog) return null;

        return (
            <CreateBotDialog
                organizeId={organizeId}
                groups={[
                    { groupId: organizeId, groupName: t("common.general") },
                    ...(isAdminOrg ? groups : groupsAllowCreateBot),
                ]}
                open={openCreateBotDialog}
                onClose={() => setOpenCreateBotDialog(false)}
                onCreateSuccess={refetch}
                showGroupField
            />
        );
    }, [openCreateBotDialog, organizeId, t, isAdminOrg, groups, groupsAllowCreateBot, refetch]);

    const renderSearchAndFilter = useMemo(
        () => (
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "500px",
                }}
            >
                <SearchAndFilterInOrg onApply={(data) => setFilter(data)} />
            </Box>
        ),
        []
    );

    return (
        <>
            {renderCreateBotDialog}
            <Box display="flex" mb={2} justifyContent="space-between" alignItems="center">
                {renderSearchAndFilter}
                {isAllowCreateBot ? (
                    <CreateButton
                        sx={{
                            flexShrink: 0,
                        }}
                        onClick={() => setOpenCreateBotDialog(true)}
                        label={t("common.createBot")}
                    />
                ) : null}
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 344px);"
                sx={{ gridGap: 20 }}
            >
                {filteredBots.map((bot: any) => (
                    <BotItem
                        key={bot.botToken || bot.id}
                        botId={bot.botToken || bot.id}
                        botName={bot.botName}
                        version={bot.version || ""}
                        avatar={bot.avatar || ""}
                        isPublished={bot.isPublic || false}
                        onClick={() => navigate(`/chat?botToken=${bot.id}`)}
                        isAllowViewProfile
                        isCheckLevel
                        level={bot.level}
                        chatColor={bot.chatColor}
                    />
                ))}
            </Box>
        </>
    );
};

export default BotList;
