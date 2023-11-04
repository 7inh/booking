import { createContext, useContext } from "react";
import { TranslateParams } from "src/locales/i18n";
import { LocaleType } from "src/locales/types";

interface TranslationContextProps {
    locale: LocaleType;
    setLocale: (locale: LocaleType) => void;
    translate: (key: string, params?: TranslateParams) => string;
    extendTranslation: (locale: LocaleType, key: string) => void;
}

const TranslationContext = createContext<TranslationContextProps>({
    locale: "en",
    setLocale: () => {},
    translate: () => "",
    extendTranslation: () => {},
});

TranslationContext.displayName = "TranslationContext";

const useTranslationContext = () => useContext(TranslationContext);

export { TranslationContext, useTranslationContext };
