import { doMutation } from "src/services/services";

const useInsertReview = () => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "market",
        action: "botReviewInsert",
        option: {},
    });

    return { mutateAsync, isLoading };
};

export default useInsertReview;
