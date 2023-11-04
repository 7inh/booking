import { ReaderCountTokensParams } from "src/services/types";
import countTokens from "src/services/reader/count-tokens";

const path = "/reader";
const readerService = {
    countTokens: (params: ReaderCountTokensParams) => countTokens(path, params),
};

export default readerService;
