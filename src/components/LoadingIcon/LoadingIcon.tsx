import { Backdrop } from "@mui/material";
import "./index.css";

const LoadingIcon = ({ open = true, zIndex }: { open?: boolean; zIndex?: number }) => {
    return (
        <Backdrop
            open={open}
            sx={{ color: "white", zIndex: zIndex || ((theme) => theme.zIndex.drawer + 1) }}
        >
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Backdrop>
    );
};

export default LoadingIcon;
