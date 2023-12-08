import { Alert } from "@mui/material";
import { ComponentProps } from "react";

export interface Message {
    key?: string;
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
}

export interface MyCustomEventDetail {
    message: string;
    severity: ComponentProps<typeof Alert>["severity"];
}

export interface Book {
    id: string;
    title: string;
    cover: string;
    current_price: number;
    old_price: number;
    discount: number;
    description?: string;
    weight?: string;
}

export interface BookDetail extends Book {
    description: string;
    publisher: number;
    publishDate: string;
    author: string;
    size: string;
    weight: string;
    quantity: number;
    sold: number;
    pages: number;
    format: number;
    language: string;
    availability: number;
    variant: "once" | "combo" | "full-set";
    rare: number;
}

export interface BookDataCustom {
    key: string;
    name: string;
    checkBoxState: string;
}

export interface CartItem {
    book: Book;
    quantity: number;
}

export interface Coupon {
    code: string;
    discount: number;
    discountValue?: number;
    max_discount: number;
    min_price: number;
    used: number;
    quantity: number;
    expired_at: string; // format "2024-12-04T17:00:00.000Z"
    type: 0 | 1; // 0: percent, 1: fixed
    errorMessage?: string;
}

export interface FilterBookType {
    price?: [number, number];
    availability: string[];
    variant: string[];
    rare: string[];
    format: string[];
    orderBy?: string;
}

export interface FilterBookParams {
    priceRange?: string;
    availability: number[];
    variant: number[];
    rare: number[];
    format: number[];
}

export type OrderBy = "newest" | "oldest" | "priceDesc" | "priceAsc" | "sale" | "discount";
