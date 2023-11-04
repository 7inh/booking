import { Box, Skeleton } from "@mui/material";
import { useState } from "react";
import CreateButton from "src/components/Buttons/CreateButton";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import CreateOrganizeDialog from "src/components/Dialogs/CreateOrganizeDialog";
import { useAccountContext } from "src/contexts/AccountContext";
import useGetOrganizeJoined from "src/hooks/useGetOrganizeJoined";
import useTranslation from "src/hooks/utils/useTranslation";
import OrganizationCard from "src/pages/Organization/OrganizationCard";

const Organization = () => {
    const t = useTranslation();

    const {
        user: { roles: sysRole },
    } = useAccountContext();
    const isAdmin = sysRole === "ADMIN";

    const [openCreateOrgDialog, setOpenCreateOrgDialog] = useState(false);

    const { data: joined = [], refetch, isFetching } = useGetOrganizeJoined();

    return (
        <Box px={4}>
            <CreateOrganizeDialog
                open={openCreateOrgDialog}
                onClose={() => {
                    refetch();
                    setOpenCreateOrgDialog(false);
                }}
            />
            <CustomBreadcrumbs
                heading={t("page.organization.title")}
                links={[{ name: t("page.organization.title"), href: "/organize" }]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
                action={
                    isAdmin ? (
                        <CreateButton
                            onClick={() => setOpenCreateOrgDialog(true)}
                            label={t("common.newOrg")}
                        />
                    ) : null
                }
            />

            {isFetching ? (
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, 250px);"
                    sx={{ gridGap: 20 }}
                >
                    {joined.length !== 0
                        ? joined.map((organization: any) => (
                              <Skeleton
                                  key={organization.organizeId}
                                  variant="rounded"
                                  width={250}
                                  height={256}
                              />
                          ))
                        : Array.from({ length: 4 }).map((_, index) => (
                              <Skeleton key={index} variant="rounded" width={250} height={256} />
                          ))}
                </Box>
            ) : (
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, 250px);"
                    sx={{ gridGap: 20 }}
                >
                    {joined.map((organization: any) => (
                        <OrganizationCard
                            key={organization.organizeId}
                            organizeId={organization.organizeId}
                            name={organization.name}
                            description={organization.description}
                            avatar={organization.avatar}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Organization;
