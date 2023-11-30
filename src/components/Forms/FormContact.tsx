import { useCallback } from "react";
import { useForm } from "react-hook-form";
import BoxBase from "src/components/Boxs/BoxBase";
import ButtonBase from "src/components/Buttons/ButtonBase";
import IconLoadingBackdrop from "src/components/Icons/IconLoadingBackdrop";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useSendMessage from "src/hooks/useSendMessage";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

export type ContactFormValuesProps = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const FormContact = () => {
    const t = useTranslation();
    const snackbar = useSnackBar();

    const { submitContact } = useSendMessage({
        onSendMessageSuccess: () => {
            snackbar({
                message: t("success.sendMessage"),
                severity: "success",
            });
        },
    });
    const methods = useForm<ContactFormValuesProps>({
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = useCallback(
        async (data: ContactFormValuesProps) => {
            await submitContact(data);
        },
        [submitContact]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <IconLoadingBackdrop open={isSubmitting} />
            <RHFTextField name="name" label={t("pages.contact.form.name")} required />
            <BoxBase my={2}>
                <RHFTextField
                    rules={{
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: t("pages.contact.formValidation.email"),
                        },
                    }}
                    name="email"
                    label={t("pages.contact.form.email")}
                    required
                />
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
