export const getStatusLabelColor = (status: string) => {
    switch (status) {
        case "new":
            return "#919EAB";
        case "pending":
            return "orange";
        case "received":
        case "passed":
        default:
            return "#212B36";
    }
};

export const mapPublishStateToLabel = (state: string) => {
    switch (state) {
        case "WAITING":
            return "received";
        case "IN_PROCESS":
            return "passed";
        case "deleted":
            return "Deleted";
        default:
            return "Unknown";
    }
};

export const getCardMessage = (state: string) => {
    switch (state) {
        case "WAITING":
            return "weReceivedYourRequestAndWillReviewItSoon";
        case "IN_PROCESS":
            return "weAreProcessingYourRequest";
        case "ACCEPT":
            return "yourRequestHasBeenAccepted";
        case "DENY":
            return "yourRequestHasBeenDenied";
        default:
            return "Unknown";
    }
};
