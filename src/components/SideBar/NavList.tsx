import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import NavItem from "src/components/SideBar/NavItem";
import { NavConfigProps, NavListProps } from "src/components/SideBar/types";
import useActivePath from "src/hooks/utils/useActivePath";

type NavListRootProps = {
    data: NavListProps;
    depth: number;
    hasChild: boolean;
    config: NavConfigProps;
    openSideBar: boolean;
};

export default function NavList({ data, depth, hasChild, config, openSideBar }: NavListRootProps) {
    const active = useActivePath(data.path);

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <NavItem
                openSideBar={openSideBar}
                item={data}
                depth={depth}
                open={open}
                active={active}
                config={config}
                onClick={() => setOpen((prev) => !prev)}
            />

            {hasChild && (
                <Collapse in={open && openSideBar} unmountOnExit>
                    <NavSubList
                        data={data.children}
                        depth={depth}
                        config={config}
                        openSideBar={openSideBar}
                    />
                </Collapse>
            )}
        </>
    );
}

type NavListSubProps = {
    data: NavListProps[];
    depth: number;
    config: NavConfigProps;
    openSideBar: boolean;
};

function NavSubList({ data, depth, config, openSideBar }: NavListSubProps) {
    return (
        <>
            {data.map((list) => (
                <NavList
                    openSideBar={openSideBar}
                    key={list.title + list.path}
                    data={list}
                    depth={depth + 1}
                    hasChild={!!list.children}
                    config={config}
                />
            ))}
        </>
    );
}
