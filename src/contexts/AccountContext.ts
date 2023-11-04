import { createContext, useContext } from "react";
import { User } from "src/common/types";

export interface AccountState {
    token: string;
    user: User;
    detail: any;
    isFetched: boolean;
}

interface AccountContextProps extends AccountState {
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    setDetail: (detail: any) => void;
    setIsFetched: (isFetched: boolean) => void;
    logOut: () => void;
    logIn: (props: { token: string; user: User }) => void;
}

const AccountContext = createContext<AccountContextProps>({
    token: "",
    user: {
        roles: "",
        userToken: "",
        orgRoles: [],
    },
    detail: {},
    isFetched: false,
    setToken: () => {},
    setUser: () => {},
    setDetail: () => {},
    setIsFetched: () => {},
    logOut: () => {},
    logIn: () => {},
});

AccountContext.displayName = "AccountContext";

const useAccountContext = () => useContext(AccountContext);

export { AccountContext, useAccountContext };
