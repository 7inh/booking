import { ReaderCountTokensParams } from "src/services/types";
import indexInstance from "src/common/instances/index-instance";

const countTokens = async (rootPath: string, params: ReaderCountTokensParams) => {
    return await indexInstance.post(`${rootPath}/count_tokens`, params);
};

export default countTokens;
