import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ReplayIcon from "@mui/icons-material/Replay";
import {
    Box,
    Button,
    Checkbox,
    Menu,
    MenuProps,
    Stack,
    Typography,
    alpha,
    styled,
} from "@mui/material";
import { SetStateAction, memo, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonBase from "src/components/Buttons/ButtonBase";
import { IconFilter } from "src/components/Icons/IconExternal";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import useGetAllTagsBot from "src/hooks/useGetAllTagsBot";
import useGetOrganizeGroupJoined from "src/hooks/useGetOrganizeGroupJoined";
import useGetOrganizeJoined from "src/hooks/useGetOrganizeJoined";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";
import { BOT_SOURCE_OPTIONS } from "src/pages/Chat/const";
import { FormValuesProps, defaultValues } from "src/pages/Chat/types";
import FormProvider from "src/providers/FormProvider";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

export interface FilterBotProps {
    filter: FormValuesProps;
    onApplyFilter: (data: FormValuesProps) => void;
}

const FilterBot = (props: FilterBotProps) => {
    const { filter } = props;
    const isFiltering = useMemo(() => {
        return filter.orgs.length > 0 || filter.groups.length > 0 || filter.tags.length > 0;
    }, [filter]);

    const t = useTranslation();

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });
    const { handleSubmit, reset, getValues } = methods;

    const lgDown = useResponsive("down", "lg");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [selectedOrgIds, setSelectedOrgIds] = useState<string[]>([]);
    const [filterWidth, setFilterWidth] = useState<number>(333);

    const { data: tags = [], isFetching: isFetchingTags } = useGetAllTagsBot({});
    const { data: orgs = [], isFetching: isFetchingOrgs } = useGetOrganizeJoined();
    const { data: groups = [], isFetching: isFetchingGroups } = useGetOrganizeGroupJoined({
        organizeId: selectedOrgIds,
    });

    const handleClick = (event: { currentTarget: SetStateAction<HTMLElement | null> }) => {
        setAnchorEl(event.currentTarget);
        const botListElement = document.body.querySelector("#bot-list");
        const botListWidth = botListElement?.clientWidth || 0;
        setFilterWidth(botListWidth - 13);
    };

    const handleClose = () => {
        setAnchorEl(null);
        reset(filter);
    };

    const onSubmit = useCallback(
        (data: FormValuesProps) => {
            props.onApplyFilter?.(data);
            setAnchorEl(null);
        },
        [props]
    );

    return (
        <>
            <Button
                onClick={handleClick}
                sx={{
                    minWidth: "auto",
                    bgcolor: "primary.main",
                    color: "rgba(255, 255, 255, 1)",
                    borderRadius: "8px",
                    "&:hover": {
                        bgcolor: "primary.dark",
                    },
                    position: "relative",
                }}
            >
                <IconFilter
                    sx={{
                        width: "25px",
                    }}
                />
                {isFiltering ? (
                    <Box
                        sx={{
                            position: "absolute",
                            top: -3,
                            right: -3,
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            bgcolor: "error.main",
                        }}
                    ></Box>
                ) : null}
            </Button>

            <StyledMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiPaper-root": {
                        left: lgDown ? "8px !important" : "",
                        minWidth: filterWidth,
                    },
                }}
            >
                <Box p={2} key={JSON.stringify(filter)}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="subtitle2" mb={1}>
                            {t("common.filterBy")}
                        </Typography>
                        <Stack gap={1.2}>
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
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                    }
                                }}
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
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                    }
                                }}
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
                                limitTags={2}
                                onBlur={() => {
                                    setSelectedOrgIds(
                                        getValues("orgs").map((org) => org.organizeId)
                                    );
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
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                    }
                                }}
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
                                name="botSource"
                                label={t("common.botSource")}
                                options={BOT_SOURCE_OPTIONS}
                                loading={isFetchingGroups}
                                size="small"
                                isOptionEqualToValue={(option, value) =>
                                    option.value === value.value
                                }
                                filterSelectedOptions
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
                                    onClick={() => {
                                        reset({
                                            groups: [],
                                            orgs: [],
                                            tags: [],
                                            botSource: null,
                                        });
                                        handleSubmit(onSubmit)();
                                    }}
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
                                />
                            </Box>
                        </Stack>
                    </FormProvider>
                </Box>
            </StyledMenu>
        </>
    );
};

export default memo(FilterBot);
