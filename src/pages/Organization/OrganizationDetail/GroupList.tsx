import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import CreateButton from "src/components/Buttons/CreateButton";
import CreateOrganizeGroupDialog from "src/components/Dialogs/CreateOrganizeGroupDialog";
import DeleteOrganizeGroupDialog from "src/components/Dialogs/DeleteOrganizeGroupDialog";
import EditGroupDialog from "src/components/Dialogs/EditGroupDialog";
import useDebounce from "src/hooks/utils/useDebounce";
import useTranslation from "src/hooks/utils/useTranslation";
import GroupCard from "src/pages/Organization/OrganizationDetail/Groups/GroupCard";

const GroupList = ({
    organizeId,
    groups,
    refetch,
    isAllowControlGroup,
}: {
    organizeId: string;
    groups: any[];
    refetch: () => void;
    isAllowControlGroup?: boolean;
}) => {
    const t = useTranslation();

    const [openCreateGroupDialog, setOpenCreateGroupDialog] = useState(false);
    const [openEditGroupDialog, setOpenEditGroupDialog] = useState(false);
    const [openDeleteGroupDialog, setOpenDeleteGroupDialog] = useState(false);
    const [currentSelectedGroup, setCurrentSelectedGroup] = useState<any | null>(null);
    const [search, setSearch] = useState("");
    const deferredSearch = useDebounce(search);

    const renderCreateGroupDialog = useMemo(() => {
        if (!isAllowControlGroup) return null;

        return openCreateGroupDialog ? (
            <CreateOrganizeGroupDialog
                organizeId={organizeId}
                open={openCreateGroupDialog}
                onClose={() => setOpenCreateGroupDialog(false)}
                onSuccess={() => refetch()}
            />
        ) : null;
    }, [isAllowControlGroup, openCreateGroupDialog, organizeId, refetch]);

    const renderEditGroupDialog = useMemo(() => {
        if (!isAllowControlGroup) return null;

        return openEditGroupDialog ? (
            <EditGroupDialog
                organizeId={organizeId}
                groupSelected={currentSelectedGroup}
                open={openEditGroupDialog}
                onClose={() => setOpenEditGroupDialog(false)}
                onSuccess={() => refetch()}
            />
        ) : null;
    }, [currentSelectedGroup, isAllowControlGroup, openEditGroupDialog, organizeId, refetch]);

    const renderDeleteGroupDialog = useMemo(() => {
        if (!isAllowControlGroup) return null;

        return openDeleteGroupDialog ? (
            <DeleteOrganizeGroupDialog
                open={openDeleteGroupDialog}
                organizeId={organizeId}
                groupSelected={currentSelectedGroup}
                onClose={() => setOpenDeleteGroupDialog(false)}
                onSuccess={() => {
                    setOpenDeleteGroupDialog(false);
                    refetch();
                }}
            />
        ) : null;
    }, [currentSelectedGroup, isAllowControlGroup, openDeleteGroupDialog, organizeId, refetch]);

    const renderToolbar = useMemo(() => {
        return (
            <Box display="flex" mb={2} justifyContent="space-between" alignItems="center">
                <TextField
                    sx={{
                        width: "500px",
                        "& fieldset": {
                            border: "1px solid rgba(145, 158, 171, 0.20)",
                            borderRadius: "8px",
                        },
                        "& label": {
                            color: "#919EAB",
                        },
                    }}
                    label={t("common.search")}
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                {isAllowControlGroup ? (
                    <Box display="flex" gap={1}>
                        <CreateButton
                            onClick={() => setOpenCreateGroupDialog(true)}
                            label={t("common.newGroup")}
                        />
                    </Box>
                ) : null}
            </Box>
        );
    }, [isAllowControlGroup, t]);

    const renderGroupList = useMemo(() => {
        const matchingGroups = groups.filter((group) => {
            return group.groupName.toLowerCase().includes(deferredSearch.toLowerCase());
        });

        return (
            <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 250px);"
                sx={{ gridGap: 20 }}
            >
                {matchingGroups.map((group) => (
                    <GroupCard
                        key={group.groupId}
                        organizeId={organizeId}
                        groupId={group.groupId}
                        name={group.groupName}
                        description={group.description}
                        avatar={group.avatar}
                        editable={isAllowControlGroup}
                        onOpenEditDialog={() => {
                            setCurrentSelectedGroup(group);
                            setOpenEditGroupDialog(true);
                        }}
                        onOpenDeleteDialog={() => {
                            setCurrentSelectedGroup(group);
                            setOpenDeleteGroupDialog(true);
                        }}
                    />
                ))}
            </Box>
        );
    }, [deferredSearch, groups, isAllowControlGroup, organizeId]);

    return (
        <>
            {renderCreateGroupDialog}
            {renderEditGroupDialog}
            {renderDeleteGroupDialog}
            {renderToolbar}
            {renderGroupList}
            <br />
        </>
    );
};

export default GroupList;
