import { useFormContext, Controller } from "react-hook-form";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

interface Props extends Omit<FormControlLabelProps, "control"> {
    name: string;
    helperText?: React.ReactNode;
    size?: "small" | "medium";
}

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, size }) => ({
    width: size === "small" ? 33 : 42,
    height: size === "small" ? 18 : 26,
    margin: 0,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: size === "small" ? 14 : 22,
        height: size === "small" ? 14 : 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

export default function RHFSwitch({ name, helperText, size, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div>
                        <FormControlLabel
                            control={
                                <IOSSwitch
                                    {...field}
                                    ref={null}
                                    checked={field.value}
                                    size={size}
                                />
                            }
                            sx={{
                                marginLeft: 0,
                            }}
                            {...other}
                        />

                        {(!!error || helperText) && (
                            <FormHelperText error={!!error}>
                                {error ? error?.message : helperText}
                            </FormHelperText>
                        )}
                    </div>
                );
            }}
        />
    );
}
