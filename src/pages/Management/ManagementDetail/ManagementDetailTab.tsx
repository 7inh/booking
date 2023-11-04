import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { memo, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { User } from "src/common/types";
import { isAllowPublish } from "src/common/utils";
import { IconKnowledgeBase, IconProfile, IconTestBot } from "src/components/Icons/IconExternal";
import useTranslation from "src/hooks/utils/useTranslation";

export interface ManagementDetailTabProps {
    user: User;
    level: number;
    organizeId?: string;
    groupId?: string;
    onTabChange?: (tab: string) => void;
}

const ManagementDetailTab = (props: ManagementDetailTabProps) => {
    const { user, level, organizeId, groupId, onTabChange } = props;

    const t = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();
    const selectedTab = searchParams.get("tab") || "profile";

    const listTab = useMemo(() => {
        const listTab: {
            label: React.ReactNode;
            key: string;
        }[] = [
            {
                key: "profile",
                label: (
                    <Box display="flex" alignItems="center" gap={1}>
                        <IconProfile />
                        <Typography
                            sx={{
                                fontSize: "14px",
                                textTransform: "none",
                                fontWeight: 600,
                                lineHeight: "22px",
                            }}
                        >
                            {t("common.profile")}
                        </Typography>
                    </Box>
                ),
            },
        ];

        if (level === 1) {
            const isAllowPublishBot = isAllowPublish(user, organizeId, groupId);

            listTab.push(
                ...[
                    {
                        key: "management",
                        label: (
                            <Box display="flex" alignItems="center" gap={1}>
                                <IconKnowledgeBase />
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        lineHeight: "22px",
                                    }}
                                >
                                    {t("page.management.managementKnowledgeBase")}
                                </Typography>
                            </Box>
                        ),
                    },
                    {
                        key: "indexer",
                        label: (
                            <Box display="flex" alignItems="center" gap={1}>
                                <AddCircleRoundedIcon />
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        lineHeight: "22px",
                                    }}
                                >
                                    {t("common.indexer")}
                                </Typography>
                            </Box>
                        ),
                    },
                    ...(isAllowPublishBot
                        ? [
                              {
                                  key: "publish-bot",
                                  label: (
                                      <Box display="flex" alignItems="center" gap={1}>
                                          <CheckRoundedIcon />
                                          <Typography
                                              sx={{
                                                  fontSize: "14px",
                                                  textTransform: "none",
                                                  fontWeight: 600,
                                                  lineHeight: "22px",
                                              }}
                                          >
                                              {t("common.publishBot")}
                                          </Typography>
                                      </Box>
                                  ),
                              },
                          ]
                        : []),
                    {
                        key: "test-bot",
                        label: (
                            <Box display="flex" alignItems="center" gap={1}>
                                <IconTestBot />
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        lineHeight: "22px",
                                    }}
                                >
                                    {t("common.testBot")}
                                </Typography>
                            </Box>
                        ),
                    },
                ]
            );
        }

        return listTab;
    }, [groupId, level, organizeId, t, user]);

    const [tab, setTab] = useState<number>(
        Math.max(
            listTab.findIndex((tab) => tab.key === selectedTab),
            0
        )
    );

    const handleChangeChatTab = (_: React.SyntheticEvent, newValue: number) => {
        setSearchParams({
            tab: listTab[newValue]?.key,
        });
        setTab(newValue);
    };

    useEffect(() => {
        onTabChange?.(listTab[tab]?.key);
    }, [listTab, onTabChange, tab]);

    useEffect(() => {
        if (selectedTab !== listTab[tab]?.key) {
            setTab(
                Math.max(
                    listTab.findIndex((tab) => tab.key === selectedTab),
                    0
                )
            );
        }
    }, [listTab, selectedTab, tab]);

    return (
        <Tabs value={tab} onChange={handleChangeChatTab}>
            {listTab.map(({ key, label }) => (
                <Tab key={key} label={label} />
            ))}
        </Tabs>
    );
};

export default memo(ManagementDetailTab);
