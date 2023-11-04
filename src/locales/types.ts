export type LangType = {
    currentLanguage: string;
    nav: {
        home: string;
        shop: string;
        about: string;
        contact: string;
    };
    common: {
        cart: string;
        send: string;
    };
    pages: {
        home: {
            branding: {
                title: string;
                subTitle: string;
                button: string;
            };
        };
    };
    footer: {
        thanks: string;
        subscribe: string;
        copyRight: string;
        terms: string;
    };
};

export type LocaleType = "en" | "vi";
export const ListLocale: LocaleType[] = ["en", "vi"];
