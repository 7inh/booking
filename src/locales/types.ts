export type LangType = {
    currentLanguage: string;
    nav: {
        home: string;
        shop: string;
        about: string;
        contact: string;
    };
    broadcast: {
        popularCollection: {
            title: string;
            subTitle: string;
        };
        newestCollection: {
            title: string;
            subTitle: string;
        };
        upcomingCollection: {
            title: string;
            subTitle: string;
        };
    };
    feature: {
        delivery: {
            title: string;
            subTitle: string;
        };
        quality: {
            title: string;
            subTitle: string;
        };
        service: {
            title: string;
            subTitle: string;
        };
    };
    common: {
        cart: string;
        send: string;
        addToCart: string;
        buyNow: string;
        filter: string;
        page: string;
    };
    pages: {
        home: {
            branding: {
                title: string;
                subTitle: string;
                button: string;
            };
        };
        shop: {
            filter: {
                price: string;
                availability: string;
                availabilityList: {
                    available: string;
                    preOrder: string;
                };
                variant: string;
                variantList: {
                    once: string;
                    combo: string;
                    fullSet: string;
                };
                rare: string;
                rareList: {
                    normal: string;
                    special: string;
                    limited: string;
                    collection: string;
                };
                range: string;
            };
            result: {
                showItemsOf: string;
            };
            order: {
                newest: string;
                oldest: string;
                priceHighToLow: string;
                priceLowToHigh: string;
            };
        };
        book: {
            detail: string;
            publisher: string;
            publishDate: string;
            language: string;
            format: string;
            pages: string;
            height: string;
            width: string;
            length: string;
            weight: string;
            availability: string;
            dimensions: string;
            variant: string;
            rare: string;
            quantity: string;
            sold: string;
            author: string;
        };
        p404: {
            title: string;
            subTitle: string;
            button: string;
        };
    };
    footer: {
        thanks: string;
        contact: string;
        subscribe: string;
        subscribeDescription: string;
        copyRight: string;
        terms: string;
    };
};

export type LocaleType = "en" | "vi";
export const ListLocale: LocaleType[] = ["en", "vi"];
