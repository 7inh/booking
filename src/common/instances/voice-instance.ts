import axios from "axios";
import { VOICE_HOST } from "src/common/configs";

const voiceInstance = axios.create({
    baseURL: VOICE_HOST,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default voiceInstance;
