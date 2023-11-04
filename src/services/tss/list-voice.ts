import voiceInstance from "src/common/instances/voice-instance";
import { VoiceParams } from "src/services/types";

const listVoice = async (rootPath: string, params: VoiceParams) => {
    return await voiceInstance.get(`${rootPath}/list_voice`, { params });
};

export default listVoice;
