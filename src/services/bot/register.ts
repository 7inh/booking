import instance from "src/common/instances/instance";
import { BotRegisterParams } from "src/services/types";

const register = async (rootPath: string, params: BotRegisterParams) => {
    return await instance.post(`${rootPath}/register_v2`, params, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export default register;
