import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import theme from "src/common/theme";
import ErrorBoundaryWrapper from "src/components/ErrorBoundary/ErrorBoundary";
import PageError403 from "src/pages/Error/403";
import PageError404 from "src/pages/Error/404";
import PageError500 from "src/pages/Error/500";
import Landing from "src/pages/Landing/Landing";
import NavProvider from "src/providers/NavProvider";
import SnackbarProvider from "src/providers/SnackbarProvider";
import TranslationProvider from "src/providers/TranslationProvider";
import UnsavedChangesProvider from "src/providers/UnsavedChangesProvider";
import "./index.css";

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        element: <ErrorBoundaryWrapper />,
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "/500",
                element: <PageError500 />,
            },
            {
                path: "/403",
                element: <PageError403 />,
            },
            {
                path: "*",
                element: <PageError404 />,
            },
        ],
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <UnsavedChangesProvider>
                    <TranslationProvider>
                        <SnackbarProvider>
                            <NavProvider>
                                <RouterProvider router={router} />
                            </NavProvider>
                        </SnackbarProvider>
                    </TranslationProvider>
                </UnsavedChangesProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root") as HTMLElement
);
