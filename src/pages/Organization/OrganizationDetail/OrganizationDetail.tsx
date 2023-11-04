import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import { PRIVILEGE_LEVEL } from "src/components/SideBar/const";
import { useAccountContext } from "src/contexts/AccountContext";
import useGetOrganizeDetail from "src/hooks/useGetOrganizeDetail";
import useGetOrganizeGroup from "src/hooks/useGetOrganizeGroup";
import useTranslation from "src/hooks/utils/useTranslation";
import BotList from "src/pages/Organization/OrganizationDetail/BotList";
import GroupList from "src/pages/Organization/OrganizationDetail/GroupList";
import MemberList from "src/pages/Organization/OrganizationDetail/MemberList";

const OrganizationDetail = () => {
    const { id: organizeId = "" } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useAccountContext();

    const t = useTranslation();

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
                if (orgRole.roles.some((role) => ["CREATOR"].includes(role))) {
                    return PRIVILEGE_LEVEL.ORG.CREATOR;
                }
            }
        }

        return 0;
    }, [organizeId, user.orgRoles, user.roles]);

    const listTab = useMemo(() => {
        const listTab: {
            label: string;
            key: string;
        }[] = [];

        if (privilegeLevel >= 3) {
            listTab.push({
                label: t("common.members"),
                key: "member",
            });
        }
        listTab.push(
            ...[
                {
                    label: t("common.groups"),
                    key: "group",
                },
                {
                    label: t("common.bots"),
                    key: "bot",
                },
            ]
        );

        return listTab;
    }, [privilegeLevel, t]);

    const [value, setValue] = useState(
        Math.max(
            listTab.findIndex((tab) => tab.key === searchParams.get("tab")),
            0
        )
    );

    const { data: organize } = useGetOrganizeDetail({
        organizeId,
    });
    const { data: groups = [], refetch } = useGetOrganizeGroup({
        organizeId,
    });

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setSearchParams({
            tab: listTab[newValue].key,
        });
        setValue(newValue);
    };

    const handleRefetchValue = useCallback(() => {
        refetch();
    }, [refetch]);

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
                    <>
                        <Box display="inline-flex" gap={1}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "#0288d1",
                                }}
                            >
                                {organize?.name}
                            </Typography>
                        </Box>
                    </>
                }
                links={[
                    { name: t("page.organization.title"), href: "/private-space" },
                    { name: organize?.name, href: `/private-space/${organizeId}` },
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
                <Box mt={2} height="100%">
                    {listTab[value].key === "member" ? (
                        <MemberList
                            organizeId={organizeId}
                            groups={groups}
                            ownerToken={organize?.ownerToken}
                        />
                    ) : null}
                    {listTab[value].key === "group" ? (
                        <GroupList
                            organizeId={organizeId}
                            groups={groups}
                            refetch={handleRefetchValue}
                            isAllowControlGroup={privilegeLevel >= 3}
                        />
                    ) : null}
                    {listTab[value].key === "bot" ? (
                        <BotList
                            ownerId={organize?.ownerToken}
                            organizeId={organizeId}
                            groups={groups}
                            isAllowCreateBot={privilegeLevel >= 2}
                        />
                    ) : null}
                </Box>
            </Box>
        </Box>
    );
};

export default OrganizationDetail;
