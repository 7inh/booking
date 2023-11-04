import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
    name: string;
    label: string;
}

const RHFDatePicker = (props: Props) => {
    const { name, label } = props;
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
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default RHFDatePicker;
