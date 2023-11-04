import { ButtonProps } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import Iconify from "src/components/Iconify/Iconify";

export interface CreateButtonProps extends ButtonProps {
    onClick: (event?: any) => void;
    label: string;
}

const CreateButton = (props: CreateButtonProps) => {
    const { label, onClick, ...rest } = props;

    return (
        <ButtonBase
            label={label}
            onClick={onClick}
            startIcon={<Iconify icon="mingcute:add-line" />}
            {...rest}
        >
            {label}
        </ButtonBase>
    );
};

export default CreateButton;
