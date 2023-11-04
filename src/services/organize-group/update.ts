import instance from "src/common/instances/instance";
import { OrganizeGroupUpdateParams } from "src/services/types";

const update = async (rootPath: string, params: OrganizeGroupUpdateParams) => {
    return await instance.put(`${rootPath}/update`, params, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export default update;
