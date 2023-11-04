import { doMutation } from "src/services/services";

const useUpdateOrganizeGroup = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "organizeGroup",
        action: "update",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useUpdateOrganizeGroup;
