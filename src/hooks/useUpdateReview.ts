import { doMutation } from "src/services/services";

const useUpdateReview = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "market",
        action: "botReviewUpdate",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useUpdateReview;
