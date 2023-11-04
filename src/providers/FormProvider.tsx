import { Box, BoxProps } from "@mui/material";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

interface Props extends BoxProps {
    children: React.ReactNode;
    methods: UseFormReturn<any>;
    onSubmit?: VoidFunction;
    onChange?: VoidFunction;
}

export default function FormProvider({ children, onSubmit, onChange, methods, ...rest }: Props) {
    return (
        <Form {...methods}>
            <Box component="form" onSubmit={onSubmit} onChange={onChange} {...rest}>
                {children}
            </Box>
        </Form>
    );
}
