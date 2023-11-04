import { doMutation } from "src/services/services";

const useVerifyInvite = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "organizeMember",
        action: "verifyInvite",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useVerifyInvite;
