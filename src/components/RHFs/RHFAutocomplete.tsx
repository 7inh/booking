import { useFormContext, Controller, UseControllerProps } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { useState } from "react";

interface Props<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
    name: string;
    label?: string;
    placeholder?: string;
    helperText?: React.ReactNode;
    required?: boolean;
    renderTags?: any;
    rules?: UseControllerProps["rules"];
    type?: "tags" | "others";
    onBlurWithValue?: (value: any) => void;
}

export default function RHFAutocomplete<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
>({
    name,
    label,
    placeholder,
    helperText,
    renderTags,
    rules,
    type,
    onChange = undefined,
    onBlurWithValue,
    ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, "renderInput">) {
    const { control, setValue, getValues } = useFormContext();
    const [inputValue, setInputValue] = useState("");

    return (
        <Controller
            name={name}
            rules={rules}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    inputValue={inputValue}
                    onChange={(event, newValue, reason) => {
                        setValue(name, newValue, { shouldValidate: true });
                        onChange?.(event, newValue, reason);
                    }}
                    onInputChange={(_, newInputValue) => {
                        if (type !== "tags") {
                            setInputValue(newInputValue);
                            return;
                        }

                        const options = newInputValue.split(",");
                        const value = getValues(name);

                        if (options.length > 1) {
                            setValue(
                                name,
                                value
                                    .concat(options)
                                    .map((x: string) => x.trim())
                                    .filter((x: string) => x),
                                { shouldValidate: true }
                            );
                            setInputValue("");
                        } else {
                            setInputValue(newInputValue);
                        }
                    }}
                    onBlur={() => {
                        const value = getValues(name);
                        onBlurWithValue?.(value || inputValue);

                        if (type === "tags") {
                            if (inputValue.trim()) {
                                setValue(name, [...value, inputValue.trim()], {
                                    shouldValidate: true,
                                });
                            }

                            setInputValue("");
                        }
                    }}
                    renderInput={({ inputProps, ...params }) => (
                        <TextField
                            required={other.required}
                            label={label}
                            placeholder={placeholder}
                            error={!!error}
                            inputProps={{
                                ...inputProps,
                                required:
                                    other.required &&
                                    (!other.multiple || getValues(name)?.length === 0),
                            }}
                            helperText={error ? error?.message : helperText}
                            {...params}
                        />
                    )}
                    renderTags={renderTags}
                    {...other}
                />
            )}
        />
    );
}
