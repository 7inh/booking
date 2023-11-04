import instance from "src/common/instances/instance";
import { JSONtoFormData } from "src/common/utils";
import { BotPublishParams } from "src/services/types";

const publish = async (
    rootPath: string,
    { tags, images, extends: extendsParams, ...params }: BotPublishParams
) => {
    const formData = JSONtoFormData(params);

    if (extendsParams) {
        formData.append("extends", JSON.stringify(extendsParams));
    }

    formData.append("tags", JSON.stringify(tags));

    if (images?.length) {
        images.forEach((image) => {
            formData.append("images", image);
        });
    }

    return await instance.post(`${rootPath}/publish`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    });
};

export default publish;
