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
    const [currentPage, setCurrentPage] = useState(page);
    const [goToPage, setGoToPage] = useState(currentPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
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
            setCurrentPage(goToPage);
            onPageChange(goToPage);
        }
    };

    const pageNumber = useMemo(
        () =>
            getListPage({
                currentPage,
                totalPages,
            }),
        [currentPage, totalPages]
    );

    return (
        <Box
            sx={{
                marginTop: "16px",
                display: "flex",
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
                    key={currentPage}
                    type="number"
                    size="small"
                    defaultValue={currentPage}
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
                <IconButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ArrowBackIosNewRoundedIcon fontSize="small" />
                </IconButton>
                <Stack direction="row" spacing={1} pt={0.25}>
                    {pageNumber.map((page) => (
                        <Typography
                            key={uuidv4()}
                            sx={{
                                fontSize: "16px !important",
                                border: "0.5px solid",
                                borderColor: currentPage === page ? "primary.main" : "grey.400",
                                bgcolor: currentPage === page ? "primary.main" : "inherit",
                                color: currentPage === page ? "white" : "primary.dark",
                                minWidth: "32px",
                                minHeight: "32px",
                                borderRadius: "32px",
                                fontWeight: 400,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover":
                                    typeof page === "number"
                                        ? {
                                              bgcolor: "primary.light",
                                              cursor: "pointer",
                                              color: "white",
                                          }
                                        : {},
                            }}
                            onClick={() => typeof page === "number" && handlePageChange(page)}
                        >
                            {page}
                        </Typography>
                    ))}
                </Stack>
                <IconButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
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
