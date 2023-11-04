import coreInstance from "src/common/instances/core-instance";
import indexInstance from "src/common/instances/index-instance";
import instance from "src/common/instances/instance";
import voiceInstance from "src/common/instances/voice-instance";
import { User } from "src/common/types";

export const extractResponseToLoginData = (
    response: any
): {
    user: User;
    token: string;
} => {
    const data = response.data.data;
    const { organizationRoles, userRoles, userToken, accessToken } = data;
    const user: User = {
        orgRoles: organizationRoles.map((orgRole: any) => ({
            organizationId: orgRole.organizeId,
            roles: orgRole.roles,
            groupInfo: orgRole.groupInfo,
        })),
        roles: userRoles,
        userToken,
    };

    return { user, token: accessToken };
};

export const updateInstanceToken = async (accessToken: string) => {
    const AUTH_TOKEN = `Bearer ${accessToken}`;

    localStorage.setItem("token", accessToken);
    sessionStorage.setItem("refreshTime", new Date().getTime().toString());

    instance.defaults.headers["Authorization"] = AUTH_TOKEN;
    coreInstance.defaults.headers["Authorization"] = AUTH_TOKEN;
    indexInstance.defaults.headers["Authorization"] = AUTH_TOKEN;
    voiceInstance.defaults.headers["Authorization"] = AUTH_TOKEN;
};

export const clearAuthData = () => {
    instance.defaults.headers["Authorization"] = "";
    coreInstance.defaults.headers["Authorization"] = "";
    indexInstance.defaults.headers["Authorization"] = "";
    voiceInstance.defaults.headers["Authorization"] = "";
};

export const setExpireTime = (isRemember: boolean) => {
    if (isRemember) {
        localStorage.setItem(
            "expireTime",
            JSON.stringify(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
        );
    } else {
        localStorage.setItem(
            "expireTime",
            JSON.stringify(new Date().getTime() + 24 * 60 * 60 * 1000)
        );
    }
};

export const clearAllStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
};
