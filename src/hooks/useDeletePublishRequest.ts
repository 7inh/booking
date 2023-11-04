import { doMutation } from "../services/services";

const useDeletePublishRequest = () => {
    const { mutate, mutateAsync, isSuccess, isError, isLoading } = doMutation({
        entity: "bot",
        action: "publishDeleteRequest",
        option: {},
    });

    return { mutate, mutateAsync, isSuccess, isError, isLoading };
};

export default useDeletePublishRequest;
