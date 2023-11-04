// @mui
import { BreadcrumbsProps } from "@mui/material/Breadcrumbs";

// ----------------------------------------------------------------------

export type BreadcrumbsLinkProps = {
    name?: string;
    href?: string;
    icon?: React.ReactElement;
    color?: string;
};

export interface CustomBreadcrumbsProps extends BreadcrumbsProps {
    heading?: string | React.ReactNode;
    moreLink?: string[];
    activeLast?: boolean;
    action?: React.ReactNode;
    links: BreadcrumbsLinkProps[];
}
