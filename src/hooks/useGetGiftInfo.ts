import { doMutation } from "../services/services";

const useGetGiftInfo = () => {
    const { mutate, mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "gift",
        action: "getInfo",
        option: {},
    });

    return { mutate, mutateAsync, isSuccess, isError, isLoading };
};

export default useGetGiftInfo;
