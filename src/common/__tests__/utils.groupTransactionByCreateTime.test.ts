import { groupTransactionByCreateTime } from "src/common/utils";
import { mockTransaction1 } from "src/test-utils/mocks/transaction";

describe("groupTransactionByCreateTime", () => {
    it("should group transactions by date", () => {
        const result = groupTransactionByCreateTime(mockTransaction1, "en");
        expect(result).toEqual({
            today: [mockTransaction1[0]],
            "October 21, 2023": [mockTransaction1[1]],
            "October 20, 2023": [mockTransaction1[2]],
        });
    });

    it("should group when transaction is empty", () => {
        const result = groupTransactionByCreateTime([], "en");
        expect(result).toEqual({});
    });
});
