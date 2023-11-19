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
    success: {
        addToCart: string;
    };
    error: {
        somethingWentWrong: string;
    };
    message: {
        backToHome: string;
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
        totalCart: string;
        checkout: string;
        emptyCart: string;
        updating: string;
    };
    pages: {
        home: {
            title: string;
            branding: {
                title: string;
                subTitle: string;
                button: string;
            };
        };
        shop: {
            title: string;
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
                formatList: {
                    paperback: string;
                    hardcover: string;
                };
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
            title: string;
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
        cart: {
            title: string;
            yourCart: string;
            billInfo: string;
            subTotal: string;
            shipping: string;
            total: string;
            processToCheckout: string;
        };
        checkout: {
            title: string;
            checkoutInfo: string;
            form: {
                name: string;
                email: string;
                phone: string;
                address: string;
                note: string;
            };
            submit: string;
        };
        about: {
            title: string;
            whatWeAre: {
                title: string;
                content: string;
            };
        };
        contact: {
            title: string;
            form: {
                name: string;
                email: string;
                subject: string;
                message: string;
                submit: string;
            };
            submit: string;
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
