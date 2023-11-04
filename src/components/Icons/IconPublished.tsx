import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const IconPublished = () => {
    return (
        <CheckCircleRoundedIcon
            sx={(them) => ({
                color: them.palette.success.main,
            })}
            fontSize="small"
        />
    );
};

export default IconPublished;
