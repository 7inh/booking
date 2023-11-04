import coreInstance from "src/common/instances/core-instance";
import { CoreVoiceParams } from "src/services/types";

const voice = async (rootPath: string, params: CoreVoiceParams) => {
    return await coreInstance.get(`${rootPath}/voice/`, { params });
};

export default voice;
