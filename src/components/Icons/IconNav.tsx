import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import SvgColor, { SvgColorProps } from "src/components/SvgColor/SvgColor";

export const IconHome = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/navbar/home.svg"}
            {...props}
        />
    );
};

export const IconCreateBot = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/navbar/create-bot.svg"}
            {...props}
        />
    );
};

export const IconManagement = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/navbar/management.svg"}
            {...props}
        />
    );
};

export const IconOrganization = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/navbar/workspace.svg"}
            {...props}
        />
    );
};

export const IconLibrary = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/navbar/library.svg"}
            {...props}
        />
    );
};

export const IconGiftCode = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/navbar/gift-code.svg"}
            {...props}
        />
    );
};

export const IconChat = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/navbar/chat.svg"}
            {...props}
        />
    );
};

export const IconBuyPoint = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/navbar/buy-point.svg"}
            {...props}
        />
    );
};

export const IconSendFeedback = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/navbar/feedback.svg"}
            {...props}
        />
    );
};

export const IconManualDocument = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                ...sx,
            }}
            src={"/icons/navbar/manual-document.svg"}
            {...props}
        />
    );
};

const ICONS = {
    dashboard: <IconHome sx={{ width: 22, height: 22 }} />,
    bot: <IconCreateBot sx={{ width: 30, height: 30 }} />,
    chat: <IconChat sx={{ width: 22, height: 22 }} />,
    management: <IconManagement sx={{ width: 22, height: 22 }} />,
    organization: <IconOrganization sx={{ width: 22, height: 22 }} />,
    kamiStore: <IconLibrary sx={{ width: 25, height: 25 }} />,
    giftCode: <IconGiftCode sx={{ width: 22, height: 22 }} />,
    review: <InventoryTwoToneIcon sx={{ width: 24, height: 24 }} />,
    buyKpoint: <IconBuyPoint sx={{ width: 24, height: 24 }} />,
    sendFeedback: <IconSendFeedback sx={{ width: 24, height: 24 }} />,
    manualDocument: <IconManualDocument sx={{ width: 24, height: 24 }} />,
};

export default ICONS;
