import instance from "src/common/instances/instance";
import { OrganizeGroupInsertParams } from "src/services/types";

const insert = async (rootPath: string, params: OrganizeGroupInsertParams) => {
    return await instance.post(`${rootPath}/insert`, params, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export default insert;
