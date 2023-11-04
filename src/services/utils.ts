import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import auth from "src/common/instances/firebaseAuth-instance";
import instance from "src/common/instances/instance";
import { extractResponseToLoginData, updateInstanceToken } from "src/common/internals";
import { clearAllStorage, isRequestSuccessful } from "src/common/utils";

export type ServiceRequiredDefinition<T = any> = Required<T>;

export type ServiceMap<T = any> = {
    [X in keyof T]: ServiceRequiredDefinition;
};

export function createMutationService<S extends ServiceMap>(service: S) {
    return function mutation<
        Entity extends keyof S,
        Action extends keyof S[Entity],
        Handler extends S[Entity][Action]
    >({
        entity,
        action,
        option,
    }: {
        entity: Entity;
        action: Action;
        option?: {
            onSuccess?: (data: any, variables: any, context: any) => void;
            onError?: (
                error: AxiosError<unknown, any>,
                variables: Parameters<Handler>[0],
                context: unknown
            ) => void;
        };
    }) {
        return useMutation({
            mutationFn: (variable: Parameters<Handler>[0]) => service[entity][action](variable),
            onSuccess: (data, variables, context) => {
                option?.onSuccess?.(data, variables, context);
            },
            onError: async (error: AxiosError, variable) => {
                option?.onError?.(error, variable, {});
            },
        });
    };
}

export function createQueryService<S extends ServiceMap>(service: S) {
    return function query<
        Entity extends keyof S,
        Action extends keyof S[Entity],
        Handler extends S[Entity][Action]
    >({
        entity,
        action,
        params,
        option,
    }: {
        entity: Entity;
        action: Action;
        params: Parameters<Handler>[0];
        option?: {
            enable: boolean;
            onError?: (error: AxiosError<unknown, any>) => void;
            onSuccess?: (data: any) => void;
            select?: (data: any) => any;
        };
    }) {
        const queryKey = `${String(entity)}_${String(action)}`;

        return useQuery([queryKey, params], () => service[entity][action](params), {
            retry: 1,
            refetchOnWindowFocus: false,
            enabled: option?.enable ?? true,
            onError: async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    try {
                        auth.onAuthStateChanged((user) => {
                            if (user) {
                                user.getIdToken().then(async (idToken) => {
                                    const response = await instance.post("/auth/verify_token", {
                                        token: idToken,
                                    });

                                    if (isRequestSuccessful(response)) {
                                        updateInstanceToken(
                                            extractResponseToLoginData(response).token
                                        );
                                    } else {
                                        clearAllStorage();
                                        window.location.href = "/auth/login";
                                    }
                                });
                            } else {
                                clearAllStorage();
                                window.location.href = "/auth/login";
                            }
                        });
                    } catch (error) {
                        setTimeout(() => {
                            clearAllStorage();
                            window.location.href = "/auth/login";
                        }, 2000);
                    }
                } else {
                    option?.onError?.(error);
                }
            },
            onSuccess: (data) => {
                option?.onSuccess?.(data);
            },
            ...(option?.select ? { select: option.select } : {}),
        });
    };
}
