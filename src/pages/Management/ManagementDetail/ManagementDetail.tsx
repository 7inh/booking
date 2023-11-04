import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ButtonNewIndex from "src/components/Buttons/ButtonNewIndex";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import { useAccountContext } from "src/contexts/AccountContext";
import useGetBotProfileDetail from "src/hooks/useGetBotProfileDetail";
import useTranslation from "src/hooks/utils/useTranslation";
import ChatBoxV2 from "src/pages/Chat/ChatBoxV2";
import KnowledgeBase from "src/pages/Management/ManagementDetail/KnowledgeBase/KnowledgeBase";
import ManagementDetailTab from "src/pages/Management/ManagementDetail/ManagementDetailTab";
import Profile from "src/pages/Management/ManagementDetail/Profile";
import PublishBot from "src/pages/Management/ManagementDetail/PublishBot/PublishBot";
import BotManagementProvider from "src/providers/BoxManagementProvider";

const ManagementDetail = () => {
    const { id: botId } = useParams();

    const { user } = useAccountContext();

    const t = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const selectedTab = searchParams.get("tab") || "profile";

    const [shouldRedirectToManagement, setShouldRedirectToManagement] = useState(false);

    const { bot: botProfile, refetch } = useGetBotProfileDetail({ botToken: botId || "" });

    const renderTabs = useMemo(() => {
        if (!botProfile?.id || !user.roles) return null;

        return (
            <ManagementDetailTab
                user={user}
                level={botProfile?.level || 0}
                organizeId={botProfile?.organizeId}
                groupId={botProfile?.groupId}
                onTabChange={() => {
                    setShouldRedirectToManagement(false);
                }}
            />
        );
    }, [botProfile?.groupId, botProfile?.id, botProfile?.level, botProfile?.organizeId, user]);

    const renderProfile = useMemo(() => {
        const shouldDisplayProfile = selectedTab === "profile";

        if (!shouldDisplayProfile) return null;

        return (
            <Box
                key={JSON.stringify(botProfile)}
                visibility={shouldDisplayProfile ? "visible" : "hidden"}
                height={shouldDisplayProfile ? "auto" : 0}
                overflow={shouldDisplayProfile ? "visible" : "hidden"}
                display="flex"
                justifyContent="center"
            >
                <Box maxWidth="1116px" width="100%">
                    <Profile botProfile={botProfile} refetch={refetch} />
                </Box>
            </Box>
        );
    }, [botProfile, refetch, selectedTab]);

    const renderManagement = useMemo(() => {
        const shouldDisplayManagement = selectedTab === "management";

        if (!shouldDisplayManagement || botProfile.level !== 1) return null;

        return (
            <BotManagementProvider>
                <KnowledgeBase refetchProfile={refetch} />
            </BotManagementProvider>
        );
    }, [botProfile.level, refetch, selectedTab]);

    const renderIndexer = useMemo(() => {
        const shouldDisplayIndexer = selectedTab === "indexer";

        if (botProfile.level !== 1) return null;

        return (
            <Box
                visibility={shouldDisplayIndexer ? "visible" : "hidden"}
                height={shouldDisplayIndexer ? "auto" : 0}
                overflow="hidden"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Box maxWidth="1116px" width="100%">
                    <ButtonNewIndex
                        botToken={botProfile?.id}
                        botType={botProfile?.botType}
                        showSubmitButton
                        onChangeSourceLength={() => {
                            setShouldRedirectToManagement(true);
                        }}
                        onIndexerSuccess={() => {
                            setShouldRedirectToManagement(false);
                            if (!shouldRedirectToManagement) return;
                            navigate(`/management/${botId}?tab=management`);
                        }}
                    />
                </Box>
            </Box>
        );
    }, [
        botId,
        botProfile?.botType,
        botProfile?.id,
        botProfile.level,
        navigate,
        selectedTab,
        shouldRedirectToManagement,
    ]);

    const renderPublishBot = useMemo(() => {
        const shouldDisplayPublishBot = selectedTab === "publish-bot";

        if (!shouldDisplayPublishBot || botProfile.level !== 1 || !botProfile.id || !user.roles)
            return null;

        return (
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Box maxWidth="1200px" mx="auto" width="100%">
                    <PublishBot user={user} botProfile={botProfile} />
                </Box>
            </Box>
        );
    }, [botProfile, selectedTab, user]);

    const renderTestBot = useMemo(() => {
        const shouldDisplayTestBot = selectedTab === "test-bot";

        if (!shouldDisplayTestBot || !botId || !botProfile?.botName || botProfile.level !== 1)
            return null;

        return (
            <Box
                height="calc(100vh - 217px)"
                display="flex"
                flexDirection="column"
                sx={{
                    border: "1px solid #E5E5E5",
                    borderRadius: "8px",
                }}
            >
                <ChatBoxV2
                    botToken={botId}
                    botName={botProfile.botName}
                    avatar={botProfile?.avatar || ""}
                    chatColor={botProfile?.chatColor}
                    isPublic={Boolean(botProfile.isPublic)}
                    level={botProfile.level}
                    isStoryIdRequired={false}
                />
            </Box>
        );
    }, [
        botId,
        botProfile?.avatar,
        botProfile.botName,
        botProfile?.chatColor,
        botProfile.isPublic,
        botProfile.level,
        selectedTab,
    ]);

    if (!botProfile.id) return null;

    return (
        <Box display="flex" height="100%">
            <Box px={4} width="100%" boxSizing="border-box" minWidth="900px" height="100%">
                <CustomBreadcrumbs
                    heading={t("page.management.title")}
                    links={[
                        {
                            href: "/management",
                            name: t("page.management.title"),
                        },
                        {
                            href: `/management/${botId}`,
                            name: botProfile?.botName || "",
                        },
                    ]}
                />

                <Box mt={3}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        {renderTabs}
                    </Box>
                    <Box mt={3}>
                        {renderProfile}
                        {renderManagement}
                        {renderIndexer}
                        {renderPublishBot}
                        {renderTestBot}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ManagementDetail;
