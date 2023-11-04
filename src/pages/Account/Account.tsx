import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import { IconHistory, IconProfile } from "src/components/Icons/IconExternal";
import useGetAccountInfoV2 from "src/hooks/useGetAccountInfoV2";
import useTranslation from "src/hooks/utils/useTranslation";
import AccountChangePassword from "src/pages/Account/AccountChangePassword";
import AccountProfile from "src/pages/Account/AccountProfile";
import HistoryTransaction from "src/pages/Account/HistoryTransaction/HistoryTransaction";
import MySubscription from "src/pages/Account/MySubscription";

const Account = () => {
    const { account, refetch } = useGetAccountInfoV2({});
    const {
        userToken,
        avatar,
        displayName,
        email,
        language,
        phoneNumber,
        roles,
        bio,
        country,
        address,
        zipcode,
        availableMoney,
        maximumCreateBot,
        numCreatedBots,
        indexedToken,
        verified,
        limitToken,
        walletId,
    } = account;

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
            {
                key: "change-password",
                label: (
                    <Box display="flex" alignItems="center" gap={1}>
                        <KeyRoundedIcon />
                        <Typography
                            sx={{
                                fontSize: "14px",
                                textTransform: "none",
                                fontWeight: 600,
                                lineHeight: "22px",
                            }}
                        >
                            {t("common.changePassword")}
                        </Typography>
                    </Box>
                ),
            },
            {
                key: "history-transaction",
                label: (
                    <Box display="flex" alignItems="center" gap={1}>
                        <IconHistory />
                        <Typography
                            sx={{
                                fontSize: "14px",
                                textTransform: "none",
                                fontWeight: 600,
                                lineHeight: "22px",
                            }}
                        >
                            {t("common.historyTransaction")}
                        </Typography>
                    </Box>
                ),
            },
        ];

        return listTab;
    }, [t]);

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
        if (selectedTab !== listTab[tab]?.key) {
            setTab(
                Math.max(
                    listTab.findIndex((tab) => tab.key === selectedTab),
                    0
                )
            );
        }
    }, [listTab, selectedTab, tab]);

    const renderAccountProfile = useMemo(() => {
        const shouldDisplayProfile = selectedTab === "profile";

        if (!shouldDisplayProfile) return null;

        return (
            <AccountProfile
                userToken={userToken}
                avatar={avatar}
                displayName={displayName}
                email={email}
                language={language}
                phoneNumber={phoneNumber}
                roles={roles}
                bio={bio}
                country={country}
                address={address}
                zipcode={zipcode}
                availableMoney={availableMoney}
                maximumCreateBot={maximumCreateBot}
                numCreatedBots={numCreatedBots}
                indexedToken={indexedToken}
                limitToken={limitToken}
                verified={verified}
                onUpdateSuccess={refetch}
            />
        );
    }, [
        address,
        availableMoney,
        avatar,
        bio,
        country,
        displayName,
        email,
        indexedToken,
        language,
        limitToken,
        maximumCreateBot,
        numCreatedBots,
        phoneNumber,
        refetch,
        roles,
        selectedTab,
        userToken,
        verified,
        zipcode,
    ]);

    const renderChangePassword = useMemo(() => {
        const shouldDisplayChangePassword = selectedTab === "change-password";

        if (!shouldDisplayChangePassword) return null;

        return (
            <AccountChangePassword
                userToken={userToken}
                avatar={avatar}
                displayName={displayName}
                email={email}
                roles={roles}
                verified={verified}
            />
        );
    }, [avatar, displayName, email, roles, selectedTab, userToken, verified]);

    const renderMySubscription = useMemo(() => {
        const shouldDisplayMySubscription = selectedTab === "my-subscription";

        if (!shouldDisplayMySubscription) return null;

        return <MySubscription />;
    }, [selectedTab]);

    const renderHistoryTransaction = useMemo(() => {
        const shouldDisplayHistoryTransaction = selectedTab === "history-transaction";

        if (!shouldDisplayHistoryTransaction) return null;

        return <HistoryTransaction walletId={walletId} />;
    }, [selectedTab, walletId]);

    return (
        <Box display="flex" height="100%" width="100%" boxSizing="border-box">
            <Box px={4} width="100%" maxWidth="1070px" minWidth="450px" mx="auto">
                {/* <LoadingIcon open={isFetching} /> */}
                <CustomBreadcrumbs
                    heading={t("page.accountManagement.title")}
                    links={[
                        {
                            href: "/account",
                            name: t("page.accountManagement.title"),
                        },
                    ]}
                />

                <Tabs value={tab} onChange={handleChangeChatTab}>
                    {listTab.map(({ key, label }) => (
                        <Tab key={key} label={label} />
                    ))}
                </Tabs>

                {renderAccountProfile}
                {renderChangePassword}
                {renderMySubscription}
                {renderHistoryTransaction}
            </Box>
        </Box>
    );
};

export default Account;
