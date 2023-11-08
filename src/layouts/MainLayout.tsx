import { Outlet } from "react-router-dom";
import AppBar from "src/components/Appbar/Appbar";
import Navbar from "src/components/Navbar/Navbar";

const MainLayout = () => {
    return (
        <>
            <AppBar />
            <Navbar />
            <Outlet />
        </>
    );
};

export default MainLayout;
