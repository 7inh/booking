import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createHashRouter } from "react-router-dom";
import theme from "src/common/theme";
import ErrorBoundaryWrapper from "src/components/ErrorBoundary/ErrorBoundary";
import MainLayout from "src/layouts/MainLayout";
import Book from "src/pages/Book/Book";
import Cart from "src/pages/Cart/Cart";
import CheckOut from "src/pages/CheckOut/CheckOut";
import PageError403 from "src/pages/Error/403";
import PageError404 from "src/pages/Error/404";
import PageError500 from "src/pages/Error/500";
import Landing from "src/pages/Landing/Landing";
import Shop from "src/pages/Shop/Shop";
import CartProvider from "src/providers/CartProvider";
import SnackbarProvider from "src/providers/SnackbarProvider";
import TranslationProvider from "src/providers/TranslationProvider";
import "./index.css";
import About from "src/pages/About/About";

const queryClient = new QueryClient();
const router = createHashRouter([
    {
        element: <ErrorBoundaryWrapper />,
        children: [
            {
                path: "/",
                element: (
                    <CartProvider>
                        <MainLayout />
                    </CartProvider>
                ),
                children: [
                    {
                        path: "/",
                        element: <Landing />,
                    },
                    {
                        path: "/shop",
                        element: <Shop />,
                    },
                    {
                        path: "/book/:id",
                        element: <Book />,
                    },
                    {
                        path: "/cart",
                        element: <Cart />,
                    },
                    {
                        path: "/about",
                        element: <About />,
                    },
                ],
            },
            {
                path: "/checkout",
                element: <CheckOut />,
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
                <TranslationProvider>
                    <SnackbarProvider>
                        <RouterProvider router={router} />
                    </SnackbarProvider>
                </TranslationProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root") as HTMLElement
);
