import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox, Chip } from "@mui/material";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import useGetAllTagsBot from "src/hooks/useGetAllTagsBot";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

export interface RHFAutocompleteTagsProps {
    onChange?: () => void;
    disabled?: boolean;
}

const RHFAutocompleteTags = (props: RHFAutocompleteTagsProps) => {
    const { disabled, onChange } = props;

    const t = useTranslation();
    const { data: tagsOptions = [], isFetching: isFetchingTagsOptions } = useGetAllTagsBot({});

    return (
        <RHFAutocomplete
            multiple
            required
            rules={{
                required: t("form.error.tagsRequired"),
            }}
            size="small"
            options={tagsOptions}
            freeSolo
            loading={isFetchingTagsOptions}
            renderTags={(value: readonly string[], getTagProps: any) =>
                value.map((option: string, index: number) => (
                    <Chip
                        key={uuidv4()}
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option}
                </li>
            )}
            label={t("common.tags")}
            name="tags"
            type="tags"
            helperText={t("form.helperText.tags")}
            sx={{
                "& fieldset": {
                    border: "1px solid rgba(145, 158, 171, 0.20)",
                    borderRadius: "8px",
                },
                "& label": {
                    color: "#919EAB",
                },
            }}
            disabled={disabled}
            onChange={onChange}
        />
    );
};

export default RHFAutocompleteTags;
