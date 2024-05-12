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
        sendMessage: string;
        sendEmailSubscribe: string;
        updateCart: string;
    };
    error: {
        somethingWentWrong: string;
        cantApplyCoupon: string;
        coupon: {
            expired: string;
            outOfUses: string;
            minPrice: string;
        };
        sendEmailSubscribe: string;
        netWorkError: string;
    };
    message: {
        backToHome: string;
        notFoundItem: string;
        freeShipForOrderOver: string;
        shippingFeeIsCalculatingPleaseInputYourAddress: string;
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
    dialog: {
        dialogSelectEps: {
            selectEps: string;
            selectEpsNote: string;
            cancelText: string;
            confirmText: string;
        };
        orderSuccess: {
            title: string;
            content: string;
            confirmText: string;
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
        detail: string;
        submitCoupon: string;
        buyMore: string;
        eps: string;
        edit: string;
        update: string;
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
                filterByPrice: string;
                clearFilterPrice: string;
                availability: string;
                availabilityList: {
                    available: string;
                    preOrder: string;
                    outOfStock: string;
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
                format: string;
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
                priceDesc: string;
                priceAsc: string;
                sale: string;
                discount: string;
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
            size: string;
            variant: string;
            rare: string;
            quantity: string;
            sold: string;
            author: string;
            soldOut: string;
            epsNum: string;
        };
        cart: {
            title: string;
            yourCart: string;
            billInfo: string;
            subTotal: string;
            shipping: string;
            total: string;
            processToCheckout: string;
            coupon: string;
            discountValue: string;
            temporary: string;
            shippingFeeCanBeChanged: string;
            couponDescription: string;
            selectedEps: string;
        };
        checkout: {
            title: string;
            checkoutInfo: string;
            form: {
                name: string;
                email: string;
                phone: string;
                province: string;
                district: string;
                ward: string;
                address: string;
                date: string;
                note: string;
                deliveryService: string;
            };
            rules: {
                required: string;
                phone: string;
            };
            asSoonAsPossible: string;
            submit: string;
            deliveryService: {
                vcn: string;
                vtk: string;
            };
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
            formValidation: {
                name: string;
                email: string;
                subject: string;
                message: string;
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
