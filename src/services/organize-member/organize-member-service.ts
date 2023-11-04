import removeFromOrgOrGroup from "src/services/organize-member/delete";
import deleteRoles from "src/services/organize-member/delete-roles";
import get from "src/services/organize-member/get";
import getRoles from "src/services/organize-member/get-roles";
import insert from "src/services/organize-member/insert";
import insertRoles from "src/services/organize-member/insert-roles";
import verifyInvite from "src/services/organize-member/verify";
import {
    OrganizeMemberDeleteParams,
    OrganizeMemberDeleteRolesParams,
    OrganizeMemberGetParams,
    OrganizeMemberGetRoleParams,
    OrganizeMemberInsertParams,
    OrganizeMemberInsertRolesParams,
    OrganizeMemberVerifyParams,
} from "src/services/types";

const path = "/organize/member";
const organizeMemberService = {
    get: (params: OrganizeMemberGetParams) => get(path, params),
    insert: (params: OrganizeMemberInsertParams) => insert(path, params),
    verifyInvite: (params: OrganizeMemberVerifyParams) => verifyInvite(path, params),
    getRoles: (params: OrganizeMemberGetRoleParams) => getRoles(path, params),
    removeFromOrgOrGroup: (params: OrganizeMemberDeleteParams) =>
        removeFromOrgOrGroup(path, params),
    insertRoles: (params: OrganizeMemberInsertRolesParams) => insertRoles(path, params),
    deleteRoles: (params: OrganizeMemberDeleteRolesParams) => deleteRoles(path, params),
};

export default organizeMemberService;
