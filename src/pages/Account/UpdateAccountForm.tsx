import { LoadingButton } from "@mui/lab";
import { Box, Grid, MenuItem } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isRequestSuccessful } from "src/common/utils";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import RHFAutocomplete from "src/components/RHFs/RHFAutocomplete";
import { RHFSelect } from "src/components/RHFs/RHFSelect";
import RHFTextField from "src/components/RHFs/RHFTextField";
import useGetCity from "src/hooks/useGetCity";
import useGetCountry from "src/hooks/useGetCountry";
import useGetDistrict from "src/hooks/useGetDistrict";
import useGetWard from "src/hooks/useGetWard";
import useUpdateAccount from "src/hooks/useUpdateAccount";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";
import FormProvider from "src/providers/FormProvider";

type FormValuesProps = {
    displayName: string;
    language: string;
    phoneNumber: string;
    bio: string;
    country:
        | {
              country_id: string;
              name: string;
          }
        | string;
    idCity:
        | {
              city_id: string;
              name: string;
          }
        | string;
    idDistrict:
        | {
              district_id: string;
              name: string;
              city_id: string;
          }
        | string;
    idWard:
        | {
              ward_id: string;
              name: string;
              district_id: string;
          }
        | string;
    zipcode: string;
    onUpdateSuccess?: () => void;
};

export interface UpdateAccountFormProps extends FormValuesProps {}

