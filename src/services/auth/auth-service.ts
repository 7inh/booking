import login from "src/services/auth/login";
import refreshToken from "src/services/auth/refresh-token";
import register from "src/services/auth/register";
import verifyToken from "src/services/auth/verify-token";
import {
    AuthRegisterParams,
    AuthVerifyTokenParams,
    LoginParams,
    RefreshTokenParams,
} from "src/services/types";

const path = "/auth";
const authService = {
    login: (params: LoginParams) => login(path, params),
    register: (params: AuthRegisterParams) => register(path, params),
    refreshToken: (params: RefreshTokenParams) => refreshToken(path, params),
    verifyToken: (params: AuthVerifyTokenParams) => verifyToken(path, params),
};

export default authService;
