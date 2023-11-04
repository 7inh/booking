import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Checkbox, Chip, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { useCallback, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { FilterBot } from "src/common/types";
import ButtonBase from "src/components/Buttons/ButtonBase";
import SearchBarRHF from "src/components/Filters/SearchBarRHF";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import useGetAllTagsBot from "src/hooks/useGetAllTagsBot";
import useGetMarketAllTags from "src/hooks/useGetMarketAllTags";
import useGetOrganizeGroupJoined from "src/hooks/useGetOrganizeGroupJoined";
import useGetOrganizeJoined from "src/hooks/useGetOrganizeJoined";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    zIndex: 100,
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function CustomizedMenus({ filter }: { filter: FilterBot }) {
    const t = useTranslation();

    const isMarketPage = window.location.pathname.includes("/kami-store");

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [selectedOrgIds, setSelectedOrgIds] = useState<string[]>([]);

    const { reset, getValues } = useFormContext<FilterBot>();

    const { data: tagsUser = [], isFetching: isFetchingTagsUser } = useGetAllTagsBot({
        enable: !isMarketPage,
    });
    const { data: tagsMarket = [], isFetching: isFetchingTagsMarket } = useGetMarketAllTags({
        enable: isMarketPage,
    });
    const { data: orgs = [], isFetching: isFetchingOrgs } = useGetOrganizeJoined();
    const { data: groups = [], isFetching: isFetchingGroups } = useGetOrganizeGroupJoined({
        organizeId: selectedOrgIds,
    });

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        reset(filter);
    };

    const tags = isMarketPage ? tagsMarket : tagsUser;
    const isFetchingTags = isMarketPage ? isFetchingTagsMarket : isFetchingTagsUser;

    return (
        <Box height="100%">
            <Button
                variant="contained"
                sx={{
                    height: "100%",
                    textTransform: "none",
                    borderRadius: "8px",
                    borderColor: "primary.main",
                }}
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {t("common.filter")}
            </Button>
            <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose} disablePortal>
                <Box
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography variant="subtitle2" mb={2}>
                        {t("common.filterBy")}
                    </Typography>
                    <Stack gap={2}>
                        <RHFAutocomplete
                            name="tags"
                            label={t("common.tags")}
                            multiple
                            loading={isFetchingTags}
                            options={tags}
                            size="small"
                            disableCloseOnSelect
                            getOptionLabel={(option: string) => option}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option}
                                </li>
                            )}
                            limitTags={2}
                            sx={{
                                "& fieldset": {
                                    border: "1px solid rgba(145, 158, 171, 0.20)",
                                    borderRadius: "8px",
                                },
                                "& label": {
                                    color: "#919EAB",
                                },
                            }}
                        />
                        <RHFAutocomplete
                            name="orgs"
                            label={t("common.organizations")}
                            multiple
                            options={orgs}
                            loading={isFetchingOrgs}
                            size="small"
                            disableCloseOnSelect
                            getOptionLabel={(option: any) => option.name || option.groupName}
                            isOptionEqualToValue={(option, value) =>
                                option.organizeId === value.organizeId
                            }
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name || option.groupName}
                                </li>
                            )}
                            style={{ width: 560 }}
                            limitTags={2}
                            onBlur={() => {
                                setSelectedOrgIds(getValues("orgs").map((org) => org.organizeId));
                            }}
                            sx={{
                                "& fieldset": {
                                    border: "1px solid rgba(145, 158, 171, 0.20)",
                                    borderRadius: "8px",
                                },
                                "& label": {
                                    color: "#919EAB",
                                },
                            }}
                        />
                        <RHFAutocomplete
                            name="groups"
                            label={t("common.groups")}
                            helperText={t("common.selectOrganizationFirst")}
                            multiple
                            disabled={selectedOrgIds.length === 0}
                            options={groups}
                            loading={isFetchingGroups}
                            size="small"
                            disableCloseOnSelect
                            getOptionLabel={(option: any) => option.name || option.groupName}
                            isOptionEqualToValue={(option, value) =>
                                option.groupId === value.groupId
                            }
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name || option.groupName}
                                </li>
                            )}
                            style={{ width: 560 }}
                            limitTags={2}
                            sx={{
                                "& fieldset": {
                                    border: "1px solid rgba(145, 158, 171, 0.20)",
                                    borderRadius: "8px",
                                },
                                "& label": {
                                    color: "#919EAB",
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 0.75,
                            }}
                        >
                            <ButtonBase
                                variant="outlined"
                                onClick={() =>
                                    reset({
                                        groups: [],
                                        orgs: [],
                                        tags: [],
                                    })
                                }
                                label={t("common.reset")}
                                sx={{
                                    color: "rgba(0, 0, 0, 0.6)",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                    },
                                }}
                                endIcon={<ReplayIcon />}
                            />
                            <ButtonBase
                                variant="contained"
                                type="submit"
                                label={t("common.apply")}
                                onClick={() => {
                                    setAnchorEl(null);
                                }}
                            />
                        </Box>
                    </Stack>
                </Box>
            </StyledMenu>
        </Box>
    );
}

const SearchAndFilterV2 = ({
    filter,
    onApplyFilter,
}: {
    filter: FilterBot;
    setSearchText: (value: string) => void;
    onApplyFilter: (data: FilterBot) => void;
}) => {
    const t = useTranslation();

    const methods = useForm<FilterBot>({
        defaultValues: filter,
    });
    const { handleSubmit, setValue, reset } = methods;

    const onSubmit = useCallback(
        (data: FilterBot) => {
            onApplyFilter(data);
        },
        [onApplyFilter]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box width="100%">
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        minWidth: 593,
                    }}
                >
                    <Box width="100%">
                        <SearchBarRHF placeholder={t("common.botName")} />
                    </Box>
                    <Box>
                        <CustomizedMenus filter={filter} />
                    </Box>
                </Box>
                <Box display="flex" gap={0.5} mt={1}>
                    {Object.keys(filter).map((key) => {
                        if (filter[key as keyof FilterBot].length === 0) return null;

                        return (
                            <Chip
                                key={key}
                                label={t("form.searchAndFilter." + key)}
                                color="primary"
                                onDelete={() => {
                                    if (key === "orgs") {
                                        reset({
                                            ...filter,
                                            ["orgs"]: [],
                                            ["groups"]: [],
                                        });
                                        onApplyFilter({
                                            ...filter,
                                            ["orgs"]: [],
                                            ["groups"]: [],
                                        });
                                    } else {
                                        setValue(key as keyof FilterBot, []);
                                        onApplyFilter({
                                            ...filter,
                                            [key]: key === "search" ? "" : [],
                                        });
                                    }
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>
        </FormProvider>
    );
};

export default SearchAndFilterV2;
