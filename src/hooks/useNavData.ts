import { useMemo } from "react";
import ICONS from "src/components/Icons/IconNav";
import { useAccountContext } from "src/contexts/AccountContext";
import useTranslation from "src/hooks/utils/useTranslation";

export function useNavData() {
    const t = useTranslation();

    const {
        user: { roles: sysRole, orgRoles = [] },
    } = useAccountContext();

    const data = useMemo(
        () => [
            {
                subheader: "",
                items: [
                    { title: t("page.home.title"), path: "/", icon: ICONS.dashboard },
                    {
                        title: t("page.createBot.title"),
                        path: "/create-bot",
                        icon: ICONS.bot,
                        permissions: {
                            sys: ["ADMIN", "USER", "CREATOR"],
                            org: [],
                        },
                    },
                    {
                        title: t("page.chat.title"),
                        path: "/chat",
                        icon: ICONS.chat,
                        permissions: {
                            sys: ["ADMIN", "USER", "CREATOR"],
                            org: [],
                        },
                    },
                    {
                        title: t("page.management.title"),
                        path: "/management",
                        icon: ICONS.management,
                        permissions: {
                            sys: ["ADMIN", "USER", "CREATOR"],
                            org: [],
                        },
                    },
                    {
                        title: t("page.organization.title"),
                        path: "/private-space",
                        icon: ICONS.organization,
                        permissions: {
                            sys: ["ADMIN"],
                            org: ["ADMIN", "CREATOR", "USER"],
                        },
                    },
                    {
                        title: t("page.kamiStore.title"),
                        path: "/kami-store",
                        icon: ICONS.kamiStore,
                        permissions: {
                            sys: ["ADMIN", "USER", "CREATOR"],
                            org: [],
                        },
                    },
                    {
                        title: t("page.giftCode.title"),
                        path: "/gift-code",
                        icon: ICONS.giftCode,
                        permissions: {
                            sys: ["ADMIN", "USER", "CREATOR"],
                            org: [],
                        },
                    },
                    {
                        title: t("page.buyKpoint.title"),
                        path: "/buy-point",
                        icon: ICONS.buyKpoint,
                        permissions: {
                            sys: ["ADMIN", "USER", "CREATOR"],
                            org: [],
                        },
                    },
                    {
                        title: t("common.feedback"),
                        path: "https://forms.gle/uogmaGTDc6imALHR7",
                        icon: ICONS.sendFeedback,
                        permissions: {
                            sys: ["ADMIN", "USER", "CREATOR"],
                            org: [],
                        },
                    },
                    {
                        title: t("common.manualDocument"),
                        path: "https://book.kamimind.ai/",
                        icon: ICONS.manualDocument,
                        permissions: {
                            sys: ["ADMIN", "USER", "CREATOR"],
                            org: [],
                        },
                    },
                ],
            },
        ],
        [t]
    );

    const allowedRoutes = useMemo(
        () =>
            data.map((group) => ({
                ...group,
                items: group.items.filter((item) => {
                    if (!item.permissions) return true;
                    return (
                        item.permissions.sys.includes(sysRole) ||
                        orgRoles.some((orgRole) =>
                            orgRole.roles.some((role) => item.permissions.org.includes(role))
                        )
                    );
                }),
            })),
        [data, orgRoles, sysRole]
    );

    return allowedRoutes;
}
