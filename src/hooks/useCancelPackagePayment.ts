import { doMutation } from "src/services/services";

const useCancelPackagePayment = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "payment",
        action: "cancelPackage",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useCancelPackagePayment;
