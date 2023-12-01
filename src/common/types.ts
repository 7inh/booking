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
}

export interface BookDetail extends Book {
    description: string;
    publisher: number;
    publishDate: string;
    author: string;
    size: string;
    weight: number;
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
    checkBoxState: "checked" | "unchecked";
}

export interface CartItem {
    book: Book;
    quantity: number;
}

export interface Coupon {
    code: string;
    discount: number;
    value: number;
}

export interface FilterBookType {
    price?: [number, number];
    availability: string[];
    variant: string[];
    rare: string[];
    orderBy?: string;
}

export interface FilterBookParams {
    priceRange?: string;
    availability: number[];
    variant: number[];
    rare: number[];
}

export type OrderBy = "newest" | "oldest" | "priceDesc" | "priceAsc" | "sale" | "discount";
