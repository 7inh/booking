import { Grid, Box, Typography, IconButton } from "@mui/material";
import { useMemo } from "react";
import { IconKCoin } from "src/components/Icons/IconExternal";
import useTranslation from "src/hooks/utils/useTranslation";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import AccountAvatar from "src/pages/Account/AccountAvatar";
import UpdateAccountForm from "src/pages/Account/UpdateAccountForm";

export interface AccountProfileProps {
    userToken: string;
    avatar: string;
    displayName: string;
    email: string;
    language: string;
    phoneNumber: string;
    roles: string;
    bio: string;
    country: string;
    address: {
        city: string;
        district: string;
        ward: string;
    };
    zipcode: string;
    availableMoney: number;
    maximumCreateBot: number;
    numCreatedBots: number;
    indexedToken: number;
    verified: boolean;
    limitToken: number;
    onUpdateSuccess?: () => void;
}

const AccountProfile = (props: AccountProfileProps) => {
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
        limitToken,
        verified,
        onUpdateSuccess,
    } = props;

    const t = useTranslation();

    const renderAccountAvatar = useMemo(() => {
        if (!userToken) return null;

        return (
            <AccountAvatar
                avatar={avatar}
                displayName={displayName}
                email={email}
                roles={roles}
                verified={verified}
                isAllowUpdateAvatar
            />
        );
    }, [avatar, displayName, email, roles, userToken, verified]);

    const renderUpdateAccountForm = useMemo(() => {
        if (!userToken) return null;

        return (
            <UpdateAccountForm
                displayName={displayName}
                language={language || ""}
                phoneNumber={phoneNumber}
                bio={bio || ""}
                country={country || ""}
                idCity={address.city || ""}
                idDistrict={address.district || ""}
                idWard={address.ward || ""}
                zipcode={zipcode || ""}
                onUpdateSuccess={onUpdateSuccess}
            />
        );
    }, [
        address.city,
        address.district,
        address.ward,
        bio,
        country,
        displayName,
        language,
        onUpdateSuccess,
        phoneNumber,
        userToken,
        zipcode,
    ]);

    return (
        <Grid container mt={4} gap={2}>
            <Grid
                item
                sx={{
                    width: {
                        xs: "100%",
                        md: "30%",
                    },
                    boxShadow:
                        "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
                    borderRadius: "16px",
                }}
            >
                {renderAccountAvatar}
            </Grid>
            <Grid
                item
                sx={{
                    width: {
                        xs: "100%",
                        md: "calc(70% - 16px)",
                        boxShadow:
                            "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
                        borderRadius: "16px",
                    },
                }}
            >
                <Box
                    sx={{
                        py: 4,
                        px: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <Box maxWidth="100%">
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#12121D",
                                }}
                            >
                                {t("common.userToken")}
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Typography
                                    sx={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        letterSpacing: "0.05px",
                                        color: "primary.main",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        maxWidth: "10ch",
                                    }}
                                >
                                    {userToken}
                                </Typography>
                                <IconButton
                                    onClick={() => {
                                        navigator.clipboard.writeText(userToken);
                                    }}
                                >
                                    <ContentCopyRoundedIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#12121D",
                                }}
                            >
                                {t("common.createdBot")}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={0.5}>
                                <Typography
                                    sx={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        letterSpacing: "0.05px",
                                        color: "primary.main",
                                    }}
                                >
                                    {numCreatedBots}/{maximumCreateBot}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#12121D",
                                }}
                            >
                                {t("common.kcoin")}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={0.5}>
                                <Typography
                                    sx={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        letterSpacing: "0.05px",
                                        color: "primary.main",
                                    }}
                                >
                                    {availableMoney}
                                </Typography>
                                <IconKCoin
                                    sx={{
                                        color: "primary.main",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#12121D",
                                }}
                            >
                                {t("common.indexedToken")}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={0.5}>
                                <Typography
                                    sx={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        letterSpacing: "0.05px",
                                        color: "primary.main",
                                    }}
                                >
                                    {indexedToken}/{limitToken}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <br />
                    {renderUpdateAccountForm}
                </Box>
            </Grid>
        </Grid>
    );
};

export default AccountProfile;
