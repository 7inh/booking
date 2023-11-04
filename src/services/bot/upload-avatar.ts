import instance from "src/common/instances/instance";
import { BotUploadAvatarParams } from "src/services/types";

const uploadAvatar = async (rootPath: string, { botToken, ...params }: BotUploadAvatarParams) => {
    return await instance.post(`${rootPath}/upload_avatar/${botToken}`, params, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    });
};

export default uploadAvatar;
