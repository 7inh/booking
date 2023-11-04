import { en } from "src/locales/langs/en";
import { LangType, LocaleType } from "src/locales/types";
import get from "lodash/get";
import { vi } from "src/locales/langs/vi";

const translations: Record<LocaleType, LangType> = {
    en,
    vi,
};

export type TranslateParams = {
    [key: string]: string | number;
};

const translate = ({
    key,
    locale,
    params,
}: {
    key: string;
    locale: LocaleType;
    params?: TranslateParams;
}): string => {
    const translatedText = get(translations, `${locale}.${key}`, key);
    if (params) {
        return Object.keys(params).reduce((acc, paramKey) => {
            const paramValue = params[paramKey];
            return acc.replace(`%{${paramKey}}`, paramValue.toString());
        }, translatedText);
    }
    if (typeof translatedText !== "string" || translatedText === "") {
        return key;
    }
    return translatedText;
};

export default translate;
