import { DateTime } from "luxon";
import { Transaction } from "src/common/types";

export const mockTransaction1: Transaction[] = [
    {
        type: "GIFT_CODE",
        title: "Sample Gift Code 0",
        price: 0,
        createTime: DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss"),
        expireTime: "25/11/2023 12:00:00",
        state: "ACTIVE",
        detail: [
            {
                type: "BOT",
                amount: 100,
            },
            {
                type: "TOKEN",
                amount: 50,
            },
        ],
    },
    {
        type: "PACKAGE",
        title: "Sample Gift Code 1",
        price: -100000,
        createTime: "21/10/2023 12:00:00",
        expireTime: "25/11/2023 12:00:00",
        state: "ACTIVE",
        detail: [
            {
                type: "BOT",
                amount: 100,
            },
            {
                type: "TOKEN",
                amount: 50,
            },
        ],
    },
    {
        type: "VOUCHER",
        title: "Sample Voucher 0",
        price: 0,
        createTime: "20/10/2023 12:00:00",
        expireTime: "01/12/2023 12:00:00",
        state: "INACTIVE",
        detail: [
            {
                type: "TOKEN",
                amount: 200,
            },
        ],
    },
];

export const mockTransaction2: Transaction[] = [
    {
        type: "PACKAGE",
        title: "Sample Package 1",
        price: 0,
        createTime: "20/10/2023 12:00:00",
        expireTime: "01/12/2023 12:00:00",
        state: "INACTIVE",
        detail: [
            {
                type: "TOKEN",
                amount: -200,
            },
            {
                type: "POINT",
                amount: -30,
            },
        ],
    },
    {
        type: "GIFT_CODE",
        title: "Sample Gift Code 1",
        price: 0,
        createTime: "21/10/2023 12:00:00",
        expireTime: "25/11/2023 12:00:00",
        state: "ACTIVE",
        detail: [
            {
                type: "BOT",
                amount: -100,
            },
            {
                type: "TOKEN",
                amount: -50,
            },
        ],
    },
    {
        type: "VOUCHER",
        title: "Sample Voucher 1",
        price: 0,
        createTime: "20/10/2023 12:00:00",
        expireTime: "01/12/2023 12:00:00",
        state: "INACTIVE",
        detail: [
            {
                type: "TOKEN",
                amount: -200,
            },
        ],
    },
];
