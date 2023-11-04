import { render, screen } from "@testing-library/react";
import HistoryTransaction, {
    HistoryTransactionProps,
} from "src/pages/Account/HistoryTransaction/HistoryTransaction";
import TranslationProvider from "src/providers/TranslationProvider";
import { mockTransaction1 } from "src/test-utils/mocks/transaction";

jest.mock("src/hooks/useGetHistoryTransaction", () => {
    return () => ({
        data: mockTransaction1,
    });
});

const renderComponent = (props: HistoryTransactionProps) => {
    return render(
        <TranslationProvider initLocale="en">
            <HistoryTransaction {...props} />
        </TranslationProvider>
    );
};

describe("HistoryTransaction", () => {
    it("should render correctly", () => {
        renderComponent({
            walletId: "1",
        });

        expect(screen.getByText("Today")).toBeInTheDocument();
        expect(screen.getAllByTestId("HistoryTransactionGroup__root")).toHaveLength(3);
        expect(screen.getAllByTestId("HistoryTransactionItem__root")).toHaveLength(3);
    });
});
