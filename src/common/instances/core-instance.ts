import axios from "axios";
import { CORE_HOST } from "src/common/configs";

const coreInstance = axios.create({
    baseURL: CORE_HOST,
    timeout: 15000,
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Referrer-Policy": "strict-origin-when-cross-origin",
    },
});

export default coreInstance;