const UpdateAccountForm = (props: UpdateAccountFormProps) => {
    const {
        displayName,
        language,
        phoneNumber,
        bio,
        country,
        idCity,
        idDistrict,
        idWard,
        zipcode,
        onUpdateSuccess,
    } = props;

    const snackbar = useSnackBar();
    const t = useTranslation();
    const { handleError } = useHandleError();

    const methods = useForm<FormValuesProps>({
        defaultValues: {
            displayName,
            language: language.toLowerCase(),
            phoneNumber,
            bio,
            idCity,
            idDistrict,
            idWard,
            zipcode,
            country,
        },
    });

    const {
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitting, isDirty },
    } = methods;

    const [isDirtyAutoComplete, setIsDirtyAutoComplete] = useState(false);
    const [isDirtyAvatar, setIsDirtyAvatar] = useState(false);

    const city = watch("idCity");
    const district = watch("idDistrict");

    const { data: countries = [], isFetching: isFetchingCountry } = useGetCountry({
        onSuccess: (data) => {
            const countries = data?.data?.data || [];
            const countryData = countries.find((item: any) => item.name === country);
            if (countryData) {
                methods.setValue("country", countryData);
            }
        },
    });

    const { data: cities = [], isFetching: isFetchingCity } = useGetCity({
        onSuccess: (data) => {
            const cities = data?.data?.data || [];
            const cityName = typeof city === "string" ? city : city?.name;
            const cityData = cities.find((item: any) => item.name === cityName);
            if (cityData) {
                methods.setValue("idCity", cityData);
            }
        },
    });
    const { data: districts = [], isFetching: isFetchingDistrict } = useGetDistrict({
        idCity: city ? (typeof city === "string" ? city : city.city_id) : "",
        onSuccess: (data) => {
            const districts = data?.data?.data || [];
            const districtName = typeof district === "string" ? district : district?.name;
            const districtData = districts.find((item: any) => item.name === districtName);
            if (districtData) {
                methods.setValue("idDistrict", districtData);
            }
        },
    });
    const { data: wards = [], isFetching: isFetchingWard } = useGetWard({
        idDistrict: district
            ? typeof district === "string"
                ? district
                : district.district_id
            : "",
        onSuccess: (data) => {
            const wards = data?.data?.data || [];
            const wardName = typeof idWard === "string" ? idWard : idWard?.name;
            const wardData = wards.find((item: any) => item.name === wardName);
            if (wardData) {
                methods.setValue("idWard", wardData);
            }
        },
    });

    const { mutateAsync: updateAccount } = useUpdateAccount({});

    const onSubmit = useCallback(
        async (data: FormValuesProps) => {
            window.dispatchEvent(new Event("uploadAvatar"));

            if (!isDirty && !isDirtyAutoComplete) return;

            try {
                const response: any = await updateAccount({
                    displayName: data.displayName,
                    phoneNumber: data.phoneNumber,
                    language: data.language,
                    bio: data.bio,
                    ...(data.country
                        ? {
                              country:
                                  typeof data.country === "string"
                                      ? data.country
                                      : data.country.name,
                          }
                        : {
                              country: "",
                          }),
                    ...(data.idCity
                        ? {
                              idCity:
                                  typeof data.idCity === "string"
                                      ? data.idCity
                                      : data.idCity.city_id,
                          }
                        : {
                              idCity: "",
                          }),
                    ...(data.idDistrict
                        ? {
                              idDistrict:
                                  typeof data.idDistrict === "string"
                                      ? data.idDistrict
                                      : data.idDistrict.district_id,
                          }
                        : {
                              idDistrict: "",
                          }),
                    ...(data.idWard
                        ? {
                              idWard:
                                  typeof data.idWard === "string"
                                      ? data.idWard
                                      : data.idWard.ward_id,
                          }
                        : {
                              idWard: "",
                          }),
                    zipcode: data.zipcode,
                });

                if (isRequestSuccessful(response)) {
                    snackbar({
                        message: t("success.updateAccount"),
                        severity: "success",
                    });
                    setIsDirtyAutoComplete(false);
                    reset({}, { keepValues: true });
                    onUpdateSuccess?.();
                } else {
                    snackbar({
                        message: t("error.updateAccount"),
                        severity: "error",
                    });
                }
            } catch (error) {
                handleError(error);
            }
        },
        [
            handleError,
            isDirty,
            isDirtyAutoComplete,
            onUpdateSuccess,
            reset,
            snackbar,
            t,
            updateAccount,
        ]
    );

    useEffect(() => {
        const handler = () => {
            setIsDirtyAvatar(true);
        };
        window.addEventListener("selectAvatar", handler);
        window.addEventListener("uploadAvatarSuccess", () => {
            setIsDirtyAvatar(false);
            onUpdateSuccess?.();
        });

        return () => {
            window.removeEventListener("selectAvatar", handler);
            window.removeEventListener("uploadAvatarSuccess", () => onUpdateSuccess?.());
        };
    }, [onUpdateSuccess]);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <LoadingIcon open={isSubmitting} />
            <Grid container spacing={1} rowSpacing={1.5}>
                <Grid item xs={12}>
                    <RHFTextField
                        fullWidth
                        rules={{
                            required: {
                                value: true,
                                message: t("form.validation.displayNameIsRequired"),
                            },
                            pattern: {
                                value: /^[A-Za-zÀ-ỹ\s]+$/u,
                                message: t("form.validation.displayNameIsInvalid"),
                            },
                            minLength: {
                                value: 2,
                                message: t("form.validation.displayNameIsInvalid"),
                            },
                            maxLength: {
                                value: 50,
                                message: t("form.validation.displayNameIsInvalid"),
                            },
                        }}
                        size="small"
                        name="displayName"
                        label={t("common.displayName")}
                        sx={{
                            "& input": {
                                textTransform: "capitalize",
                            },
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": { color: "primary.main" },
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFSelect
                        size="small"
                        name="language"
                        label={t("common.language")}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": { color: "primary.main" },
                        }}
                    >
                        {[
                            {
                                id: "vietnamese",
                                value: "Vietnamese",
                            },
                            {
                                id: "english",
                                value: "English",
                            },
                        ].map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.value}
                            </MenuItem>
                        ))}
                    </RHFSelect>
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFTextField
                        fullWidth
                        size="small"
                        name="phoneNumber"
                        label={t("common.phoneNumber")}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": {
                                color: "primary.main",
                            },
                        }}
                        rules={{
                            required: {
                                value: true,
                                message: t("form.validation.phoneNumberIsRequired"),
                            },
                            pattern: {
                                value: /^(([+]*[(]{0,1}[0-9]{1,4}[)]{0,1})|0[3|5|7|8|9])[0-9]{9}$/g,
                                message: t("form.validation.phoneNumberIsInvalid"),
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <RHFTextField
                        rules={{
                            maxLength: {
                                value: 5000,
                                message: t("form.validation.bioMaxLength", {
                                    max: 5000,
                                }),
                            },
                        }}
                        onChange={(e) => {
                            if (e.target.value.length > 5000) {
                                methods.trigger("bio");
                            }
                        }}
                        fullWidth
                        multiline
                        minRows={2}
                        size="small"
                        name="bio"
                        label={t("common.bio")}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": { color: "primary.main" },
                        }}
                        spellCheck={false}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RHFAutocomplete
                        fullWidth
                        loading={isFetchingCountry}
                        size="small"
                        name="country"
                        label={t("common.country")}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": { color: "primary.main" },
                        }}
                        options={countries}
                        getOptionLabel={(option: any) => option.name || ""}
                        filterSelectedOptions
                        isOptionEqualToValue={(option, value) =>
                            option.country_id === value.country_id
                        }
                        onChange={() => setIsDirtyAutoComplete(true)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RHFAutocomplete
                        fullWidth
                        loading={isFetchingCity}
                        size="small"
                        name="idCity"
                        label={t("common.city")}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": { color: "primary.main" },
                        }}
                        options={cities}
                        getOptionLabel={(option: any) => option.name || ""}
                        filterSelectedOptions
                        isOptionEqualToValue={(option, value) => option.city_id === value.city_id}
                        onChange={() => setIsDirtyAutoComplete(true)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RHFAutocomplete
                        fullWidth
                        size="small"
                        name="idDistrict"
                        label={t("common.district")}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": { color: "primary.main" },
                        }}
                        loading={isFetchingDistrict}
                        options={districts}
                        getOptionLabel={(option: any) => option.name || ""}
                        filterSelectedOptions
                        isOptionEqualToValue={(option, value) =>
                            option.district_id === value.district_id
                        }
                        onChange={() => setIsDirtyAutoComplete(true)}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <RHFAutocomplete
                        fullWidth
                        size="small"
                        name="idWard"
                        label={t("common.ward")}
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": { color: "primary.main" },
                        }}
                        loading={isFetchingWard}
                        options={wards}
                        getOptionLabel={(option: any) => option.name || ""}
                        filterSelectedOptions
                        isOptionEqualToValue={(option, value) => option.ward_id === value.ward_id}
                        onChange={() => setIsDirtyAutoComplete(true)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RHFTextField
                        fullWidth
                        size="small"
                        name="zipcode"
                        label="Zipcode"
                        sx={{
                            "& fieldset": {
                                border: "1px solid rgba(145, 158, 171, 0.20)",
                                borderRadius: "8px",
                            },
                            "& label.MuiInputLabel-shrink": { color: "primary.main" },
                        }}
                    />
                </Grid>
            </Grid>
            <br />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isDirty && !isDirtyAutoComplete && !isDirtyAvatar}
                    type="submit"
                    variant="contained"
                    sx={{
                        boxShadow: "none",
                        borderRadius: "8px",
                        textTransform: "none",
                    }}
                >
                    {t("common.update")}
                </LoadingButton>
            </Box>
        </FormProvider>
    );
};

export default UpdateAccountForm;
