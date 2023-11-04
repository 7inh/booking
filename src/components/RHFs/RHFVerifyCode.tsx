import { Input, Stack } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

type Props = TextFieldProps & {
    name: string;
};

const NUMBER_OF_CODE = 6;
const InputList = Array.from({ length: NUMBER_OF_CODE }).map((_, index) => ({
    id: uuidv4(),
    value: index,
}));

export default function RHFVerifyCode({ name }: Props) {
    const { control } = useFormContext();
    const inputsRef = useRef<HTMLInputElement[]>([]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Stack direction="row" spacing={1}>
                    {InputList.map((value, index) => (
                        <Input
                            ref={(el) => {
                                inputsRef.current[index] = el as HTMLInputElement;
                            }}
                            key={value.id}
                            data-testid={`verify-code-${index}`}
                            inputProps={{
                                maxLength: 1,
                                sx: {
                                    textAlign: "center",
                                },
                            }}
                            value={field.value[index] || ""}
                            onChange={(event) => {
                                if (index < NUMBER_OF_CODE - 1 && event.target.value) {
                                    inputsRef.current[index + 1].querySelector("input")?.focus();
                                }
                                const newCodes = [...field.value];
                                newCodes[index] = event.target.value;
                                field.onChange(newCodes);
                            }}
                            onPaste={(event) => {
                                event.preventDefault();
                                const paste = event.clipboardData.getData("text");
                                field.onChange(paste.split(""));
                            }}
                            sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 1,
                                height: 64,
                                width: "100%",
                                "&::before": {
                                    content: "''",
                                    border: "none",
                                },
                            }}
                        />
                    ))}
                </Stack>
            )}
        />
    );
}
