import { memo } from "react";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import NavList from "src/components/SideBar/NavList";
import { NavConfigProps, NavListProps, NavSectionProps } from "src/components/SideBar/types";
import { navVerticalConfig } from "src/components/SideBar/utlis";
import { useNavContext } from "src/contexts/NavContext";

function NavSectionVertical({ data, config, sx, ...other }: NavSectionProps) {
    const { open: openSideBar } = useNavContext();

    return (
        <Stack sx={sx} {...other}>
            {data.map((group, index) => (
                <Group
                    openSideBar={openSideBar}
                    key={group.subheader || index}
                    subheader={group.subheader}
                    items={group.items}
                    config={navVerticalConfig(config)}
                />
            ))}
        </Stack>
    );
}

export default memo(NavSectionVertical);

type GroupProps = {
    subheader: string;
    items: NavListProps[];
    config: NavConfigProps;
    openSideBar: boolean;
};

function Group({ items, config, openSideBar }: GroupProps) {
    const renderContent = items.map((list) => (
        <NavList
            openSideBar={openSideBar}
            key={list.title + list.path}
            data={list}
            depth={1}
            hasChild={!!list.children}
            config={config}
        />
    ));

    return (
        <List disablePadding sx={{ px: openSideBar ? 1 : 0 }}>
            {renderContent}
        </List>
    );
}
