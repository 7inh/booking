import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import RHFTextField from "src/components/RHFs/RHFTextField";
import FormProvider from "src/providers/FormProvider";

export interface AddNewStoryProps {
    botToken: string;
    defaultStoryName: string;
    onAddNewStory: any;
}

type FormValuesProps = {
    storyName: string;
};

const AddNewStory = ({ defaultStoryName, onAddNewStory }: AddNewStoryProps) => {
    const methods = useForm<FormValuesProps>({
        defaultValues: {
            storyName: defaultStoryName,
        },
    });

    const { handleSubmit } = methods;

    return (
        <FormProvider
            methods={methods}
            onSubmit={handleSubmit(({ storyName }) => onAddNewStory(storyName))}
        >
            <Box
                sx={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    mx: "5px",
                    mb: 1,
                    border: "1px solid #D9D9D9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <RHFTextField
                    name="storyName"
                    required
                    size="small"
                    fullWidth
                    sx={{
                        p: 0,
                        "& fieldset": { border: "none" },
                    }}
                    inputProps={{
                        style: {
                            fontSize: "14px",
                        },
                    }}
                />

                <IconButton type="submit" sx={{}}>
                    <AddRoundedIcon
                        sx={{
                            color: "#95A3B1",
                        }}
                    />
                </IconButton>
            </Box>
        </FormProvider>
    );
};

export default AddNewStory;
