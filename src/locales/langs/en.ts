import { LangType } from "src/locales/types";

export const en: LangType = {
    currentLanguage: "English",
    nav: {
        home: "Home",
        shop: "Shop",
        about: "About",
        contact: "Contact",
    },
    broadcast: {
        popularCollection: {
            title: "Popular",
            subTitle: "List of the most popular books",
        },
        newestCollection: {
            title: "Newest",
            subTitle: "List of the latest book releases",
        },
        upcomingCollection: {
            title: "Upcoming",
            subTitle: "List of upcoming book releases",
        },
    },
    success: {
        addToCart: "Add to cart successfully",
        sendMessage: "Send message successfully",
        sendEmailSubscribe: "Subscribe successfully",
    },
    error: {
        somethingWentWrong: "Something went wrong",
        cantApplyCoupon: "Can't apply coupon",
        coupon: {
            expired: "Coupon has expired",
            outOfUses: "Coupon has run out of uses",
            minPrice: "Minimum order value is %{minPrice}",
        },
        sendEmailSubscribe: "Can't subscribe, please try again later",
    },
    message: {
        backToHome: "Back to home page",
        notFoundItem: "No matching products found",
        freeShipForOrderOver: "Free shipping for orders over %{price}",
    },
    feature: {
        delivery: {
            title: "Door-to-Door Delivery",
            subTitle: "We offer nationwide delivery services.",
        },
        quality: {
            title: "Quality",
            subTitle: "Committed to providing the best quality products.",
        },
        service: {
            title: "Dedication",
            subTitle: "Satisfying customers is our motto",
        },
    },
    dialog: {
        orderSuccess: {
            title: "Order success",
            content: "We will contact you as soon as possible",
            confirmText: "Back to home page",
        },
    },
    common: {
        cart: "Cart",
        send: "Send",
        addToCart: "Add to cart",
        buyNow: "Buy now",
        filter: "Filter",
        page: "Page",
        totalCart: "Total",
        checkout: "Checkout",
        emptyCart: "Your cart is empty",
        updating: "Updating",
        detail: "Detail",
        submitCoupon: "Submit",
        buyMore: "Buy more",
    },
    pages: {
        home: {
            title: "Home",
            branding: {
                title: "Manga store online",
                subTitle: "Welcome to our store. A plethora of great books awaits you to explore.",
                button: "Explore Now",
            },
        },
        shop: {
            title: "Shop",
            filter: {
                price: "Price",
                availability: "Availability",
                availabilityList: {
                    available: "Available",
                    preOrder: "Pre-order",
                    outOfStock: "Out of stock",
                },
                variant: "Variant",
                variantList: {
                    once: "Once",
                    combo: "Combo",
                    fullSet: "Full set",
                },
                rare: "Rare",
                rareList: {
                    normal: "Normal",
                    special: "Special",
                    limited: "Limited",
                    collection: "Collection",
                },
                range: "to",
                format: "Format",
                formatList: {
                    paperback: "Paperback",
                    hardcover: "Hardcover",
                },
            },
            result: {
                showItemsOf: "Showing %{from}-%{to} of %{total} items",
            },
            order: {
                newest: "Newest",
                oldest: "Oldest",
                priceDesc: "Price: High to Low",
                priceAsc: "Price: Low to High",
                discount: "Discount",
                sale: "Sale",
            },
        },
        book: {
            title: "Book",
            detail: "Detail",
            publisher: "Publisher",
            availability: "Availability",
            format: "Format",
            height: "Height",
            language: "Language",
            length: "Length",
            pages: "Pages",
            publishDate: "Publish date",
            quantity: "Quantity",
            size: "Size",
            rare: "Rare",
            sold: "Sold",
            variant: "Variant",
            weight: "Weight",
            width: "Width",
            author: "Author",
            soldOut: "Sold Out",
        },
        cart: {
            title: "Cart",
            yourCart: "Your cart",
            billInfo: "Billing information",
            subTotal: "Subtotal",
            shipping: "Shipping fee",
            total: "Total",
            processToCheckout: "Process to checkout",
            coupon: "Coupon",
            discountValue: "Discount",
            temporary: "Temporary",
            shippingFeeCanBeChanged: "Shipping fee can be changed depending on your location",
            couponDescription: "Discount %{discount} max %{maxDiscount} for order over %{minPrice}",
        },
        checkout: {
            title: "Checkout",
            checkoutInfo: "Checkout information",
            form: {
                name: "Recipient name",
                email: "Email",
                phone: "Phone number",
                province: "Province",
                district: "District",
                ward: "Ward",
                address: "Address",
                date: "Date",
                note: "Note",
                deliveryService: "Delivery service",
            },
            rules: {
                required: "Please fill in this field",
                phone: "Invalid phone number",
            },
            asSoonAsPossible: "As soon as possible",
            submit: "Submit",
            deliveryService: {
                vcn: "Fast delivery",
                vtk: "Saving delivery",
            },
        },
        about: {
            title: "About",
            whatWeAre: {
                title: "What we are",
                content:
                    "We are a team passionate about comics. This passion is the driving force behind our desire to share it with you. Our goal is to offer the highest quality comic series at the most reasonable prices. We hope you have exciting experiences exploring our store. Your support and interest are not only a great source of motivation but also a crucial foundation for the existence of this website. We are committed to continuing to provide the best possible content and services. 🙏💖",
            },
        },
        contact: {
            title: "Contact",
            form: {
                name: "Name",
                email: "Email",
                subject: "Subject",
                message: "Message",
                submit: "Send message",
            },
            formValidation: {
                name: "Please enter your name",
                email: "Invalid email address",
                subject: "Please enter your subject",
                message: "Please enter your message",
            },
            submit: "Submit",
        },
        p404: {
            title: "404",
            subTitle: "Page not found",
            button: "Back to home page",
        },
    },
    footer: {
        thanks: "Sincere thanks for visiting our website. Your support and interest mean a lot to us. This website would not exist without your backing. We are committed to continually providing the best content and services. 🙏💖",
        contact: "Contact",
        subscribe: "Subscribe",
        subscribeDescription:
            "Subscribe to our newsletter, you will get the latest news and promotion.",
        copyRight: "© 2023, All rights reserved ",
        terms: "Terms of use",
    },
};
