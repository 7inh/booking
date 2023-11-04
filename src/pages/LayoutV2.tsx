import Box from "@mui/material/Box";
import { useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import Main from "src/components/Main/Main";
import SideBarV2 from "src/components/SideBar/SideBarV2";
import { useAccountContext } from "src/contexts/AccountContext";
import { useUnsavedChangesContext } from "src/contexts/UnsavedChangesContext";
import useRefreshToken from "src/hooks/useRefreshToken";
import usePrevious from "src/hooks/utils/usePrevious";
import useBeforeUnload from "src/hooks/utils/useRouter";

const Layout = () => {
    const location = useLocation();
    const { user } = useAccountContext();
    const { shouldBlock, setShouldBlock } = useUnsavedChangesContext();

    const fullPath = location.pathname + location.search;
    const previousLocationPathname = usePrevious(fullPath);
    const isChangingRoute = fullPath !== previousLocationPathname;

    useRefreshToken();
    useBeforeUnload(shouldBlock);

    useEffect(() => {
        if (shouldBlock && isChangingRoute) {
            setShouldBlock(false);
        }
    }, [isChangingRoute, setShouldBlock, shouldBlock]);

    const renderNavVertical = useMemo(() => {
        if (location.pathname.includes("/auth")) {
            return null;
        }

        return <SideBarV2 />;
    }, [location.pathname]);

    const renderMain = useMemo(() => {
        return (
            <Main>
                <Outlet />
            </Main>
        );
    }, []);

    const renderPage = useMemo(() => {
        return user.userToken ? (
            <Box
                sx={{
                    display: { lg: "flex" },
                    height: "100vh",
                }}
            >
                {renderNavVertical}
                {renderMain}
            </Box>
        ) : (
            <LoadingIcon open={true} />
        );
    }, [renderMain, renderNavVertical, user]);

    return <>{renderPage}</>;
};

export default Layout;
