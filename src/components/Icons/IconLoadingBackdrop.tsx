import { Backdrop } from "@mui/material";
import "./IconLoadingBackdrop.css";

const IconLoadingBackdrop = ({ open = true, zIndex }: { open?: boolean; zIndex?: number }) => {
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

export default IconLoadingBackdrop;
