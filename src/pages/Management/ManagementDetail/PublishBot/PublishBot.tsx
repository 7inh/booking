import { Box, Tab, Tabs } from "@mui/material";
import { useMemo, useState } from "react";
import { Bot, User } from "src/common/types";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import useGetOrgPublishInfo from "src/hooks/useGetOrgPublishInfo";
import useGetPublishInfo from "src/hooks/useGetPublishInfo";
import useTranslation from "src/hooks/utils/useTranslation";
import PublishForm from "src/pages/Management/ManagementDetail/PublishBot/PublishForm";
import PublishStatus from "src/pages/Management/ManagementDetail/PublishBot/PublishStatus";

export interface PublishBotProps {
    user: User;
    botProfile: Bot;
}

const PublishBot = (props: PublishBotProps) => {
    const { user, botProfile } = props;

    const t = useTranslation();

    const [tab, setTab] = useState(0);
    const [isPublishAgainStore, setIsPublishAgainStore] = useState(false);
    const [isPublishAgainOrg, setIsPublishAgainOrg] = useState(false);

    const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const {
        data: [publishStoreInfo],
        isFetched: isFetchedPublishStoreInfo,
        isLoading: isLoadingPublishStoreInfo,
        refetch: refetchPublishStoreInfo,
    } = useGetPublishInfo({ botToken: botProfile.id });

    const {
        data: [publishOrgInfo],
        isFetched: isFetchedPublishOrgInfo,
        isLoading: isLoadingPublishOrgInfo,
        refetch: refetchPublishOrgInfo,
    } = useGetOrgPublishInfo({ botToken: botProfile.id });

    const isAdminOrg = useMemo(() => {
        const orgRole = user.orgRoles?.find(
            (role) => role.organizationId === botProfile.organizeId
        );
        return orgRole?.roles.includes("ADMIN");
    }, [botProfile.organizeId, user.orgRoles]);

    const listTab = useMemo(() => {
        return [
            ...(isAdminOrg || !botProfile.organizeId
                ? [
                      {
                          key: "kami-store",
                          label: t("common.botSourceOptions.KAMI_STORE"),
                      },
                  ]
                : []),
            ...(botProfile.organizeId
                ? [
                      {
                          key: "workspace",
                          label: t("common.botSourceOptions.WORKSPACE"),
                      },
                  ]
                : []),
        ];
    }, [botProfile.organizeId, isAdminOrg, t]);

    const renderPublishBotContent = useMemo(() => {
        if (
            !isFetchedPublishStoreInfo ||
            !isFetchedPublishOrgInfo ||
            isLoadingPublishStoreInfo ||
            isLoadingPublishOrgInfo ||
            listTab.length === 0
        )
            return <LoadingIcon />;
        const currentTabKey = listTab[tab].key;

        if (currentTabKey === "kami-store") {
            if (!publishStoreInfo || isPublishAgainStore)
                return (
                    <PublishForm
                        onPublishSuccess={() => {
                            refetchPublishStoreInfo();
                            setIsPublishAgainStore(false);
                        }}
                        botProfile={botProfile}
                    />
                );
            return (
                <PublishStatus
                    {...publishStoreInfo}
                    botProfile={botProfile}
                    onPublishAgain={() => setIsPublishAgainStore(true)}
                    onAddCommentSuccess={() => refetchPublishStoreInfo()}
                />
            );
        }
        if (!publishOrgInfo || isPublishAgainOrg)
            return (
                <PublishForm
                    publishTo="workspace"
                    onPublishSuccess={() => {
                        refetchPublishOrgInfo();
                        setIsPublishAgainOrg(false);
                    }}
                    botProfile={botProfile}
                />
            );

        return (
            <PublishStatus
                {...publishOrgInfo}
                botProfile={botProfile}
                onPublishAgain={() => setIsPublishAgainOrg(true)}
                onAddCommentSuccess={() => refetchPublishOrgInfo()}
            />
        );
    }, [
        botProfile,
        isFetchedPublishOrgInfo,
        isFetchedPublishStoreInfo,
        isLoadingPublishOrgInfo,
        isLoadingPublishStoreInfo,
        isPublishAgainOrg,
        isPublishAgainStore,
        listTab,
        publishOrgInfo,
        publishStoreInfo,
        refetchPublishOrgInfo,
        refetchPublishStoreInfo,
        tab,
    ]);

    return (
        <Box>
            {listTab.length > 1 ? (
                <>
                    <Tabs
                        value={tab}
                        onChange={handleChangeTab}
                        centered
                        sx={{
                            marginTop: "-25px",
                        }}
                    >
                        {listTab.map(({ key, label }) => (
                            <Tab key={key} label={label} />
                        ))}
                    </Tabs>
                    <br />
                </>
            ) : null}
            {renderPublishBotContent}
        </Box>
    );
};

export default PublishBot;
