import { getCartItemPriceChange } from "src/common/utils";
import { mockBook } from "src/test-utils/mocks/books";

describe("getCartItemPriceChange", () => {
    it("should return empty if nothing change", () => {
        const result = getCartItemPriceChange({
            cartItems: {
                1: {
                    book: mockBook,
                    eps: [
                        {
                            id: 1,
                            current_price: 14400,
                        },
                    ],
                },
                2: {
                    book: mockBook,
                    eps: [
                        {
                            id: 1,
                            current_price: 14400,
                        },
                        {
                            id: 2,
                            current_price: 14400,
                        },
                    ],
                },
                3: {
                    book: mockBook,
                    eps: [
                        {
                            id: 1,
                            current_price: 14400,
                        },
                        {
                            id: 2,
                            current_price: 14400,
                        },
                        {
                            id: 3,
                            current_price: 14400,
                        },
                    ],
                },
            },
            itemEpsIdWithPrice: [
                {
                    id: 1,
                    current_price: 14400,
                },
                {
                    id: 2,
                    current_price: 14400,
                },
                {
                    id: 3,
                    current_price: 14400,
                },
            ],
        });

        expect(result).toEqual({});
    });

    it("should return the price change", () => {
        const result = getCartItemPriceChange({
            cartItems: {
                cartItems1: {
                    book: mockBook,
                    eps: [
                        {
                            id: 1,
                            current_price: 14400,
                        },
                    ],
                },
                cartItems2: {
                    book: mockBook,
                    eps: [
                        {
                            id: 1,
                            current_price: 14400,
                        },
                        {
                            id: 2,
                            current_price: 14400,
                        },
                    ],
                },
                cartItems3: {
                    book: mockBook,
                    eps: [
                        {
                            id: 1,
                            current_price: 14400,
                        },
                        {
                            id: 2,
                            current_price: 14400,
                        },
                        {
                            id: 3,
                            current_price: 14400,
                        },
                    ],
                },
            },
            itemEpsIdWithPrice: [
                {
                    id: 1,
                    current_price: 14400,
                },
                {
                    id: 2,
                    current_price: 14400,
                },
                {
                    id: 3,
                    current_price: 14500,
                },
            ],
        });

        expect(result).toEqual({
            cartItems3: {
                book: mockBook,
                eps: [
                    {
                        id: 1,
                        current_price: 14400,
                    },
                    {
                        id: 2,
                        current_price: 14400,
                    },
                    {
                        id: 3,
                        current_price: 14500,
                    },
                ],
            },
        });
    });
});
