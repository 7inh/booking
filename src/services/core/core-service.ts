import voice from "src/services/core/voice";
import { CoreVoiceParams } from "src/services/types";

const path = "";
const coreService = {
    voice: (params: CoreVoiceParams | null) => {
        if (params) return voice(path, params);
    },
};

export default coreService;
