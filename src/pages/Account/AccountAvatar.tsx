import { Box, Input, InputLabel, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { isRequestSuccessful } from "src/common/utils";
import AvatarUser from "src/components/Avatars/AvatarUser";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import useUploadAccountAvatar from "src/hooks/useUploadAccountAvatar";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import VerifyAlert from "src/pages/Account/VerifyAlert";

export interface AccountAvatarProps {
    avatar: string;
    displayName: string;
    email: string;
    roles: string;
    verified: boolean;
    isAllowUpdateAvatar?: boolean;
}

const AccountAvatar = ({
    avatar,
    displayName,
    email,
    roles,
    verified,
    isAllowUpdateAvatar,
}: AccountAvatarProps) => {
    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const [avatarBob, setAvatarBob] = useState<string>(avatar);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { mutateAsync: updateAvatar } = useUploadAccountAvatar({});

    const handleLoadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Url = reader.result;
            if (typeof base64Url === "string") {
                setAvatarBob(base64Url);
                setAvatarFile(file);
                window.dispatchEvent(new Event("selectAvatar"));
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateAvatar = useCallback(async () => {
        if (!avatarFile) return;

        setIsLoading(true);
        try {
            const response: any = await updateAvatar({
                avatar: avatarFile,
            });

            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.updateAvatar"),
                    severity: "success",
                });
                window.dispatchEvent(new Event("uploadAvatarSuccess"));
            } else {
                snackbar({
                    message: t("error.updateAvatar"),
                    severity: "error",
                });
            }
        } catch (error) {
            handleError(error);
        }
        setIsLoading(false);
    }, [avatarFile, handleError, snackbar, t, updateAvatar]);

    useEffect(() => {
        if (!avatarFile) return;

        window.addEventListener("uploadAvatar", handleUpdateAvatar);

        return () => {
            window.removeEventListener("uploadAvatar", handleUpdateAvatar);
        };
    }, [avatarFile, handleUpdateAvatar]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "70%",
                py: 4,
                px: 2,
            }}
        >
            <LoadingIcon open={isLoading} />
            <br />
            <Box
                sx={{
                    position: "relative",
                }}
            >
                <AvatarUser avatar={avatarBob} displayName={displayName} size="126px" />

                {isAllowUpdateAvatar ? (
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            opacity: 0,
                            bgcolor: "rgba(0, 0, 0, 0.48)",
                            borderRadius: "50%",
                            overflow: "hidden",
                            height: "100%",
                            width: "100%",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                opacity: 1,
                            },
                        }}
                    >
                        <InputLabel
                            htmlFor="update-avatar"
                            sx={{
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "34px",
                                    height: "50px",
                                    backgroundImage: "url(/camera.svg)",
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                }}
                            ></Box>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: "12px",
                                    lineHeight: "18px",
                                    color: "#FFFFFF",
                                }}
                            >
                                {t("common.updatePhoto")}
                            </Typography>
                        </InputLabel>
                    </Box>
                ) : null}
                <Input
                    type="file"
                    id="update-avatar"
                    sx={{ display: "none" }}
                    onChange={handleLoadAvatar}
                    inputProps={{ accept: "image/*" }}
                />
            </Box>
            <br />
            <Typography
                sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    textAlign: "center",
                    color: "#1B1A57",
                    wordBreak: "break-word",
                }}
            >
                {displayName}
            </Typography>
            <Typography
                sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#919EAB",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flexShrink: 0,
                    width: "100%",
                    textAlign: "center",
                }}
            >
                {email}
            </Typography>
            <br />
            <Typography
                sx={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "primary.main",
                }}
            >
                {roles}
            </Typography>

            {!verified ? (
                <>
                    <br />
                    <VerifyAlert />
                </>
            ) : null}
        </Box>
    );
};

export default AccountAvatar;
