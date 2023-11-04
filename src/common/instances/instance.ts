import axios from "axios";
import { API_HOST } from "src/common/configs";

const instance = axios.create({
    baseURL: API_HOST,
    timeout: 15000,
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
