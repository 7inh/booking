import { Box, Link, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { SocialIcon } from "src/components/Icons/IconExternal";
import { useNavContext } from "src/contexts/NavContext";
import useTranslation from "src/hooks/utils/useTranslation";

const DOWNLOAD = [
    {
        name: "common.downloadIOS",
        href: "https://apps.apple.com/vn/app/kamimind/id6466782475",
    },
    {
        name: "common.downloadAndroid",
        href: "https://play.google.com/store/apps/details?id=com.kamimind",
    },
];

const SOCIAL_LIST = [
    {
        name: "facebook",
        href: "https://www.facebook.com/kamimind.official",
    },
    {
        name: "tiktok",
        href: "https://www.tiktok.com/@kamimind.ai",
    },
    {
        name: "youtube",
        href: "https://www.youtube.com/@kamimind-ai",
    },
    {
        name: "twitter",
        href: "https://twitter.com/kamimind_ai",
    },
];
const SocialAndDownloadLink = () => {
    const t = useTranslation();
    const { open } = useNavContext();

    const renderDownLoadLink = useMemo(() => {
        return (
            <Stack gap={1.5}>
                {DOWNLOAD.map(({ name, href }) => (
                    <Box
                        key={name}
                        sx={{
                            height: "44px",
                            bgcolor: "rgba(145, 158, 171, 0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px",
                        }}
                    >
                        <Link
                            sx={{
                                color: "#000 !important",
                                textDecoration: "none",
                            }}
                            href={href}
                            target="_blank"
                        >
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                }}
                            >
                                {t(name)}
                            </Typography>
                        </Link>
                    </Box>
                ))}
            </Stack>
        );
    }, [t]);

    const renderSocialIcon = useMemo(() => {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    width: "fit-content",
                }}
            >
                {SOCIAL_LIST.map(({ name, href }) => (
                    <SocialIcon key={name} name={name} href={href} />
                ))}
            </Box>
        );
    }, []);

    return (
        <Box mx={2} my={4.5} display={open ? "" : "none"}>
            <Box>{renderDownLoadLink}</Box>
            <br />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        width: "fit-content",
                    }}
                >
                    {t("common.followUsOn")}
                </Typography>
                {renderSocialIcon}
            </Box>
        </Box>
    );
};

export default SocialAndDownloadLink;
