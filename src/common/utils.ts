import dayjs from "dayjs";
import groupBy from "lodash/groupBy";
import { DateTime } from "luxon";
import { AvailabilityEnum, FormatEnum, RareEnum, VariantEnum } from "src/common/enum";
import { CartData, Coupon, FilterBookParams, FilterBookType, ItemEpsType } from "src/common/types";
import { LocaleType } from "src/locales/types";

export function formatDateTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
}

export function clearAllStorage() {
    localStorage.clear();
    sessionStorage.clear();
}

export const isRequestSuccessful = (response: any) => {
    return response && response.status >= 200 && response.status < 300;
};

export const groupAndJoinItemsByKey = <T>(
    items: T[],
    key: keyof T,
    joinKeys: (keyof T)[],
    groupKey: string
): (T & Record<string, keyof T>)[] => {
    const groupedItems = groupBy(items, key);

    return Object.values(groupedItems).map((group) => {
        const item = group[0];
        const joinedItems = joinKeys.reduce((acc, joinKey) => {
            const joinValues = group.map((g) => g[joinKey]);
            return { ...acc, [joinKey]: joinValues };
        }, {});

        return { ...item, ...joinedItems, [groupKey]: group };
    });
};

export function flagIcon(value: string) {
    if (["vietnamese", "vi"].includes(value)) return "🇻🇳";
    if (["english", "en"].includes(value)) return "🇬🇧";
    if (["japanese", "jp"].includes(value)) return "🇯🇵";

    return "🏳️";
}

export function parseParams(params: Record<string, any>) {
    let url = "";
    for (const key in params) {
        if (!params[key] && key !== "isGetAll" && typeof params[key] !== "number") continue;

        if (key === "filterKeys" || key === "filterValues") {
            url += `${key}=${encodeURIComponent(JSON.stringify(params[key]))}&`;
        } else {
            if (params[key] instanceof Array) {
                for (const value of params[key]) {
                    url += `${key}[]=${encodeURIComponent(value)}&`;
                }
            } else {
                url += `${key}=${encodeURIComponent(params[key])}&`;
            }
        }
    }
    return url.slice(0, -1);
}

export function formatTime(time: number) {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    return `${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}
export function formatTime2(time?: number | string) {
    let luxonDateTime;

    if (typeof time === "number") {
        luxonDateTime = DateTime.fromMillis(time);
    } else if (typeof time === "string") {
        luxonDateTime = DateTime.fromFormat(time, "dd/MM/yyyy HH:mm:ss");
    } else {
        luxonDateTime = DateTime.now();
    }

    const formattedTime = luxonDateTime.toFormat("hh:mm a");

    return formattedTime;
}

export const Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getFilterKeysAndValues = <T extends string>(
    props: {
        [key in T]: string[];
    },
    key: T[]
) => {
    let filterObject: {
        filterKeys: T[];
        filterValues: string[];
    } | null = null;

    for (const k of key) {
        if (props[k] && props[k].length > 0) {
            if (!filterObject) {
                filterObject = {
                    filterKeys: [],
                    filterValues: [],
                };
            }
            filterObject.filterKeys.push(k);
            filterObject.filterValues.push(props[k].join(";"));
        }
    }

    return filterObject;
};

export function getUserLocale() {
    return "vi";
    // const userLang = navigator.language;

    // if (!userLang) return "vi";

    // if (["en", "en-US"].includes(userLang)) return "en";
    // if (["vi", "vi-VN"].includes(userLang)) return "vi";
    // // if (["ja", "ja-JP"].includes(userLang)) return "jp";

    // return "vi";
}

export const getLocale = (locales?: string): LocaleType => {
    const lang = locales || localStorage.getItem("language") || getUserLocale();
    if (lang && ["en", "vi"].includes(lang)) {
        return lang as LocaleType;
    }
    return "en";
};

export const getLanguageName = (lang: string) => {
    switch (lang.toLowerCase()) {
        case "vietnamese": {
            return "Tiếng Việt";
        }
        case "english": {
            return "English";
        }
        default:
            return lang;
    }
};

export const downloadImage = (src: string, fileName: string) => {
    fetch(src)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error("Error downloading image:", error));
};

export const getUrlParams = (url: string) => {
    const params: Record<string, string> = {};
    const paramArray = url.replace(/(.*\?)/, "").split("&");

    for (let i = 0; i < paramArray.length; i++) {
        const param = paramArray[i].split("=");
        params[param[0]] = decodeURIComponent(param[1]);
    }

    return params;
};

export const randomColor = () => {
    let color;
    do {
        color = Math.floor(Math.random() * 16777215).toString(16);
    } while (calculateBrightness(color) > 200);
    return `#${color}`;
};

const calculateBrightness = (hexColor: string) => {
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
};

export const JSONtoFormData = (obj: any) => {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
        formData.append(key, obj[key]);
    });
    return formData;
};

export const toArray = <T>(value: T | T[]): T[] => {
    if (value instanceof Array) return value;
    return [value];
};

export const toCapitalize = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getShortFileType = (type: string) => {
    const arr = type.split("/");
    const minItem = arr.reduce((a, b) => (a.length < b.length ? a : b));
    return minItem;
};

export const getFileExtension = (fileName: string) => {
    return fileName.split(".").pop();
};

