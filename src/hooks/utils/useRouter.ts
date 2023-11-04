import { useCallback } from "react";
import {
    useBeforeUnload as _useBeforeUnload,
    unstable_usePrompt as usePrompt,
} from "react-router-dom";
import useTranslation from "src/hooks/utils/useTranslation";

export default function useBeforeUnload(doBlock: boolean) {
    const t = useTranslation();

    _useBeforeUnload(
        useCallback(
            (e) => {
                if (doBlock) {
                    e.preventDefault();
                    return (e.returnValue = "");
                }
            },
            [doBlock]
        )
    );

    usePrompt({
        when: doBlock,
        message: t("message.unsavedChanges"),
    });
}
