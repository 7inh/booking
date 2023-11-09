import { Outlet } from "react-router-dom";
import AppBar from "src/components/Appbar/Appbar";
import Footer from "src/components/Footer/Footer";
import Navbar from "src/components/Navbar/Navbar";

const MainLayout = () => {
    return (
        <>
            <AppBar />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
