import forgotPassword from "src/services/account/forgot-password";
import get from "src/services/account/get";
import resetPassword from "src/services/account/reset-password";
import update from "src/services/account/update";
import verify from "src/services/account/verify";
import verifyResetPassword from "src/services/account/verify-reset-password";
import uploadAvatar from "src/services/account/upload-avatar";
import {
    AccountChangePasswordParams,
    AccountForgotPasswordParams,
    AccountGetParams,
    AccountPhoneVerifyParams,
    AccountRequestVerifyParams,
    AccountResetPasswordParams,
    AccountUpdateParams,
    AccountUploadAvatarParams,
    AccountVerifyParams,
    AccountVerifyResetPasswordParams,
} from "src/services/types";
import changePassword from "src/services/account/change-password";
import requestVerify from "src/services/account/request-verify";
import phoneVerify from "src/services/account/phone-verify";

const path = "/account";
const accountService = {
    get: (params: AccountGetParams) => get(path, params),
    requestVerify: (params: AccountRequestVerifyParams) => requestVerify(path, params),
    verify: (params: AccountVerifyParams) => verify(path, params),
    forgotPassword: (params: AccountForgotPasswordParams) => forgotPassword(path, params),
    verifyResetPassword: (params: AccountVerifyResetPasswordParams) =>
        verifyResetPassword(path, params),
    resetPassword: (params: AccountResetPasswordParams) => resetPassword(path, params),
    update: (params: AccountUpdateParams) => update(path, params),
    uploadAvatar: (params: AccountUploadAvatarParams) => uploadAvatar(path, params),
    changePassword: (params: AccountChangePasswordParams) => changePassword(path, params),
    phoneVerify: (params: AccountPhoneVerifyParams) => phoneVerify(path, params),
};

export default accountService;
