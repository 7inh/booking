import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ComponentProps } from "react";
import { useSnackbarContext } from "src/contexts/SnackbarContext";

export interface SnackbarData {
    message: string;
    severity: ComponentProps<typeof MuiAlert>["severity"];
    id: string;
}

const mapBgColor = {
    error: "#D72323", // Match with main red
    warning: "#FF9600", // Match with dark orange
    info: "#0065FF", // Match with main blue
    success: "#4CAF50", // Softer green
};

function SnackBarStack(): JSX.Element {
    const { snackbars, removeSnackbar } = useSnackbarContext();

    return (
        <>
            {snackbars.map((snackbar, idx) => (
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    key={snackbar.id}
                    open={true}
                    autoHideDuration={5000}
                    onClose={(_e, reason) => {
                        if (reason === "clickaway") return;
                        removeSnackbar(snackbar.id);
                    }}
                    sx={{
                        marginBottom: 7 * idx,
                    }}
                >
                    <MuiAlert
                        onClose={() => removeSnackbar(snackbar.id)}
                        severity={snackbar.severity}
                        sx={{
                            width: "100%",
                            bgcolor: snackbar.severity ? mapBgColor[snackbar.severity] : "",
                        }}
                        variant="filled"
                    >
                        {snackbar.message}
                    </MuiAlert>
                </Snackbar>
            ))}
        </>
    );
}

export default SnackBarStack;
