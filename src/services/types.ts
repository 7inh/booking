import { FilterBookParams, OrderBy } from "src/common/types";

export interface ItemGetPerPage {
    page: number;
    perPage: number;
    filter?: FilterBookParams;
    title?: string;
    orderBy: OrderBy;
}

export interface ItemGetTotal {
    filter?: FilterBookParams;
    title?: string;
}

export interface ItemGetById {
    id: number;
}

export interface ItemGetByIds {
    ids: number[];
}

export interface ItemGetRadom {}

export interface ItemGetPopular {}

export interface ItemGetNewest {}

export interface ItemGetComingSoon {}

export interface CouponGetByCode {
    code: string;
}

export interface AddressProvince {}

export interface AddressDistrict {
    provinceId: number;
}

export interface AddressWard {
    districtId: number;
}

export interface AddressPrice {
    receiverProvince: number;
    receiverDistrict: number;
    productWeight: number;
}
