import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    BoxProps,
    Card,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import toArray from "lodash/toArray";
import { useCallback, useMemo, useState } from "react";
import { isRequestSuccessful } from "src/common/utils";
import AvatarUser from "src/components/Avatars/AvatarUser";
import CreateButton from "src/components/Buttons/CreateButton";
import AddUserIntoGroupDialog from "src/components/Dialogs/AddUserIntoGroupDialog";
import DialogDeleteV2 from "src/components/Dialogs/DialogDeleteV2";
import DialogUpdateUserRoleInGroup from "src/components/Dialogs/DialogUpdateUserRoleInGroup";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import useGetOrganizeMember from "src/hooks/useGetOrganizeMember";
import useRemoveUserFromOrgOrGroup from "src/hooks/useRemoveUserFromOrgOrGroup";
import useDebounce from "src/hooks/utils/useDebounce";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

export interface MemberListProps extends BoxProps {
    organizeId: string;
    groupId: string;
}

const MemberList = (props: MemberListProps) => {
    const { organizeId, groupId, ...rest } = props;

    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const [search, setSearch] = useState("");
    const debounceSearch = useDebounce(search);
    const [selectedMember, setSelectedMember] = useState<any[]>([]);
    const [openAddUserIntoGroupDialog, setOpenAddUserIntoGroupDialog] = useState(false);
    const [openDeleteMemberFromGroupDialog, setOpenDeleteMemberFromGroupDialog] = useState(false);
    const [openUpdateUserRolesDialog, setOpenUpdateUserRolesDialog] = useState(false);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSelectedMember, setCurrentSelectedMember] = useState<any | null>(null);

    const { data: members = [], refetch } = useGetOrganizeMember({
        organizeId,
        groupId,
    });

    const { mutateAsync: removeUser } = useRemoveUserFromOrgOrGroup({});

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: "avatar",
                headerName: "",
                width: 70,
                disableColumnMenu: true,
                sortable: false,
                renderCell: (params) => {
                    return (
                        <AvatarUser
                            avatar={params.row.userAvatar}
                            displayName={params.row.userName}
                        />
                    );
                },
            },
            {
                field: "userName",
                headerName: t("common.memberName"),
                minWidth: 200,
                disableColumnMenu: true,
                sortable: false,
                flex: 1,
            },
            {
                field: "email",
                headerName: "Email",
                minWidth: 200,
                disableColumnMenu: true,
                sortable: false,
                flex: 1,
            },
            {
                field: "verified",
                headerName: t("common.verified"),
                sortable: false,
                disableColumnMenu: true,
                renderCell: (params) => {
                    return params.row.verified ? (
                        <CheckCircleOutlineIcon color="success" />
                    ) : (
                        <CloseIcon color="error" />
                    );
                },
            },
            {
                field: "action",
                headerName: "Action",
                sortable: false,
                disableColumnMenu: true,
                renderCell: (params) => (
                    <IconButton onClick={(event) => handleClick(event, params.row)}>
                        <MoreVertRoundedIcon color="info" fontSize="small" />
                    </IconButton>
                ),
            },
        ],
        [t]
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, data: any) => {
        setAnchorEl(event.currentTarget);
        setCurrentSelectedMember(data);
        setSelectedMember([data.email]);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedMember([]);
        setCurrentSelectedMember(null);
    };

    const handleRemoveMember = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: any = await removeUser({
                organizeId,
                deleteOrganize: false,
                groupId,
                listDelete: selectedMember.length
                    ? toArray(selectedMember)
                    : [currentSelectedMember?.email],
            });

            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.removeMember"),
                    severity: "success",
                });
                refetch();
                setOpenDeleteMemberFromGroupDialog(false);
            } else {
                snackbar({
                    message: t("error.removeMember"),
                    severity: "error",
                });
            }
        } catch (error) {
            handleError(error);
        }
        setIsLoading(false);
    }, [
        currentSelectedMember?.email,
        groupId,
        handleError,
        organizeId,
        refetch,
        removeUser,
        selectedMember,
        snackbar,
        t,
    ]);

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
                    placeholder={t("common.email")}
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
                <Box display="flex" gap={1} flexShrink={0}>
                    <CreateButton
                        onClick={() => setOpenAddUserIntoGroupDialog(true)}
                        label={t("common.addMember")}
                    />
                </Box>
            </Box>
        );
    }, [t]);

    const renderTable = useMemo(
        () => (
            <DataGrid
                rows={members}
                columns={columns}
                columnVisibilityModel={{
                    groupId: false,
                }}
                filterModel={{
                    items: [
                        {
                            field: "email",
                            operator: "contains",
                            value: debounceSearch,
                        },
                    ],
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                getRowId={(row) => row.email}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowSelectionModelChange={(newSelection: any) => {
                    setSelectedMember(newSelection);
                }}
                rowSelectionModel={selectedMember}
                sx={{
                    "& .MuiDataGrid-footerContainer": {
                        marginTop: "-1px",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: selectedMember.length > 0 ? "rgb(255 233 228)" : "inherit",
                    },
                    "& .MuiDataGrid-selectedRowCount": {
                        opacity: 0,
                    },
                    "& .MuiDataGrid-overlayWrapper": {
                        minHeight: "calc(100vh - 350px)",
                    },
                }}
                disableRowSelectionOnClick
                disableColumnMenu
                localeText={{
                    MuiTablePagination: {
                        labelDisplayedRows: ({ from, to, count }) =>
                            t("common.rowFromToOf", {
                                from: from,
                                to: to,
                                count: count,
                            }),
                        labelRowsPerPage: t("common.rowsPerPage"),
                    },
                    noRowsLabel: t("common.noRowsData"),
                }}
            />
        ),
        [members, columns, debounceSearch, selectedMember, t]
    );

    const renderMenuActionOnClick = useMemo(() => {
        if (!currentSelectedMember) return null;

        const onDelete = () => {
            setOpenDeleteMemberFromGroupDialog(true);
            setAnchorEl(null);
        };

        const onUpdateRole = () => {
            setOpenUpdateUserRolesDialog(true);
            setAnchorEl(null);
        };

        return (
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            width: "fit-content",
                            boxShadow:
                                "0px 0px 0px 0px rgba(145, 158, 171, 0.12), 0px 0px 0px 0.5px rgba(145, 158, 171, 0.20)",
                            borderRadius: "16px 0 16px 16px",
                        },
                    },
                }}
            >
                <MenuItem onClick={onDelete}>
                    <Typography color="error">{t("common.deleteMember")}</Typography>
                </MenuItem>
                <MenuItem onClick={onUpdateRole} disabled={!currentSelectedMember?.verified}>
                    {t("common.updateRole")}
                </MenuItem>
            </Menu>
        );
    }, [anchorEl, currentSelectedMember, open, t]);

    const renderAddUserDialog = useMemo(() => {
        return (
            <AddUserIntoGroupDialog
                organizeId={organizeId}
                groupId={groupId}
                open={openAddUserIntoGroupDialog}
                onClose={() => setOpenAddUserIntoGroupDialog(false)}
                onSuccess={() => {
                    refetch();
                    setOpenAddUserIntoGroupDialog(false);
                }}
            />
        );
    }, [groupId, openAddUserIntoGroupDialog, organizeId, refetch]);

    const renderDeleteMemberFromGroup = useMemo(() => {
        return (
            <DialogDeleteV2
                open={openDeleteMemberFromGroupDialog}
                onClose={() => setOpenDeleteMemberFromGroupDialog(false)}
                onDelete={() => handleRemoveMember()}
                title={t("dialog.removeMemberFromGroup.title")}
                content={t("dialog.removeMemberFromGroup.content")}
            />
        );
    }, [handleRemoveMember, openDeleteMemberFromGroupDialog, t]);

    const renderUpdateUserRolesDialog = useMemo(() => {
        return (
            <DialogUpdateUserRoleInGroup
                organizeId={organizeId}
                groupId={groupId}
                email={currentSelectedMember?.email}
                open={openUpdateUserRolesDialog}
                onClose={() => setOpenUpdateUserRolesDialog(false)}
            />
        );
    }, [currentSelectedMember?.email, groupId, openUpdateUserRolesDialog, organizeId]);

    return (
        <Box width="100%" {...rest}>
            <LoadingIcon open={isLoading} zIndex={10000} />
            {renderAddUserDialog}
            {renderDeleteMemberFromGroup}
            {renderUpdateUserRolesDialog}
            {renderMenuActionOnClick}
            {renderToolbar}

            <Card
                sx={{
                    height: members.length > 0 ? "fit-content" : "calc(100vh - 250px)",
                    width: "100%",
                }}
                elevation={0}
            >
                <Box
                    position="relative"
                    sx={{
                        display: selectedMember.length > 0 ? "block" : "none",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            paddingY: 0.95,
                            zIndex: 1000,
                            borderTop: "1px solid #E0E0E0",
                            borderBottom: "1px solid #E0E0E0",
                            marginLeft: "51px",
                            display: "flex",
                            width: "calc(100% - 51px)",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "rgb(255 233 228)",
                        }}
                    >
                        <Box>
                            <Typography px={1}>{`${selectedMember.length} selected`}</Typography>
                        </Box>
                        <IconButton
                            sx={{ px: 1 }}
                            onClick={() => setOpenDeleteMemberFromGroupDialog(true)}
                        >
                            <DeleteIcon color="warning" />
                        </IconButton>
                    </Box>
                </Box>
                {renderTable}
            </Card>
        </Box>
    );
};

export default MemberList;
