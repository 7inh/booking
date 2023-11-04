import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { Box, Card, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useLayoutEffect, useMemo, useState } from "react";
import { FilterInOrg } from "src/common/types";
import { groupAndJoinItemsByKey, isRequestSuccessful } from "src/common/utils";
import AvatarUser from "src/components/Avatars/AvatarUser";
import CreateButton from "src/components/Buttons/CreateButton";
import AddUserIntoOrgDialog from "src/components/Dialogs/AddUserIntoOrgDialog";
import DialogDeleteV2 from "src/components/Dialogs/DialogDeleteV2";
import UpdateUserRolesDialog from "src/components/Dialogs/UpdateUserRolesDialog";
import SearchAndFilterInOrg from "src/components/Filters/SearchAndFilterInOrg";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import { useAccountContext } from "src/contexts/AccountContext";
import useGetOrganizeMember from "src/hooks/useGetOrganizeMember";
import useRemoveUserFromOrgOrGroup from "src/hooks/useRemoveUserFromOrgOrGroup";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import GroupAvatarList from "src/pages/Organization/OrganizationDetail/GroupAvatarList";

const MemberList = ({
    organizeId,
    ownerToken,
}: {
    organizeId: string;
    groups: any[];
    ownerToken: string;
}) => {
    const {
        user: { roles, userToken },
    } = useAccountContext();
    const isAdmin = roles === "ADMIN";
    const isAdminOrg = ownerToken === userToken;

    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const [isLoading, setIsLoading] = useState(true);
    const [openAddUserIntoOrgDialog, setOpenAddUserIntoOrgDialog] = useState(false);
    const [openUpdateUserRolesDialog, setOpenUpdateUserRolesDialog] = useState(false);
    const [openRemoveUserFromOrgDialog, setOpenRemoveUserFromOrgDialog] = useState(false);
    const [currentSelectMember, setCurrentSelectMember] = useState<any | null>(null);
    const [selectedMemberList, setSelectedMemberList] = useState<string[]>([]);
    const [filter, setFilter] = useState<FilterInOrg>({
        search: "",
        groups: [],
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { data: membersRaw = [], refetch } = useGetOrganizeMember({
        organizeId,
    });

    const { mutateAsync: removeMember, isLoading: isDeleting } = useRemoveUserFromOrgOrGroup({});

    const members = useMemo(
        () => groupAndJoinItemsByKey<any>(membersRaw, "email", ["groupId"], "group"),
        [membersRaw]
    );

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
                field: "groupNameJoined",
                headerName: t("common.groupJoined"),
                width: 150,
                disableColumnMenu: true,
                sortable: false,
                renderCell: (params) => {
                    const groups = params.row.group?.filter(
                        (item: any) => item.verified && !item.isMain
                    );
                    return <GroupAvatarList groups={groups} />;
                },
            },
            {
                field: "groupNamePending",
                headerName: t("common.groupInvited"),
                width: 120,
                disableColumnMenu: true,
                sortable: false,
                renderCell: (params) => {
                    const groups = params.row.group?.filter((item: any) => !item.verified);
                    return <GroupAvatarList groups={groups} />;
                },
            },
            {
                field: "groupId",
                headerName: "Group",
                width: 200,
                disableColumnMenu: true,
                sortable: false,
            },
            {
                field: "verified",
                headerName: t("common.verified"),
                width: 100,
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
                headerName: "",
                width: 70,
                sortable: false,
                disableColumnMenu: true,
                renderCell: (params) => {
                    const onDeleteClick = () => {
                        setOpenRemoveUserFromOrgDialog(true);
                        setAnchorEl(null);
                    };

                    const onUpdateRoleClick = () => {
                        setOpenUpdateUserRolesDialog(true);
                        setAnchorEl(null);
                    };
                    return (
                        <>
                            <IconButton
                                onClick={(event) => handleClick(event, params.row)}
                                disabled={!params.row.verified}
                            >
                                <MoreVertRoundedIcon
                                    color={params.row.verified ? "info" : "disabled"}
                                    fontSize="small"
                                />
                            </IconButton>
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
                                                "0px 0px 0px 0px rgba(145, 158, 171, 0.12), 0px 0px 1px 0px rgba(145, 158, 171, 0.20)",
                                            borderRadius: "16px 0 16px 16px",
                                        },
                                    },
                                }}
                            >
                                <MenuItem onClick={onDeleteClick}>
                                    <Typography color="error">
                                        {t("common.deleteMember")}
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={onUpdateRoleClick}>
                                    {t("common.updateRole")}
                                </MenuItem>
                            </Menu>
                        </>
                    );
                },
            },
        ],
        [anchorEl, open, t]
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, currentTarget: any) => {
        setAnchorEl(event.currentTarget);
        setCurrentSelectMember(currentTarget);
        setSelectedMemberList([currentTarget.email]);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setCurrentSelectMember(null);
        setSelectedMemberList([]);
    };

    const handleRemoveMember = async () => {
        setIsLoading(true);

        try {
            const response: any = await removeMember({
                organizeId,
                deleteOrganize: true,
                listDelete: currentSelectMember ? [currentSelectMember.email] : selectedMemberList,
            });

            if (isRequestSuccessful(response)) {
                snackbar({
                    message: t("success.removeMember"),
                    severity: "success",
                });
                refetch();
                setOpenRemoveUserFromOrgDialog(false);
            } else {
                snackbar({
                    message: t("error.removeMember"),
                    severity: "error",
                });
            }
        } catch (error) {
            handleError(error);
        }
    };

    useLayoutEffect(() => {
        if (isLoading) {
            setIsLoading(false);
        }
    }, [isLoading]);

    const renderUpdateUserRolesDialog = useMemo(
        () =>
            openUpdateUserRolesDialog ? (
                <UpdateUserRolesDialog
                    open={openUpdateUserRolesDialog}
                    onClose={() => setOpenUpdateUserRolesDialog(false)}
                    organizeId={organizeId}
                    selectedRow={currentSelectMember}
                />
            ) : null,
        [openUpdateUserRolesDialog, organizeId, currentSelectMember]
    );

    const renderSearchAndFilter = useMemo(
        () => (
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "500px",
                }}
            >
                <SearchAndFilterInOrg onApply={(data) => setFilter(data)} />
            </Box>
        ),
        []
    );

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
                            value: filter.search,
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
                onRowSelectionModelChange={(newSelection: any) =>
                    setSelectedMemberList(newSelection)
                }
                rowSelectionModel={selectedMemberList}
                sx={{
                    borderRadius: 2,
                    ".MuiPaper-root": {
                        boxShadow: "none",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        marginTop: "-1px",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor:
                            selectedMemberList.length > 0 ? "rgb(255 233 228)" : "inherit",
                    },
                    "& .MuiDataGrid-selectedRowCount": {
                        opacity: 0,
                    },
                    "& .MuiDataGrid-overlayWrapper": {
                        minHeight: "calc(100vh - 380px)",
                    },
                    maxHeight: "calc(100vh - 250px)",
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
        [members, columns, filter.search, selectedMemberList, t]
    );

    return (
        <>
            <LoadingIcon open={isLoading || isDeleting} zIndex={20000} />
            {renderUpdateUserRolesDialog}
            <AddUserIntoOrgDialog
                open={openAddUserIntoOrgDialog}
                onClose={() => setOpenAddUserIntoOrgDialog(false)}
                onCreateSuccess={refetch}
                organizationId={organizeId}
            />

            <DialogDeleteV2
                open={openRemoveUserFromOrgDialog}
                onClose={() => setOpenRemoveUserFromOrgDialog(false)}
                onDelete={() => {
                    handleRemoveMember();
                }}
                title={t("dialog.removeMemberFromOrganization.title")}
                content={t("dialog.removeMemberFromOrganization.content")}
            />

            <Box display="flex" mb={2} justifyContent="space-between" alignItems="center">
                {renderSearchAndFilter}
                {(isAdmin || isAdminOrg) && (
                    <Box display="flex" gap={1} flexShrink={0}>
                        <CreateButton
                            onClick={() => setOpenAddUserIntoOrgDialog(true)}
                            label={t("common.addMember")}
                        />
                    </Box>
                )}
            </Box>

            <Card
                sx={{
                    height: members.length > 0 ? "fit-content" : "calc(100vh - 250px)",
                    maxHeight: "calc(100vh - 250px)",
                    width: "100%",
                }}
                elevation={0}
            >
                <Box
                    position="relative"
                    sx={{
                        display: selectedMemberList.length > 0 ? "block" : "none",
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
                            <Typography
                                px={1}
                            >{`${selectedMemberList.length} selected`}</Typography>
                        </Box>
                        <IconButton
                            sx={{ px: 1 }}
                            onClick={() => setOpenRemoveUserFromOrgDialog(true)}
                        >
                            <DeleteIcon color="warning" />
                        </IconButton>
                    </Box>
                </Box>
                {renderTable}
            </Card>
        </>
    );
};

export default MemberList;
