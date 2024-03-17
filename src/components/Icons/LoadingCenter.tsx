import { CircularProgress } from "@mui/material";
import BoxCenter from "src/components/Boxs/BoxCenter";

export interface LoadingCenterProps {}

const LoadingCenter = (props: LoadingCenterProps) => {
    return (
        <BoxCenter
            sx={{
                py: 5,
            }}
        >
            <CircularProgress {...props} />
        </BoxCenter>
    );
};

export default LoadingCenter;