export const capitalizeWords = (str: string) => {
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const toTimeString = (locales = "en", expireTimeFormat: DateTime) => {
    if (locales === "vi") return expireTimeFormat.setLocale("vi").toFormat("dd 'tháng' MM, yyyy");
    return expireTimeFormat.toFormat("MMMM dd, yyyy");
};

export const getOperatorSymbol = (value: number) => {
    if (value >= 0) return "+";
    return "";
};

export const addCommas = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const mapFilterToParams = (filter: FilterBookType): FilterBookParams => {
    const rare = filter?.rare?.map((rare) => RareEnum[rare as keyof typeof RareEnum]);
    const variant = filter?.variant?.map(
        (variant) => VariantEnum[variant as keyof typeof VariantEnum]
    );
    const availability = filter?.availability?.map(
        (availability) => AvailabilityEnum[availability as keyof typeof AvailabilityEnum]
    );
    const format = filter?.format?.map((format) => FormatEnum[format as keyof typeof FormatEnum]);

    const params: FilterBookParams = {
        priceRange: filter?.price?.join(","),
        rare,
        variant,
        availability,
        format,
    };

    return params;
};

export const validateCoupon = (cartTotalValue: number, coupons: Coupon[]) => {
    const today = DateTime.now();
    return coupons.map((coupon) => {
        const errorMessage: string[] = [];

        if (coupon.used >= coupon.quantity) {
            errorMessage.push("error.coupon.outOfUses");
        }

        if (errorMessage.length === 0 && coupon.min_price > cartTotalValue) {
            errorMessage.push("error.coupon.minPrice");
        }

        if (errorMessage.length === 0 && today > DateTime.fromISO(coupon.expired_at)) {
            errorMessage.push("error.coupon.expired");
        }

        if (errorMessage.length === 0) {
            return {
                ...coupon,
                discountValue: Math.min(
                    coupon.type === 1 ? coupon.discount : (coupon.discount * cartTotalValue) / 100,
                    coupon.max_discount
                ),
            };
        }

        return {
            ...coupon,
            errorMessage: errorMessage[0],
        };
    });
};

export const getMinDateDelivery = () => {
    const dateX = dayjs();

    if (dateX.hour() >= 12) return dateX.add(2, "day");
    return dateX.add(1, "day");
};

export const getTotalPrice = (listItemEps: ItemEpsType[]) => {
    let totalPrice = 0;
    listItemEps.forEach((item) => {
        totalPrice += item.current_price;
    });
    return totalPrice;
};

export const getTotalCartValue = (cartItems: CartData) => {
    let total = 0;
    for (const book_id in cartItems) {
        const { eps } = cartItems[book_id];
        total += getTotalPrice(eps);
    }
    return total;
};

export const getItemEpsIds = (cartItems: CartData) => {
    const itemEpsIds = Object.values(cartItems).flatMap((item) => item.eps.map((eps) => eps.id));
    return Array.from(new Set(itemEpsIds));
};

export const listToMap = <T extends { id: number }>(list: T[]): Record<string, T> => {
    return list.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {} as Record<string, T>);
};

export const getCartItemPriceChange = (props: {
    cartItems: CartData;
    itemEpsIdWithPrice: {
        current_price: number;
        id: number;
    }[];
}): CartData => {
    const { cartItems, itemEpsIdWithPrice } = props;
    const changedPriceCartItems: CartData = {};
    const mapItemEpsIdWithPrice = listToMap(itemEpsIdWithPrice);

    for (const cartId in cartItems) {
        const { eps } = cartItems[cartId];
        let isPriceChanged = false;
        const changedPriceEps = eps.map((eps) => {
            const newPrice = mapItemEpsIdWithPrice[eps.id]?.current_price;
            if (newPrice && newPrice !== eps.current_price) {
                isPriceChanged = true;
                return { ...eps, current_price: newPrice };
            }
            return eps;
        });

        if (isPriceChanged) {
            changedPriceCartItems[cartId] = { ...cartItems[cartId], eps: changedPriceEps };
        }
    }

    return changedPriceCartItems;
};

export const getCartItemWeight = (itemEps: ItemEpsType[]) => {
    let weight = 0;
    itemEps.forEach((item) => {
        weight += item.weight;
    });
    return weight;
};

export const getCartWeight = (cartItems: CartData) => {
    let weight = 0;
    for (const book_id in cartItems) {
        const { book, eps } = cartItems[book_id];
        if (book.weight) weight += parseInt(book.weight) * eps.length;
    }
    return weight;
};

export const getCartMainInfo = (cartItems: CartData) => {
    const cartMainInfo: any = {};

    for (const cartId in cartItems) {
        const { book, eps } = cartItems[cartId];
        cartMainInfo[cartId] = {
            book_id: book.id,
            title: book.title,
            eps: eps.map((eps) => ({
                id: eps.id,
                eps_no: eps.eps_no,
                price: eps.current_price,
            })),
        };
    }

    return cartMainInfo;
};

export const getPriceFilterFromParams = (
    priceRange: string | null
): [number, number] | undefined => {
    if (!priceRange) return undefined;
    const [min, max] = priceRange.split(",");
    return [parseInt(min), parseInt(max)];
};
