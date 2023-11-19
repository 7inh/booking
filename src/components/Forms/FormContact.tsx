import { useCallback } from "react";
import { useForm } from "react-hook-form";
import BoxBase from "src/components/Boxs/BoxBase";
import ButtonBase from "src/components/Buttons/ButtonBase";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

type FormValuesProps = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const FormContact = () => {
    const t = useTranslation();

    const methods = useForm<FormValuesProps>({
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = useCallback((data: FormValuesProps) => {
        console.log(data);
    }, []);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name="name" label={t("pages.contact.form.name")} required />
            <BoxBase my={2}>
                <RHFTextField name="email" label={t("pages.contact.form.email")} required />
            </BoxBase>
            <RHFTextField name="subject" label={t("pages.contact.form.subject")} />
            <BoxBase my={2}>
                <RHFTextField
                    multiline
                    name="message"
                    label={t("pages.contact.form.message")}
                    minRows={7}
                />
            </BoxBase>
            <ButtonBase fullWidth type="submit" label={t("pages.contact.form.submit")}></ButtonBase>
        </FormProvider>
    );
};

export default FormContact;
