import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
    name: string;
    label: string;
    size?: "small" | "medium";
    disabled?: boolean;
    minDate?: any;
}

const RHFDatePicker = (props: Props) => {
    const { name, label, size = "medium", disabled, minDate } = props;
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={label}
                        onChange={(newValue: any) => {
                            field.onChange(newValue.toISOString());
                        }}
                        sx={{
                            width: "100%",
                        }}
                        slotProps={{ textField: { size } }}
                        disabled={disabled}
                        minDate={minDate}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default RHFDatePicker;
