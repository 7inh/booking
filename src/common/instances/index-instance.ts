import axios from "axios";
import { INDEX_HOST } from "src/common/configs";

const indexInstance = axios.create({
    baseURL: INDEX_HOST,
    timeout: 120000,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export default indexInstance;
