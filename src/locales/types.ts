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
};

export type LocaleType = "en" | "vi";
export const ListLocale: LocaleType[] = ["en", "vi"];
