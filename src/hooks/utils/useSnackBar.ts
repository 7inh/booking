import { useCallback } from "react";
import { MyCustomEventDetail } from "src/common/types";
import { useSnackbarContext } from "src/contexts/SnackbarContext";
import { v4 as uuidv4 } from "uuid";

const useSnackBar = () => {
    const { addSnackbar } = useSnackbarContext();

    return useCallback(
        ({ message, severity }: MyCustomEventDetail) => {
            addSnackbar({
                id: uuidv4(),
                message,
                severity,
            });
        },
        [addSnackbar]
    );
};

export default useSnackBar;
