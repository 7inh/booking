import detail from "src/services/organize/detail";
import get from "src/services/organize/get";
import insert from "src/services/organize/insert";
import joined from "src/services/organize/joined";
import {
    OrganizeDetailParams,
    OrganizeGetParams,
    OrganizeInsertParams,
    OrganizeJoinedParams,
} from "src/services/types";

const path = "/organize";
const organizeService = {
    get: (params: OrganizeGetParams) => get(path, params),
    insert: (params: OrganizeInsertParams) => insert(path, params),
    joined: (params: OrganizeJoinedParams) => joined(path, params),
    detail: (params: OrganizeDetailParams) => detail(path, params),
};

export default organizeService;
