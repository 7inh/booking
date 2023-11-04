import { Box } from "@mui/material";
import { BoxProps } from "@mui/material/Box";

export interface ContainerRowProps extends BoxProps {
    children: React.ReactNode;
}

const sx = {
    display: "flex",
    alignItems: "center",
};

const ContainerRow = ({ children, sx: _sx, ...props }: ContainerRowProps) => {
    return (
        <Box
            {...props}
            sx={{
                ...sx,
                ..._sx,
            }}
        >
            {children}
        </Box>
    );
};

export default ContainerRow;
