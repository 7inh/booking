import { BoxProps } from "@mui/material";
import { Bot } from "src/common/types";
import FormUpdateBot from "src/components/Forms/FormUpdateBot";
import useGetLanguageModel from "src/hooks/useGetLanguageModel";
import useGetVoice from "src/hooks/useGetVoice";

export interface ProfileProps extends BoxProps {
    botProfile: Bot;
    refetch: () => void;
}

const Profile = (props: ProfileProps) => {
    const { botProfile, refetch } = props;

    const { data: voices, isFetched: isFetchedVoice } = useGetVoice();
    const { data: languageModels, isFetched: isFetchedLanguageModels } = useGetLanguageModel({
        botToken: botProfile.id,
        enable: botProfile.level === 1,
    });

    if (!botProfile.id || !isFetchedVoice || (botProfile.level === 1 && !isFetchedLanguageModels))
        return null; //TODO: return skeleton loading

    return (
        <FormUpdateBot
            key={JSON.stringify(botProfile)}
            botProfile={botProfile}
            voices={voices}
            languageModels={languageModels}
            onUpdateSuccess={refetch}
        />
    );
};

export default Profile;
