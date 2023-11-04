import { useTranslationContext } from "src/contexts/TranslationContext";

const useTranslation = () => {
    const { translate } = useTranslationContext();
    return translate;
};

export default useTranslation;
