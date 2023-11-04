import { render, screen } from "@testing-library/react";
import HistoryTransactionItem, {
    HistoryTransactionItemProps,
} from "src/pages/Account/HistoryTransaction/HistoryTransactionItem";
import TranslationProvider from "src/providers/TranslationProvider";
import { mockTransaction1, mockTransaction2 } from "src/test-utils/mocks/transaction";

const renderComponent = (props: HistoryTransactionItemProps) => {
    return render(
        <TranslationProvider initLocale="en">
            <HistoryTransactionItem {...props} />
        </TranslationProvider>
    );
};

describe("HistoryTransactionItem", () => {
    it("should render correctly with transaction type is GIFT_CODE", () => {
        renderComponent({
            transaction: mockTransaction1[0],
        });

        const expireTimeEle = screen.getByTestId("HistoryTransactionItem__expireTime");
        const priceEle = screen.getByTestId("HistoryTransactionItem__price");
        const detailEle = screen.getByTestId("HistoryTransactionItem__detail");

        expect(screen.getByText("Gift Code")).toBeInTheDocument();
        expect(screen.getByText(mockTransaction1[0].title)).toBeInTheDocument();
        expect(expireTimeEle).toBeInTheDocument();
        expect(expireTimeEle).toHaveTextContent("November 25, 2023");
        expect(priceEle).toBeInTheDocument();
        expect(priceEle).toHaveTextContent("0");
        expect(detailEle).toBeInTheDocument();
        expect(detailEle).toHaveTextContent("Account: +100 Extra Bots, +50 Extra Tokens");
    });

    it("should render correctly with transaction type is PACKAGE", () => {
        renderComponent({
            transaction: mockTransaction1[1],
        });

        const expireTimeEle = screen.getByTestId("HistoryTransactionItem__expireTime");
        const priceEle = screen.getByTestId("HistoryTransactionItem__price");
        const detailEle = screen.getByTestId("HistoryTransactionItem__detail");

        expect(screen.getByText("Package")).toBeInTheDocument();
        expect(screen.getByText(mockTransaction1[1].title)).toBeInTheDocument();
        expect(expireTimeEle).toBeInTheDocument();
        expect(expireTimeEle).toHaveTextContent("November 25, 2023");
        expect(priceEle).toBeInTheDocument();
        expect(priceEle).toHaveTextContent("-100,000");
        expect(detailEle).toBeInTheDocument();
        expect(detailEle).toHaveTextContent("Account: +100 Extra Bots, +50 Extra Tokens");
    });

    it("should render correctly with transaction type is VOUCHER", () => {
        renderComponent({
            transaction: mockTransaction1[2],
        });

        const expireTimeEle = screen.getByTestId("HistoryTransactionItem__expireTime");
        const priceEle = screen.getByTestId("HistoryTransactionItem__price");
        const detailEle = screen.getByTestId("HistoryTransactionItem__detail");

        expect(screen.getByText("Voucher")).toBeInTheDocument();
        expect(screen.getByText(mockTransaction1[2].title)).toBeInTheDocument();
        expect(expireTimeEle).toBeInTheDocument();
        expect(expireTimeEle).toHaveTextContent("December 01, 2023");
        expect(priceEle).toBeInTheDocument();
        expect(priceEle).toHaveTextContent("0");
        expect(detailEle).toBeInTheDocument();
        expect(detailEle).toHaveTextContent("Account: +200 Extra Tokens");
    });

    it("should render correctly with transaction type is GIFT_CODE expire", () => {
        renderComponent({
            transaction: mockTransaction2[1],
        });

        const expireTimeEle = screen.getByTestId("HistoryTransactionItem__expireTime");
        const priceEle = screen.getByTestId("HistoryTransactionItem__price");
        const detailEle = screen.getByTestId("HistoryTransactionItem__detail");

        expect(screen.getByText("Gift Code")).toBeInTheDocument();
        expect(screen.getByText(mockTransaction2[1].title)).toBeInTheDocument();
        expect(expireTimeEle).toBeInTheDocument();
        expect(expireTimeEle).toHaveTextContent("November 25, 2023");
        expect(priceEle).toBeInTheDocument();
        expect(priceEle).toHaveTextContent("0");
        expect(detailEle).toBeInTheDocument();
        expect(detailEle).toHaveTextContent("Account: -100 Extra Bots, -50 Extra Tokens");
    });

    it("should render correctly with transaction type is PACKAGE expire", () => {
        renderComponent({
            transaction: mockTransaction2[0],
        });

        const expireTimeEle = screen.getByTestId("HistoryTransactionItem__expireTime");
        const priceEle = screen.getByTestId("HistoryTransactionItem__price");
        const detailEle = screen.getByTestId("HistoryTransactionItem__detail");

        expect(screen.getByText("Package")).toBeInTheDocument();
        expect(screen.getByText(mockTransaction2[0].title)).toBeInTheDocument();
        expect(expireTimeEle).toBeInTheDocument();
        expect(expireTimeEle).toHaveTextContent("December 01, 2023");
        expect(priceEle).toBeInTheDocument();
        expect(priceEle).toHaveTextContent("0");
        expect(detailEle).toBeInTheDocument();
        expect(detailEle).toHaveTextContent("Account: -200 Extra Tokens, -30 Extra Points");
    });

    it("should render correctly with transaction type is VOUCHER expire", () => {
        renderComponent({
            transaction: mockTransaction2[2],
        });

        const expireTimeEle = screen.getByTestId("HistoryTransactionItem__expireTime");
        const priceEle = screen.getByTestId("HistoryTransactionItem__price");
        const detailEle = screen.getByTestId("HistoryTransactionItem__detail");

        expect(screen.getByText("Voucher")).toBeInTheDocument();
        expect(screen.getByText(mockTransaction2[2].title)).toBeInTheDocument();
        expect(expireTimeEle).toBeInTheDocument();
        expect(expireTimeEle).toHaveTextContent("December 01, 2023");
        expect(priceEle).toBeInTheDocument();
        expect(priceEle).toHaveTextContent("0");
        expect(detailEle).toBeInTheDocument();
        expect(detailEle).toHaveTextContent("Account: -200 Extra Tokens");
    });
});
