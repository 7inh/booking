import Drawer from "@mui/material/Drawer";
import BoxBase from "src/components/Boxs/BoxBase";
import InputText from "src/components/Inputs/InputText";
import Logo from "src/components/Logo/Logo";
import CloseIcon from "@mui/icons-material/Close";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import Navbar from "src/components/Navbar/Navbar";
import SelectLanguage from "src/components/Selects/SelectLanguage";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface DrawerMenuProps {
    open: boolean;
    onClose: () => void;
}

export const DrawerMenu = (props: DrawerMenuProps) => {
    const { open, onClose } = props;

    const [, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <BoxBase p={1}>
                <BoxHorizon
                    mb={2}
                    mt={1}
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <Logo size="small" />
                    <CloseIcon
                        onClick={onClose}
                        sx={{
                            cursor: "pointer",
                        }}
                    />
                </BoxHorizon>
                <InputText
                    sx={{
                        width: "100%",
                        maxWidth: "500px",
                    }}
                    onSearch={(value) => {
                        navigate("/shop");
                        setSearchParams({ q: value });
                    }}
                />
                <BoxBase my={1}>
                    <Navbar direction="column" />
                </BoxBase>
                <SelectLanguage fullWidth />
            </BoxBase>
        </Drawer>
    );
};
