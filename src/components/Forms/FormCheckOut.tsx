import { useForm } from "react-hook-form";
import BoxBase from "src/components/Boxs/BoxBase";
import { RHFCheckbox } from "src/components/RHFs/RHFCheckBox";
import RHFDatePicker from "src/components/RHFs/RHFDatePicker";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

export type OrderFormValuesProps = {
    name: string;
    email: string;
    phone: string;
    address: string;
    shipNow: boolean;
    date: string;
    note: string;
};

export interface FormCheckOutProps {
    onSubmit: (data: OrderFormValuesProps) => void;
}

const FormCheckOut = ({ onSubmit }: FormCheckOutProps) => {
    const t = useTranslation();

    const methods = useForm<OrderFormValuesProps>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            note: "",
        },
    });

    const { handleSubmit, watch } = methods;

    const shipNow = watch("shipNow");

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField size="small" name="name" label={t("pages.checkout.form.name")} required />
            <BoxBase
                my={2}
                sx={{
                    display: "grid",
                    gridTemplateColumns: "3fr 2fr",
                    gap: 2,
                }}
            >
                <RHFTextField size="small" name="email" label={t("pages.checkout.form.email")} />
                <RHFTextField
                    size="small"
                    name="phone"
                    label={t("pages.checkout.form.phone")}
                    required
                />
            </BoxBase>
            <RHFTextField size="small" name="address" label={t("pages.checkout.form.address")} />
            <BoxBase
                sx={{
                    userSelect: "none",
                }}
            >
                <RHFCheckbox name="shipNow" label={t("pages.checkout.asSoonAsPossible")} />
                <RHFDatePicker
                    size="small"
                    name="date"
                    label={t("pages.checkout.form.date")}
                    disabled={shipNow}
                />
            </BoxBase>
            <BoxBase my={2}>
                <RHFTextField
                    multiline
                    size="small"
                    name="note"
                    label={t("pages.checkout.form.note")}
                    minRows={5}
                />
            </BoxBase>
        </FormProvider>
    );
};

export default FormCheckOut;
