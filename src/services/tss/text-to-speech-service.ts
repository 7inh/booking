import listVoice from "src/services/tss/list-voice";
import { VoiceParams } from "src/services/types";

const path = "/tts";
const ttsService = {
    listVoice: (params: VoiceParams | null) => {
        if (params) return listVoice(path, params);
    },
};

export default ttsService;
