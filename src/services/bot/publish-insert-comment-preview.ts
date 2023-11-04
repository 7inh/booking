import instance from "src/common/instances/instance";
import { BotPublishInsertCommentPreviewParams } from "src/services/types";

const publishInsertCommentPreview = async (
    rootPath: string,
    params: BotPublishInsertCommentPreviewParams
) => {
    const formData = new FormData();
    formData.append("botToken", params.botToken);
    formData.append("publishVersion", params.publishVersion);
    if (params.comment) {
        formData.append("comment", params.comment);
    }
    if (params.images?.length) {
        params.images.forEach((image) => {
            formData.append("images", image);
        });
    }

    return await instance.post(`${rootPath}/publish/insert_comment_preview_v2`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    });
};

export default publishInsertCommentPreview;
