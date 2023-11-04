import { Box } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PackageType } from "src/common/types";
import { isRequestSuccessful } from "src/common/utils";
import CardPackage from "src/components/Cards/CardPackage";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import DialogVoucher from "src/components/Dialogs/DialogVoucher";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import { useAccountContext } from "src/contexts/AccountContext";
import useGetPlanList from "src/hooks/useGetPlanList";
import useInitPayment from "src/hooks/useInitPayment";
import useRequestVerify from "src/hooks/useRequestVerify";
import useHandleError from "src/hooks/utils/useHandleError";
import useSnackBar from "src/hooks/utils/useSnackBar";
import useTranslation from "src/hooks/utils/useTranslation";

const BuyKpoint = () => {
    const t = useTranslation();
    const snackbar = useSnackBar();
    const { handleError } = useHandleError();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<PackageType | null>(null);
    const [isOpenDialogConfirm, setIsOpenDialogConfirm] = useState(false);

    const { data, isFetching } = useGetPlanList();
    const { mutateAsync: initPayment } = useInitPayment();
    const { detail } = useAccountContext();
    const { verified } = detail;
    const { mutateAsync: requestVerify } = useRequestVerify();
    const navigate = useNavigate();

    const handleBuy = useCallback(
        async (giftCodes: string[]) => {
            if (!selectedPlan) return;
            setIsLoading(true);
            try {
                const response: any = await initPayment({
                    productId: selectedPlan.productId,
                    quantity: 1,
                    vouchers: giftCodes,
                });

                if (isRequestSuccessful(response)) {
                    const endpoint = response?.data?.data?.endpoint;
                    if (endpoint) {
                        window.location.href = endpoint;
                    } else {
                        snackbar({
                            message: t("error.unKnownError"),
                            severity: "error",
                        });
                    }
                } else {
                    snackbar({
                        message: t("error.unKnownError"),
                        severity: "error",
                    });
                }
            } catch (error: any) {
                handleError(error);
            } finally {
                setIsLoading(false);
            }
        },
        [handleError, initPayment, selectedPlan, snackbar, t]
    );

    const handleClickBuyPlan = useCallback(
        async (plan) => {
            setIsLoading(true);
            if (verified) {
                setSelectedPlan(plan);
                setIsOpenDialogConfirm(true);
            } else {
                try {
                    const response: any = await requestVerify({});
                    if (isRequestSuccessful(response)) {
                        snackbar({
                            message: t("success.requestVerifyAccount"),
                            severity: "success",
                        });
                        navigate(
                            {
                                pathname: "/auth/verify-account",
                            },
                            {
                                state: {
                                    requestId: response?.data?.data?.id,
                                },
                            }
                        );
                    } else {
                        snackbar({
                            message: t("error.requestVerifyAccount"),
                            severity: "error",
                        });
                    }
                } catch (error) {
                    handleError(error);
                }
            }
            setIsLoading(false);
        },
        [handleError, navigate, requestVerify, snackbar, t, verified]
    );

    const renderDialogConfirm = useMemo(() => {
        if (!isOpenDialogConfirm || !selectedPlan) return null;
        return (
            <DialogVoucher
                plan={selectedPlan}
                open={isOpenDialogConfirm}
                onClose={() => setIsOpenDialogConfirm(false)}
                onConfirm={(giftCodes) => handleBuy(giftCodes)}
            />
        );
    }, [handleBuy, isOpenDialogConfirm, selectedPlan]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            height="100%"
            width="100%"
            px={4}
            boxSizing="border-box"
        >
            {renderDialogConfirm}
            <LoadingIcon open={isLoading} zIndex={1000000} />
            <Box width="100%" maxWidth="1070px">
                <CustomBreadcrumbs
                    heading={t("page.buyKpoint.title")}
                    links={[
                        {
                            href: "/buy-point",
                            name: t("page.buyKpoint.title"),
                        },
                    ]}
                />
                <br />

                {!isFetching ? (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 450px))",
                            gap: "30px",
                            pb: "30px",
                        }}
                    >
                        {data.map((plan: PackageType) => (
                            <CardPackage
                                key={plan.productId}
                                plan={plan}
                                onClick={handleClickBuyPlan}
                                verified={verified}
                            />
                        ))}
                        <CardPackage
                            plan={{
                                productName: "Enterprise",
                                amount: t("common.unlimited"),
                                bought: false,
                                numBot: t("common.unlimited"),
                                numLimitToken: t("common.unlimited"),
                                price: t("common.customPriceEnterprisePackage"),
                                productId: "enterprise",
                            }}
                            onClick={() => {
                                window.open("https://about.kamimind.ai/#about-us", "_blank");
                            }}
                        />
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
};

export default BuyKpoint;
