import { Box, BoxProps, Link } from "@mui/material";
import SvgColor, { SvgColorProps } from "src/components/SvgColor/SvgColor";

export const IconProfile = () => {
    return <SvgColor src="/icons/profile.svg" />;
};

export const IconKnowledgeBase = () => {
    return <SvgColor src="/icons/knowledge-base.svg" />;
};

export const IconTestBot = () => {
    return <SvgColor src="/icons/test-bot.svg" />;
};

export interface IconPublishedProps extends BoxProps {}
export const IconPublished = ({ sx, ...props }: BoxProps) => {
    return (
        <Box
            sx={{
                width: "16px",
                height: "16px",
                background: "url(/icons/published.svg) no-repeat center",
                backgroundSize: "cover",
                ...sx,
            }}
            {...props}
        />
    );
};

export const IconDelete = ({ sx, ...props }: Pick<BoxProps, "sx" | "className" | "onClick">) => {
    return (
        <SvgColor
            sx={{
                width: "16px",
                height: "16px",
                ...sx,
            }}
            src={"/icons/delete.svg"}
            {...props}
        />
    );
};

export const IconEdit = ({ sx, ...props }: Pick<BoxProps, "sx" | "onClick">) => {
    return (
        <SvgColor
            sx={{
                width: "16px",
                height: "16px",
                ...sx,
            }}
            src={"/icons/edit.svg"}
            {...props}
        />
    );
};

export const IconSearchOutline = () => {
    return <SvgColor src={"/icons/search-outline.svg"} />;
};

export const IconKCoin = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/point.svg"}
            {...props}
        />
    );
};

export const MenuIcon = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "20px",
                height: "20px",
                ...sx,
            }}
            src={"/icons/menu_icon.svg"}
            {...props}
        />
    );
};

export const IconDownload = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/download.svg"}
            {...props}
        />
    );
};

export const IconStar = ({
    onClick,
    onMouseEnter,
    onMouseLeave,
    sx,
    ...props
}: Pick<SvgColorProps, "sx" | "onClick" | "onMouseEnter" | "onMouseLeave">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/star.svg"}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...props}
        />
    );
};

export const IconMessage = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "20px",
                height: "20px",
                ...sx,
            }}
            src={"/icons/message.svg"}
            {...props}
        />
    );
};

export const IconMessageV2 = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "20px",
                height: "20px",
                ...sx,
            }}
            src={"/icons/messagev2.svg"}
            {...props}
        />
    );
};

export const IconFilter = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "20px",
                height: "20px",
                ...sx,
            }}
            src={"/icons/filter.svg"}
            {...props}
        />
    );
};

export const IconAccount = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "20px",
                height: "20px",
                ...sx,
            }}
            src={"/icons/account.svg"}
            {...props}
        />
    );
};

export const IconSignOut = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "24px",
                height: "24px",
                ...sx,
            }}
            src={"/icons/signout.svg"}
            {...props}
        />
    );
};

export const IconProductChecked = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "14px",
                height: "14px",
                color: "#FF845C",
                padding: 0,
                ...sx,
            }}
            src={"/icons/product_checked.svg"}
            {...props}
        />
    );
};

export interface SocialIconProps extends Pick<SvgColorProps, "sx"> {
    name: string;
    href?: string;
}

export const SocialIcon = ({ name, href, sx, ...props }: SocialIconProps) => {
    const icon = (
        <SvgColor
            sx={{
                width: "20px",
                height: "20px",
                ...sx,
            }}
            src={`/icons/social/${name}.svg`}
            {...props}
        />
    );

    if (href) {
        return (
            <Link
                href={href}
                target="_blank"
                sx={{
                    color: "black !important",
                    display: "flex",
                }}
            >
                {icon}
            </Link>
        );
    }

    return icon;
};

export const IconFeedBack = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "20px",
                height: "20px",
                ...sx,
            }}
            src={"/icons/feedback.svg"}
            {...props}
        />
    );
};

export const IconShare = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/share.svg"}
            {...props}
        />
    );
};

export const IconLink = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/link.svg"}
            {...props}
        />
    );
};

export const IconPlus = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            src={"/icons/plus.svg"}
            {...props}
        />
    );
};

export const IconSubscription = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            src={"/icons/subscription.svg"}
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            {...props}
        />
    );
};

export const IconHistory = ({ sx, ...props }: Pick<SvgColorProps, "sx">) => {
    return (
        <SvgColor
            src={"/icons/history.svg"}
            sx={{
                width: "18px",
                height: "18px",
                ...sx,
            }}
            {...props}
        />
    );
};
