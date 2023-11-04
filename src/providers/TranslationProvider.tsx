import { useCallback, useMemo, useState } from "react";
import { getLocale } from "src/common/utils";
import SnackBarStack from "src/components/SnackbarStack/SnackBarStack";
import { TranslationContext } from "src/contexts/TranslationContext";
import translations, { TranslateParams } from "src/locales/i18n";
import { LocaleType } from "src/locales/types";

interface TranslationProviderProps {
    children: React.ReactNode;
    initLocale?: LocaleType;
}

const TranslationProvider = ({ initLocale, children }: TranslationProviderProps) => {
    const [locale, setLocale] = useState<LocaleType>(initLocale || getLocale());

    const onChangeLanguage = useCallback((lang: LocaleType) => {
        localStorage.setItem("language", lang);
        setLocale(lang);
    }, []);

    const onTranslate = useCallback(
        (key: string, params?: TranslateParams) =>
            translations({
                locale,
                key,
                params,
            }),
        [locale]
    );

    const onExtendTranslation = useCallback(
        (locale: LocaleType, key: string) =>
            translations({
                locale,
                key,
            }),
        []
    );

    const value = useMemo(
        () => ({
            locale,
            setLocale: onChangeLanguage,
            translate: onTranslate,
            extendTranslation: onExtendTranslation,
        }),
        [locale, onChangeLanguage, onExtendTranslation, onTranslate]
    );

    return (
        <TranslationContext.Provider value={value}>
            <SnackBarStack />
            {children}
        </TranslationContext.Provider>
    );
};

export default TranslationProvider;
