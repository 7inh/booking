import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BotItem from "src/components/Bot/BotItem";
import CreateButton from "src/components/Buttons/CreateButton";
import CreateBotDialog from "src/components/Dialogs/CreateBotDialog";
import useGetUserBots from "src/hooks/useGetUserBots";
import useDebounce from "src/hooks/utils/useDebounce";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BotListProps {
    organizeId: string;
    groupId: string;
    showCreateBotButton?: boolean;
}

const BotList = (props: BotListProps) => {
    const { organizeId, groupId, showCreateBotButton } = props;

    const navigate = useNavigate();
    const t = useTranslation();

    const [openCreateBotDialog, setOpenCreateBotDialog] = useState(false);
    const [search, setSearch] = useState("");
    const debounceSearch = useDebounce(search);

    const { data: bots = [], refetch } = useGetUserBots({
        organizeId: [organizeId],
        groupId: [groupId],
    });

    const filteredBots = useMemo(
        () =>
            bots.filter((bot: any) =>
                bot.botName.toLowerCase().includes(debounceSearch.toLowerCase())
            ),
        [bots, debounceSearch]
    );

    const renderToolbar = useMemo(() => {
        return (
            <Box display="flex" mb={2} justifyContent="space-between" alignItems="center">
                <TextField
                    sx={{
                        width: "500px",
                        "& fieldset": {
                            border: "1px solid rgba(145, 158, 171, 0.20)",
                            borderRadius: "8px",
                        },
                        "& label": {
                            color: "#919EAB",
                        },
                    }}
                    label={t("common.search")}
                    placeholder={t("common.botName")}
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                {showCreateBotButton ? (
                    <Box display="flex" gap={1} flexShrink={0}>
                        <CreateButton
                            onClick={() => setOpenCreateBotDialog(true)}
                            label="New Bot"
                        />
                    </Box>
                ) : null}
            </Box>
        );
    }, [showCreateBotButton, t]);

    const renderCreateBotDialog = useMemo(
        () =>
            openCreateBotDialog ? (
                <CreateBotDialog
                    organizeId={organizeId}
                    groupId={groupId}
                    groups={[]}
                    open={openCreateBotDialog}
                    onClose={() => setOpenCreateBotDialog(false)}
                    onCreateSuccess={refetch}
                />
            ) : null,
        [groupId, openCreateBotDialog, organizeId, refetch]
    );

    return (
        <Box width="100%">
            {renderCreateBotDialog}

            {renderToolbar}

            <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 344px);"
                sx={{ gridGap: 20 }}
            >
                {filteredBots.map((bot: any) => (
                    <BotItem
                        key={bot.botToken || bot.id}
                        botId={bot.botToken}
                        botName={bot.botName}
                        version={bot.version || ""}
                        avatar={bot.avatar || ""}
                        isPublished={bot.isPublic || false}
                        onClick={() => navigate(`/chat?botToken=${bot.id}`)}
                        level={bot.level}
                        chatColor={bot.chatColor}
                        isCheckLevel
                    />
                ))}
            </Box>
        </Box>
    );
};

export default BotList;
