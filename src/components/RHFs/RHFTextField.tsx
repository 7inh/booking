import { useFormContext, Controller, UseControllerProps } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type Props = TextFieldProps & {
    name: string;
    rules?: UseControllerProps["rules"];
};

export default function RHFTextField({ name, helperText, type, rules, onChange, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            rules={rules}
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    type={type}
                    value={type === "number" && field.value === 0 ? "" : field.value}
                    onChange={(event) => {
                        if (type === "number") {
                            field.onChange(Number(event.target.value));
                        } else {
                            field.onChange(event.target.value);
                        }
                        onChange?.(event);
                    }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...other}
                />
            )}
        />
    );
}
