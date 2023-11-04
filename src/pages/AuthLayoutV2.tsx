import { Avatar, Box, Grid, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuHelp from "src/components/Menus/MenuHelp";
import SelectLanguage from "src/components/Selects/SelectLanguage";
import SvgColor from "src/components/SvgColor/SvgColor";

const AuthLayoutV2 = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery("(max-width: 1000px)");

    useEffect(() => {
        if (
            localStorage.getItem("token") &&
            (location.pathname === "/auth/signup" || location.pathname === "/auth/login")
        ) {
            navigate("/");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (
        location.pathname === "/auth/forgot-password" ||
        location.pathname === "/auth/verify-account"
    ) {
        return (
            <Box
                height="100vh"
                flexGrow={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:before": {
                        content: "''",
                        position: "absolute",
                        width: "400px",
                        height: "400px",
                        borderRadius: "100%",
                        backgroundColor: "#64CD87",
                        bottom: "-200px",
                        right: "-200px",
                        filter: "blur(200px)",
                    },
                    "&:after": {
                        content: "''",
                        position: "absolute",
                        width: "400px",
                        height: "400px",
                        borderRadius: "100%",
                        backgroundColor: "#66E9DF",
                        top: "-200px",
                        left: "-200px",
                        filter: "blur(200px)",
                    },
                }}
            >
                <Box
                    sx={{
                        position: "fixed",
                        zIndex: 1000,
                        bottom: 20,
                        left: 20,
                        width: "160px",
                    }}
                >
                    <SelectLanguage />
                </Box>
                <Avatar
                    src="/svgs/ForgotPassword.svg"
                    sx={{ width: "100%", height: "265px", pt: 10 }}
                    imgProps={{ style: { objectFit: "contain" } }}
                ></Avatar>
                <Outlet />
            </Box>
        );
    }

    return (
        <>
            <Box display="flex" position="relative" height="100vh">
                {!isSmallScreen ? (
                    <Grid
                        item
                        flexGrow={1}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:before": {
                                content: "''",
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                background: "url(/signin_bg.jpeg) no-repeat",
                                backgroundSize: "auto 140%",
                                backgroundPosition: "55% 0%",
                                zIndex: -2,
                            },
                            "&:after": {
                                content: "''",
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                backdropFilter: "blur(30px)",
                                zIndex: -1,
                            },
                        }}
                    >
                        {location.pathname === "/auth/signup" ? (
                            <Avatar
                                src="/svgs/CreateAccount.svg"
                                sx={{ width: "400px", height: "100%" }}
                                imgProps={{ style: { objectFit: "contain" } }}
                            ></Avatar>
                        ) : (
                            <>
                                <SvgColor
                                    sx={{
                                        width: "300px",
                                        height: "300px",
                                        color: "#fff",
                                    }}
                                    src="/logo_kamimind.svg"
                                />
                                <br />
                            </>
                        )}
                    </Grid>
                ) : null}
                <Box
                    width="100%"
                    maxWidth="450px"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        mx: "auto",
                        ...(!isSmallScreen
                            ? {
                                  overflow: "auto",
                                  height: "100vh",
                              }
                            : {}),
                    }}
                >
                    <Box
                        sx={{
                            pt: 10,
                            px: 5,
                            flexGrow: 1,
                        }}
                    >
                        <Outlet />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mx: 3,
                            mt: 3,
                            pb: 3,
                            zIndex: 1000,
                        }}
                    >
                        <Box
                            sx={{
                                width: "160px",
                            }}
                        >
                            {isSmallScreen ? <SelectLanguage /> : null}
                        </Box>
                        <MenuHelp />
                    </Box>
                </Box>
                {!isSmallScreen ? (
                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                            p: 2,
                            width: "160px",
                        }}
                    >
                        <SelectLanguage />
                    </Box>
                ) : null}
            </Box>
        </>
    );
};

export default AuthLayoutV2;
