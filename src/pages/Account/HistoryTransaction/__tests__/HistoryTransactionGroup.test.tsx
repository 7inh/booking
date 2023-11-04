import { render, screen } from "@testing-library/react";
import HistoryTransactionGroup, {
    HistoryTransactionGroupProps,
} from "src/pages/Account/HistoryTransaction/HistoryTransactionGroup";
import TranslationProvider from "src/providers/TranslationProvider";
import { mockTransaction1 } from "src/test-utils/mocks/transaction";

const renderComponent = (props: HistoryTransactionGroupProps) => {
    return render(
        <TranslationProvider initLocale="en">
            <HistoryTransactionGroup {...props} />
        </TranslationProvider>
    );
};

describe("HistoryTransactionGroup", () => {
    it("should render correctly when date is today", () => {
        renderComponent({
            date: "today",
            transactions: mockTransaction1,
        });

        expect(screen.getByText("Today")).toBeInTheDocument();
        expect(screen.getAllByTestId("HistoryTransactionItem__root")).toHaveLength(
            mockTransaction1.length
        );
    });

    it("should render correctly when date is yesterday", () => {
        renderComponent({
            date: "yesterday",
            transactions: [],
        });

        expect(screen.getByText("Yesterday")).toBeInTheDocument();
        expect(screen.queryByTestId("HistoryTransactionItem__root")).not.toBeInTheDocument();
    });

    it("should render correctly when date is date string", () => {
        renderComponent({
            date: "2021-10-10",
            transactions: [],
        });

        expect(screen.getByText("2021-10-10")).toBeInTheDocument();
    });
});
