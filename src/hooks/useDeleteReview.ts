import { doMutation } from "../services/services";

export interface UseDeleteReviewProps {
    onError?: (error: any) => void;
}

export interface UseDeleteReviewReturn {}

const useDeleteReview = (props: UseDeleteReviewProps) => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "market",
        action: "botReviewDelete",
        option: {
            onError: props.onError,
        },
    });

    return { mutateAsync, isLoading };
};

export default useDeleteReview;
