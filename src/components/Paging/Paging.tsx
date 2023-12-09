import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useMemo, useState } from "react";
import { getListPage } from "src/components/Paging/utils";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { IconButton, Stack } from "@mui/material";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

interface PagingProps {
    totalItems: number;
    itemsPerPage: number;
    page: number;
    onPageChange: (page: number) => void;
}

const Paging: React.FC<PagingProps> = ({ page, totalItems, itemsPerPage, onPageChange }) => {
    const t = useTranslation();

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [goToPage, setGoToPage] = useState(page);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    const handleGoToPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setGoToPage(value);
        }
    };

    const goToSpecificPage = () => {
        if (goToPage >= 1 && goToPage <= totalPages) {
            onPageChange(goToPage);
        }
    };

    const pageNumber = useMemo(
        () =>
            getListPage({
                currentPage: page,
                totalPages,
            }),
        [page, totalPages]
    );

    return (
        <Box
            sx={{
                marginTop: "16px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                "& p": {
                    fontSize: "14px",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <Typography>{t("common.page")}:</Typography>
                <TextField
                    key={page}
                    type="number"
                    size="small"
                    defaultValue={page}
                    onChange={handleGoToPageChange}
                    InputProps={{
                        inputProps: {
                            min: 1,
                            max: totalPages,
                        },
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            goToSpecificPage();
                        }
                    }}
                    sx={{
                        width: "70px",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderRadius: "1px",
                            },
                        },
                        input: {
                            pr: "4px !important",
                            px: 1,
                        },
                    }}
                />
                <Typography flexShrink={0}>/ {totalPages}</Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    <ArrowBackIosNewRoundedIcon fontSize="small" />
                </IconButton>
                <Stack direction="row" spacing={1} pt={0.25}>
                    {pageNumber.map((crrPage) => (
                        <Typography
                            key={uuidv4()}
                            sx={{
                                fontSize: "16px !important",
                                border: "0.5px solid",
                                borderColor: page === crrPage ? "primary.main" : "grey.400",
                                bgcolor: page === crrPage ? "primary.main" : "inherit",
                                color: page === crrPage ? "white" : "primary.dark",
                                minWidth: "32px",
                                minHeight: "32px",
                                borderRadius: "32px",
                                fontWeight: 400,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover":
                                    typeof crrPage === "number"
                                        ? {
                                              bgcolor: "primary.light",
                                              cursor: "pointer",
                                              color: "white",
                                          }
                                        : {},
                            }}
                            onClick={() => typeof crrPage === "number" && handlePageChange(crrPage)}
                        >
                            {crrPage}
                        </Typography>
                    ))}
                </Stack>
                <IconButton
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    <ArrowBackIosNewRoundedIcon
                        fontSize="small"
                        sx={{ transform: "rotate(180deg)" }}
                    />
                </IconButton>
            </Stack>
        </Box>
    );
};

export default Paging;
