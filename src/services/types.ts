import { FilterBookParams } from "src/common/types";

export interface ItemGetPerPage {
    page: number;
    perPage: number;
    filter?: FilterBookParams;
}

export interface ItemGetTotal {
    filter?: FilterBookParams;
}

export interface ItemGetById {
    id: number;
}

export interface ItemGetRadom {}

export interface ItemGetPopular {}

export interface ItemGetNewest {}

export interface ItemGetComingSoon {}
