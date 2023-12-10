import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import BoxBase from "src/components/Boxs/BoxBase";
import IconLoadingBackdrop from "src/components/Icons/IconLoadingBackdrop";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import { RHFCheckbox } from "src/components/RHFs/RHFCheckBox";
import RHFDatePicker from "src/components/RHFs/RHFDatePicker";
import RHFTextField from "src/components/RHFs/RHFTextField";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useGetDistrict from "src/hooks/useGetDistrict";
import useGetPrice from "src/hooks/useGetPrice";
import useGetProvince from "src/hooks/useGetProvince";
import useGetWard from "src/hooks/useGetWard";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

export type OrderFormValuesProps = {
    name: string;
    email: string;
    phone: string;
    province: any;
    district: any;
    ward: any;
    address: string;
    shipNow: boolean;
    date: string;
    note: string;
    deliveryService?: string;
};

export interface FormCheckOutProps {
    weight?: number;
    currentShippingFee?: number;
    shouldRefetchShippingFee?: boolean;
    refetchShippingFee: (shippingFee: number) => void;
    onClear?: () => void;
    onSubmit: (data: OrderFormValuesProps) => void;
}

const allowDeliveryService = {
    VCN: "pages.checkout.deliveryService.vcn",
    VTK: "pages.checkout.deliveryService.vtk",
};

const FormCheckOut = ({
    weight,
    currentShippingFee,
    shouldRefetchShippingFee = false,
    refetchShippingFee,
    onClear,
    onSubmit,
}: FormCheckOutProps) => {
    const t = useTranslation();

    const methods = useForm<OrderFormValuesProps>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            province: null,
            district: null,
            ward: null,
            address: "",
            note: "",
            deliveryService: "",
        },
    });

    const { handleSubmit, watch, setValue } = methods;

    const shipNow = watch("shipNow");
    const selectedProvince = watch("province");
    const selectedDistrict = watch("district");
    const deliveryServiceValue = watch("deliveryService");

    const { data: province, isFetching: isFetchingProvince } = useGetProvince({});
    const { data: district, isFetching: isFetchingDistrict } = useGetDistrict({
        provinceId: selectedProvince?.PROVINCE_ID,
    });
    const { data: ward, isFetching: isFetchingWard } = useGetWard({
        districtId: selectedDistrict?.DISTRICT_ID,
    });

    const { data: deliveryService, isFetching } = useGetPrice({
        enable: shouldRefetchShippingFee && selectedProvince?.PROVINCE_ID !== 2,
        productWeight: weight || 0,
        receiverProvince: selectedProvince?.PROVINCE_ID,
        receiverDistrict: selectedDistrict?.DISTRICT_ID,
        onSuccess: (data) => {
            const VTK = data?.find((item: any) => item.MA_DV_CHINH === "VTK");
            if (VTK) {
                setValue("deliveryService", VTK.MA_DV_CHINH);
                refetchShippingFee(VTK.GIA_CUOC);
            }
        },
    });

    const handleClear = useCallback(() => {
        if (!shouldRefetchShippingFee) return;
        onClear?.();
    }, [onClear, shouldRefetchShippingFee]);

    useEffect(() => {
        if (selectedProvince?.PROVINCE_ID === 2 && currentShippingFee !== 18000) {
            refetchShippingFee(18000);
        }
    }, [currentShippingFee, refetchShippingFee, selectedProvince?.PROVINCE_ID]);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <IconLoadingBackdrop open={isFetching} />
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
                    rules={{
                        required: t("pages.checkout.rules.required"),
                        pattern: {
                            value: /^0[0-9]{9}$/,
                            message: t("pages.checkout.rules.phone"),
                        },
                    }}
                    size="small"
                    name="phone"
                    label={t("pages.checkout.form.phone")}
                    required
                />
            </BoxBase>
            <BoxBase
                sx={{
                    display: "grid",
                    gap: 2,
                    my: 5,
                    mt: 6,
                }}
            >
                <RHFAutocomplete
                    rules={{
                        required: t("pages.checkout.rules.required"),
                    }}
                    loading={isFetchingProvince}
                    size="small"
                    name={"province"}
                    options={province}
                    getOptionLabel={(option: any) => option.PROVINCE_NAME}
                    isOptionEqualToValue={(option: any, value: any) =>
                        option.PROVINCE_ID === value.PROVINCE_ID
                    }
                    label={t("pages.checkout.form.province")}
                    onChange={() => {
                        methods.setValue("district", null);
                        methods.setValue("ward", null);
                        handleClear();
                    }}
                />
                <RHFAutocomplete
                    rules={{
                        required: t("pages.checkout.rules.required"),
                    }}
                    loading={isFetchingDistrict}
                    size="small"
                    name={"district"}
                    options={district}
                    getOptionLabel={(option: any) => option.DISTRICT_NAME}
                    isOptionEqualToValue={(option: any, value: any) =>
                        option.DISTRICT_ID === value.DISTRICT_ID
                    }
                    label={t("pages.checkout.form.district")}
                    onChange={() => {
                        methods.setValue("ward", null);
                        handleClear();
                    }}
                />
                <RHFAutocomplete
                    loading={isFetchingWard}
                    size="small"
                    name={"ward"}
                    options={ward}
                    getOptionLabel={(option: any) => option.WARDS_NAME}
                    isOptionEqualToValue={(option: any, value: any) =>
                        option.WARDS_ID === value.WARDS_ID
                    }
                    label={t("pages.checkout.form.ward")}
                />
                <RHFTextField
                    size="small"
                    name="address"
                    label={t("pages.checkout.form.address")}
                />
            </BoxBase>
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
            {deliveryServiceValue ? (
                <BoxBase
                    sx={{
                        my: 3,
                    }}
                >
                    <TypographyBase
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            mb: 1,
                        }}
                    >
                        {t("pages.checkout.form.deliveryService")}
                    </TypographyBase>
                    <BoxBase
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 2,
                        }}
                    >
                        {deliveryService?.map((item: any) => {
                            if (!(item.MA_DV_CHINH in allowDeliveryService)) return null;
                            return (
                                <BoxBase
                                    key={item.MA_DV_CHINH}
                                    sx={{
                                        border: "1px solid",
                                        bgcolor:
                                            deliveryServiceValue === item.MA_DV_CHINH
                                                ? "primary.main"
                                                : "secondary.main",
                                        color:
                                            deliveryServiceValue === item.MA_DV_CHINH
                                                ? "white"
                                                : "black",
                                        py: 2,
                                        px: 1,
                                        userSelect: "none",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setValue("deliveryService", item.MA_DV_CHINH);
                                        refetchShippingFee(item.GIA_CUOC);
                                    }}
                                >
                                    <TypographyBase
                                        sx={{
                                            textAlign: "center",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {t(
                                            `${
                                                allowDeliveryService[
                                                    item.MA_DV_CHINH as keyof typeof allowDeliveryService
                                                ]
                                            }`
                                        )}
                                    </TypographyBase>
                                </BoxBase>
                            );
                        })}
                    </BoxBase>
                </BoxBase>
            ) : null}
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
