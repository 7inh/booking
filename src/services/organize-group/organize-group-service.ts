import deleteGroup from "src/services/organize-group/delete";
import detail from "src/services/organize-group/detail";
import get from "src/services/organize-group/get";
import insert from "src/services/organize-group/insert";
import joined from "src/services/organize-group/joined";
import update from "src/services/organize-group/update";
import {
    OrganizeGroupDeleteParams,
    OrganizeGroupDetailParams,
    OrganizeGroupGetParams,
    OrganizeGroupInsertParams,
    OrganizeGroupJoinedParams,
    OrganizeGroupUpdateParams,
} from "src/services/types";

const path = "/organize/group";
const organizeGroupService = {
    get: (params: OrganizeGroupGetParams) => get(path, params),
    detail: (params: OrganizeGroupDetailParams) => detail(path, params),
    insert: (params: OrganizeGroupInsertParams) => insert(path, params),
    joined: (params: OrganizeGroupJoinedParams) => joined(path, params),
    update: (params: OrganizeGroupUpdateParams) => update(path, params),
    deleteGroup: (params: OrganizeGroupDeleteParams) => deleteGroup(path, params),
};

export default organizeGroupService;
