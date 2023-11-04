import instance from "src/common/instances/instance";
import { AccountUploadAvatarParams } from "src/services/types";

const uploadAvatar = async (rootPath: string, params: AccountUploadAvatarParams) => {
    return await instance.post(`${rootPath}/upload_avatar`, params, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    });
};

export default uploadAvatar;
