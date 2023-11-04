import instance from "src/common/instances/instance";
import { CommonLLMParams } from "src/services/types";

const llm = async (rootPath: string, params: CommonLLMParams) => {
    return await instance.get(`${rootPath}/llm`, { params });
};

export default llm;
