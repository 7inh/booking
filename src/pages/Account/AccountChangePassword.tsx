import { Box, Grid } from "@mui/material";
import { useMemo } from "react";
import AccountAvatar from "src/pages/Account/AccountAvatar";
import ChangePasswordForm from "src/pages/Account/ChangePasswordForm";

export interface AccountChangePasswordProps {
    userToken: string;
    avatar: string;
    displayName: string;
    email: string;
    roles: string;
    verified: boolean;
}

const AccountChangePassword = (props: AccountChangePasswordProps) => {
    const { userToken, avatar, displayName, email, roles, verified } = props;

    const renderAccountAvatar = useMemo(() => {
        if (!userToken) return null;

        return (
            <AccountAvatar
                avatar={avatar}
                displayName={displayName}
                email={email}
                roles={roles}
                verified={verified}
            />
        );
    }, [avatar, displayName, email, roles, userToken, verified]);

    const renderUpdateAccountForm = useMemo(() => {
        if (!userToken) return null;

        return <ChangePasswordForm />;
    }, [userToken]);

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
                    {renderUpdateAccountForm}
                </Box>
            </Grid>
        </Grid>
    );
};

export default AccountChangePassword;
