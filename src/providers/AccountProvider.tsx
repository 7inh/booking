import { useCallback, useMemo, useState } from "react";
import { clearAllStorage, clearAuthData, updateInstanceToken } from "src/common/internals";
import { User } from "src/common/types";
import auth from "src/common/instances/firebaseAuth-instance";
import { AccountContext, AccountState } from "src/contexts/AccountContext";
import { useNavigate } from "react-router-dom";

interface AccountProviderProps {
    children: React.ReactNode;
}

const AccountProvider = ({ children }: AccountProviderProps) => {
    const navigate = useNavigate();

    const [state, setState] = useState<AccountState>({
        token: "",
        user: {
            roles: "",
            userToken: "",
        },
        detail: {},
        isFetched: false,
    });

    const setToken = useCallback((token: string) => {
        setState((prevState) => ({
            ...prevState,
            token,
        }));
    }, []);

    const setUser = useCallback((user: User) => {
        setState((prevState) => ({
            ...prevState,
            user,
        }));
    }, []);

    const setDetail = useCallback((detail: any) => {
        setState((prevState) => ({
            ...prevState,
            detail,
        }));
    }, []);

    const setIsFetched = useCallback((isFetched: boolean) => {
        setState((prevState) => ({
            ...prevState,
            isFetched,
        }));
    }, []);

    const logOut = useCallback(() => {
        clearAllStorage();
        clearAuthData();
        setUser({
            roles: "",
            userToken: "",
            orgRoles: [],
        });
        setToken("");
        setDetail({});
        setIsFetched(false);
        auth.signOut();
        navigate("/auth/login");
    }, [navigate, setDetail, setIsFetched, setToken, setUser]);

    const logIn = useCallback(
        ({ token, user }: { token: string; user: User }) => {
            updateInstanceToken(token);
            setToken(token);
            setUser(user);
            setIsFetched(true);
        },
        [setIsFetched, setToken, setUser]
    );

    const value = useMemo(
        () => ({
            ...state,
            setToken,
            setUser,
            setDetail,
            setIsFetched,
            logOut,
            logIn,
        }),
        [state, setToken, setUser, setDetail, setIsFetched, logOut, logIn]
    );

    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export default AccountProvider;
