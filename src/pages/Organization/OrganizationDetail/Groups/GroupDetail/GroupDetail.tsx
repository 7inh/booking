import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import { PRIVILEGE_LEVEL } from "src/components/SideBar/const";
import { useAccountContext } from "src/contexts/AccountContext";
import useGetOrganizeDetail from "src/hooks/useGetOrganizeDetail";
import useGetOrganizeGroupDetail from "src/hooks/useGetOrganizeGroupDetail";
import useTranslation from "src/hooks/utils/useTranslation";
import BotList from "src/pages/Organization/OrganizationDetail/Groups/GroupDetail/BotList";
import MemberList from "src/pages/Organization/OrganizationDetail/Groups/GroupDetail/MemberList";
import ProfileGroup from "src/pages/Organization/OrganizationDetail/Groups/GroupDetail/ProfileGroup";

const GroupDetail = () => {
    const { orgId: organizeId = "", groupId = "" } = useParams();
    const navigate = useNavigate();
    const t = useTranslation();

    const { user } = useAccountContext();

    const privilegeLevel: number = useMemo(() => {
        if (user.roles === "ADMIN") return PRIVILEGE_LEVEL.SYS.ADMIN;

        if (user.orgRoles) {
            const orgRole = user.orgRoles.find(
                ({ organizationId }) => organizationId === organizeId
            );
            if (orgRole) {
                if (orgRole.roles.some((role) => ["ADMIN"].includes(role))) {
                    return PRIVILEGE_LEVEL.ORG.ADMIN;
                }
            }
        }

        return 0;
    }, [organizeId, user.orgRoles, user.roles]);

    const listTab = useMemo(() => {
        const listTab: {
            label: string;
            key: string;
        }[] = [
            {
                label: t("common.profile"),
                key: "profile",
            },
        ];

        if (privilegeLevel >= 3) {
            listTab.push({
                label: t("common.members"),
                key: "member",
            });
        }

        listTab.push({
            label: t("common.bots"),
            key: "bot",
        });

        return listTab;
    }, [privilegeLevel, t]);

    const [value, setValue] = useState(0);

    const { data: organize, isFetched: isFetchedOrg } = useGetOrganizeDetail({
        organizeId,
    });
    const {
        data: groups,
        isFetched: isFetchedGroup,
        refetch,
    } = useGetOrganizeGroupDetail({
        organizeId,
        groupId,
    });

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const renderProfileGroup = useMemo(() => {
        if (!groups || listTab[value].key !== "profile") return null;

        return (
            <ProfileGroup
                organizeId={organizeId}
                groupId={groupId}
                groupName={groups.groupName}
                description={groups.description}
                avatar={groups.avatar}
                onSuccess={refetch}
                maxWidth="1116px"
                editable={privilegeLevel >= 3}
            />
        );
    }, [groupId, groups, listTab, organizeId, privilegeLevel, refetch, value]);

    const renderMemberGroup = useMemo(() => {
        if (!groups || listTab[value].key !== "member" || privilegeLevel < 3) return null;

        return <MemberList organizeId={organizeId} groupId={groupId} />;
    }, [groupId, groups, listTab, organizeId, privilegeLevel, value]);

    const renderBotGroup = useMemo(() => {
        if (!groups || listTab[value].key !== "bot") return null;

        return (
            <BotList
                organizeId={organizeId}
                groupId={groupId}
                showCreateBotButton={privilegeLevel >= 3}
            />
        );
    }, [groupId, groups, listTab, organizeId, privilegeLevel, value]);

    useEffect(() => {
        if ((isFetchedOrg && !organize) || (isFetchedGroup && !groups)) {
            navigate("/404");
        }
    }, [groups, isFetchedGroup, isFetchedOrg, navigate, organize]);

    return (
        <Box
            height="100%"
            display="flex"
            flexDirection="column"
            px={4}
            minWidth="900px"
            overflow="auto"
        >
            <CustomBreadcrumbs
                heading={
                    <Box display="inline-flex" gap={1}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: "#0288d1",
                            }}
                        >
                            {groups?.groupName}
                        </Typography>
                    </Box>
                }
                links={[
                    {
                        name: t("page.organization.title"),
                        href: `/private-space/${organizeId}?tab=group`,
                    },
                    { name: organize?.name, href: `/private-space/${organizeId}` },
                    { name: groups?.groupName, href: `/private-space/${organizeId}/${groupId}` },
                ]}
                sx={{
                    mb: { xs: 1, md: 2 },
                }}
            />

            <Box display="flex" flexDirection="column" sx={{ width: "100%", height: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {listTab.map((tab, index) => (
                            <Tab key={index} label={tab.label} />
                        ))}
                    </Tabs>
                </Box>
                <Box mt={3} height="100%" display="flex" justifyContent="center">
                    {renderProfileGroup}
                    {renderMemberGroup}
                    {renderBotGroup}
                </Box>
            </Box>
        </Box>
    );
};

export default GroupDetail;
