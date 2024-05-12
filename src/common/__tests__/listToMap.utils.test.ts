import { listToMap } from "src/common/utils";

describe("listToMap", () => {
    it("should return an map object", () => {
        const result = listToMap([
            {
                id: 496,
                current_price: 14400,
            },
            {
                id: 497,
                current_price: 14400,
            },
            {
                id: 498,
                current_price: 14400,
            },
            {
                id: 499,
                current_price: 14400,
            },
            {
                id: 2492,
                current_price: 47700,
            },
        ]);

        expect(result).toEqual({
            496: {
                id: 496,
                current_price: 14400,
            },
            497: {
                id: 497,
                current_price: 14400,
            },
            498: {
                id: 498,
                current_price: 14400,
            },
            499: {
                id: 499,
                current_price: 14400,
            },
            2492: {
                id: 2492,
                current_price: 47700,
            },
        });
    });
});
