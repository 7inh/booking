import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ComponentProps } from "react";
import { useSnackbarContext } from "src/contexts/SnackbarContext";

export interface SnackbarData {
    message: string;
    severity: ComponentProps<typeof MuiAlert>["severity"];
    id: string;
}

function SnackBarStack(): JSX.Element {
    const { snackbars, removeSnackbar } = useSnackbarContext();

    return (
        <>
            {snackbars.map((snackbar, idx) => (
                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    key={snackbar.id}
                    open={true}
                    autoHideDuration={5000}
                    onClose={(_e, reason) => {
                        if (reason === "clickaway") return;
                        removeSnackbar(snackbar.id);
                    }}
                    sx={{
                        marginTop: 7 * idx,
                    }}
                >
                    <MuiAlert
                        onClose={() => removeSnackbar(snackbar.id)}
                        severity={snackbar.severity}
                        sx={{ width: "100%" }}
                    >
                        {snackbar.message}
                    </MuiAlert>
                </Snackbar>
            ))}
        </>
    );
}

export default SnackBarStack;
