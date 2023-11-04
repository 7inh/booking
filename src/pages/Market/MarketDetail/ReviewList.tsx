import { Box, Skeleton, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAccountContext } from "src/contexts/AccountContext";
import ReviewCard from "src/pages/Market/MarketDetail/ReviewCard";
import { v4 as uuidv4 } from "uuid";

export interface ReviewListProps {
    getReviews: (page: number) => {
        data: any[];
        isFetched: boolean;
        isFetching: boolean;
    };
    onClickDelete: (review: any) => void;
    onClickUpdate: (review: any) => void;
}

const ReviewListPerPage = ({
    getReviews,
    page,
    onFetched,
    state,
    onClickDelete,
    onClickUpdate,
    userToken,
}: {
    getReviews: ReviewListProps["getReviews"];
    page: number;
    onFetched: (isLastPage: boolean) => void;
    state: "fetching" | "fetched";
    onClickDelete: (review: any) => void;
    onClickUpdate: (review: any) => void;
    userToken: string;
}) => {
    const { data: reviews = [], isFetched: isFetchedReviews } = getReviews(page);

    useEffect(() => {
        if (state === "fetching" && isFetchedReviews) {
            onFetched(!reviews.length);
        }
    }, [reviews.length, isFetchedReviews, onFetched, state]);

    return (
        <>
            {state === "fetching"
                ? Array.from({ length: reviews.length || 5 }).map((_, index) => (
                      <Skeleton
                          key={index}
                          variant="rectangular"
                          width="100%"
                          height="148px"
                          sx={{ borderRadius: 2 }}
                      />
                  ))
                : reviews.map((review: any) => (
                      <ReviewCard
                          key={review.idReview}
                          avatar={review.avatar}
                          displayName={review.displayName}
                          createTime={review.createTime}
                          star={review.star}
                          comment={review.comment}
                          isOwner={review.ownerToken === userToken}
                          onClickDelete={() => onClickDelete(review)}
                          onClickUpdate={() => onClickUpdate(review)}
                      />
                  ))}
        </>
    );
};

const ReviewList = (props: ReviewListProps) => {
    const { getReviews, onClickDelete, onClickUpdate } = props;

    const {
        user: { userToken },
    } = useAccountContext();

    const [pageWithKey, setPageWithKey] = useState<
        {
            page: number;
            key: string;
            state: "fetching" | "fetched";
            isLastPage?: boolean;
        }[]
    >([{ page: 1, key: uuidv4(), state: "fetching" }]);

    const handleFetched = useCallback((key: string, isLastPage: boolean) => {
        setPageWithKey((prev) => {
            return prev.map((pageWithKey) => {
                if (pageWithKey.key === key) {
                    return {
                        ...pageWithKey,
                        state: "fetched",
                        isLastPage,
                    };
                }
                return pageWithKey;
            });
        });
    }, []);

    const handleScrollToBottom = useCallback(() => {
        const lastPageWithKey = pageWithKey[pageWithKey.length - 1];
        if (lastPageWithKey.state === "fetching" || lastPageWithKey.isLastPage) return;

        setPageWithKey((prev) => {
            const lastPage = prev[prev.length - 1].page;
            return [
                ...prev,
                {
                    page: lastPage + 1,
                    key: uuidv4(),
                    state: "fetching",
                },
            ];
        });
    }, [pageWithKey]);

    return (
        <Box
            sx={{
                overflow: "auto",
                flexGrow: 1,
                mr: 4.45,
                "::-webkit-scrollbar": {
                    width: "3px",
                },
                "::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                },
                "::-webkit-scrollbar-thumb": {
                    bgcolor: "primary.main",
                },
                "::-webkit-scrollbar-thumb:hover": {
                    background: "#555",
                },
            }}
            onScroll={(e) => {
                const target = e.target as HTMLDivElement;
                if (target.scrollTop + target.clientHeight >= target.scrollHeight - 1) {
                    handleScrollToBottom();
                }
            }}
        >
            <Stack spacing={3} mx={3.5} my={1}>
                {pageWithKey.map(({ page, key, state }) => {
                    return (
                        <ReviewListPerPage
                            key={key}
                            getReviews={getReviews}
                            onFetched={(isLastPage) => handleFetched(key, isLastPage)}
                            state={state}
                            page={page}
                            onClickDelete={onClickDelete}
                            onClickUpdate={onClickUpdate}
                            userToken={userToken}
                        />
                    );
                })}
            </Stack>
        </Box>
    );
};

export default ReviewList;
