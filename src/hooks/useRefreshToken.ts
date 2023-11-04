import { useEffect, useReducer } from "react";
import { useBeforeUnload } from "react-router-dom";
import auth from "src/common/instances/firebaseAuth-instance";
import { extractResponseToLoginData } from "src/common/internals";
import { isRequestSuccessful } from "src/common/utils";
import { useAccountContext } from "src/contexts/AccountContext";
import useVerifyToken from "src/hooks/useVerifyToken";

const useRefreshToken = () => {
    const { setUser, token, setToken, logOut, logIn } = useAccountContext();

    const [isRefresh, setIsRefresh] = useReducer((state) => !state, false);

    const { mutateAsync: verifyToken } = useVerifyToken();

    useBeforeUnload(() => {
        sessionStorage.removeItem("refreshTime");
    });

    useEffect(() => {
        const refreshToken = async () => {
            try {
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        user.getIdToken().then(async (idToken) => {
                            const response: any = await verifyToken({ token: idToken });
                            if (isRequestSuccessful(response)) {
                                logIn(extractResponseToLoginData(response));
                                setTimeout(() => refreshToken(), 30 * 60 * 1000);
                            } else {
                                logOut();
                            }
                        });
                    } else if (!sessionStorage.getItem("refreshTime")) {
                        logOut();
                    }
                });
            } catch (error) {
                logOut();
            }
        };

        if (!isRefresh) {
            setIsRefresh();

            if (!token) refreshToken();
        } else {
            const expireTime = localStorage.getItem("expireTime");
            const currentTime = new Date().getTime();
            if (!expireTime || currentTime > Number(expireTime)) logOut();
        }
    }, [isRefresh, logIn, logOut, setToken, setUser, token, verifyToken]);
};

export default useRefreshToken;
