import MenuIcon from "@mui/icons-material/Menu";
import { Box, Divider, Drawer, IconButton } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { scrollbarSx } from "src/common/sxs";
import theme from "src/common/theme";
import AppBar from "src/components/Appbar/Appbar";
import BrandExchangeV2 from "src/components/Brands/BrandExchangeV2";
import SearchBar from "src/components/Filters/SearchBar";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import { useAccountContext } from "src/contexts/AccountContext";
import { useChatContext } from "src/contexts/ChatContext";
import { useNavContext } from "src/contexts/NavContext";
import useGetBotProfileDetail from "src/hooks/useGetBotProfileDetail";
import useGetUserBots from "src/hooks/useGetUserBots";
import useDebounce from "src/hooks/utils/useDebounce";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";
import BotList from "src/pages/Chat/BotList";
import ChatBoxV2 from "src/pages/Chat/ChatBoxV2";
import ChatEmpty from "src/pages/Chat/ChatEmpty";
import CurrentBalanceCard from "src/pages/Chat/CurrentBalanceCard";
import FilterBot from "src/pages/Chat/FilterBot";
import InformationCard from "src/pages/Chat/InformationCard";
import LetSelectedBot from "src/pages/Chat/LetSelectedBot";
import { BOT_SOURCE_OPTION, FormValuesProps } from "src/pages/Chat/types";
import { getUserBotOptionsByBotSource } from "src/pages/Chat/utils";
import { v4 as uuidv4 } from "uuid";

const MAX_PANEL_LEFT_WIDTH = 300;
const MIN_PANEL_LEFT_WIDTH = 67;

const ChatPanel = () => {
    const t = useTranslation();

    const lgDown = useResponsive("down", "lg");
    const xsDown = useResponsive("down", "md");

    const { toggle } = useNavContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        user: { userToken },
    } = useAccountContext();
    const { setCurrentSelectedStoryId } = useChatContext();

    const botToken = searchParams.get("botToken") || "";
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<{
        orgs: string[];
        tags: string[];
        groups: string[];
        botSource: BOT_SOURCE_OPTION | null;
    }>({
        orgs: [],
        tags: [],
        groups: [],
        botSource: null,
    });
    const deferredSearch = useDebounce(search);
    const [currentBalanceKey, setCurrentBalanceKey] = useState<string>(uuidv4());
    const [openInformation, setOpenInformation] = useState(false);
    const chatPanelRef = useRef<HTMLDivElement>(null);
    const chatPanelLeftRef = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);

    const { bot: botProfile } = useGetBotProfileDetail({ botToken });

    const {
        data: userBots = [],
        isFetched,
        refetch,
    } = useGetUserBots({
        organizeId: filter.orgs,
        groupId: filter.groups,
        tags: filter.tags,
        isGetAll: true,
        options: getUserBotOptionsByBotSource(filter.botSource?.value),
        orderKey: "latestChatTime",
        orderValue: "DESC",
    });

    const filteredBots = useMemo(
        () =>
            userBots.filter((bot) => {
                if (deferredSearch === "") return true;
                return bot.botName.toLowerCase().includes(deferredSearch.toLowerCase());
            }),
        [deferredSearch, userBots]
    );

    const isFiltering = useMemo(() => {
        return (
            filter.orgs.length > 0 ||
            filter.groups.length > 0 ||
            filter.tags.length > 0 ||
            filter.botSource
        );
    }, [filter.botSource, filter.groups.length, filter.orgs.length, filter.tags.length]);

    const onApplyFilter = useCallback((data: FormValuesProps) => {
        setFilter({
            orgs: data.orgs.map((org) => org.organizeId),
            groups: data.groups.map((group) => group.groupId),
            tags: data.tags,
            botSource: data.botSource || null,
        });
    }, []);

    const renderAppBar = useMemo(() => {
        if (!xsDown) return null;

        return <AppBar toggle={toggle} />;
    }, [toggle, xsDown]);

    const renderMenuIcon = useMemo(() => {
        return (
            <>
                {lgDown && !xsDown ? (
                    <Box
                        zIndex={theme.zIndex.drawer - 1}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        px={1}
                    >
                        <IconButton sx={{ marginLeft: -1 }} onClick={toggle}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Box mt={xsDown ? 2 : 1} />
                )}
            </>
        );
    }, [lgDown, toggle, xsDown]);

    const renderToolbar = useMemo(
        () => (
            <Box display="flex" gap={1}>
                <SearchBar placeholder={t("common.botName")} onSearch={setSearch} />
                <FilterBot filter={filter} onApplyFilter={onApplyFilter} />
            </Box>
        ),
        [filter, onApplyFilter, t]
    );

    const renderBotListWithToolbar = useMemo(() => {
        const left = parseInt(chatPanelLeftRef.current?.style.width.replaceAll("px", "") || "0");

        return (
            <>
                <Box px={1} pb={1}>
                    {renderToolbar}
                </Box>
                <Box
                    sx={{
                        ...scrollbarSx,
                        overflow: "auto",
                        minWidth: "200px",
                    }}
                >
                    <BotList
                        botToken={botToken}
                        isFetched={isFetched}
                        filteredBots={filteredBots}
                        onSelectBot={(botToken) => {
                            setSearchParams({ botToken });
                            setCurrentSelectedStoryId("");
                        }}
                        marginLeft={isResizing || left === 0 || left > 200 ? undefined : left - 200}
                    />
                </Box>
            </>
        );
    }, [
        botToken,
        filteredBots,
        isFetched,
        isResizing,
        renderToolbar,
        setCurrentSelectedStoryId,
        setSearchParams,
    ]);

    const renderPanelLeft = useMemo(() => {
        const handleResize = (e: MouseEvent) => {
            if (chatPanelLeftRef.current) {
                const { left } = chatPanelLeftRef.current.getBoundingClientRect();
                const newWidth = e.clientX - left;

                if (newWidth < MIN_PANEL_LEFT_WIDTH + 10) {
                    chatPanelLeftRef.current.style.width = `${MIN_PANEL_LEFT_WIDTH}px`;
                } else if (newWidth > MAX_PANEL_LEFT_WIDTH - 10) {
                    chatPanelLeftRef.current.style.width = `${MAX_PANEL_LEFT_WIDTH}px`;
                } else chatPanelLeftRef.current.style.width = `${newWidth}px`;
            }
        };

        return (
            <Box
                ref={chatPanelLeftRef}
                display={xsDown && botToken ? "none" : "flex"}
                overflow="hidden"
                borderRight="1px solid"
                borderColor="divider"
                flexDirection="column"
                height="100%"
                position="relative"
                width={xsDown ? "100%" : "auto"}
                maxWidth={xsDown ? "100%" : MAX_PANEL_LEFT_WIDTH}
                sx={{
                    flexShrink: 0,
                    userSelect: "none",
                    "#resize-handle": {
                        display: "none",
                    },
                    "&:hover": {
                        "#resize-handle": {
                            display: "block",
                        },
                    },
                }}
            >
                <Box
                    id="resize-handle"
                    sx={{
                        position: "absolute",
                        width: "6px",
                        height: "64px",
                        top: "calc(50% - 32px)",
                        right: 0,
                        my: "auto",
                        cursor: "col-resize",
                        bgcolor: "#637381",
                        borderRadius: "12px",
                        zIndex: 1,
                    }}
                    onMouseDown={() => {
                        if (chatPanelRef.current) {
                            chatPanelRef.current.style.cursor = "col-resize";
                            setIsResizing(true);
                        }
                        document.addEventListener("mousemove", handleResize);
                        document.addEventListener("mouseup", () => {
                            document.removeEventListener("mousemove", handleResize);
                            if (chatPanelRef.current) {
                                chatPanelRef.current.style.cursor = "default";
                            }
                            setIsResizing(false);
                        });
                    }}
                ></Box>
                {renderMenuIcon}
                {renderBotListWithToolbar}
            </Box>
        );
    }, [botToken, renderBotListWithToolbar, renderMenuIcon, xsDown]);

    const renderPanelMain = useMemo(() => {
        if (xsDown && !botToken) return null;

        if (!botToken)
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "68px",
                            borderBottom: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <CurrentBalanceCard key={currentBalanceKey} />
                        <BrandExchangeV2
                            sx={{
                                borderRadius: 0,
                                width: "100%",
                                maxWidth: "263px",
                            }}
                            spaceBetween="0px"
                            padding="6px"
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <LetSelectedBot />
                    </Box>
                </Box>
            );

        return (
            <Box height="100%" overflow="hidden" display="flex" flexDirection="column" flexGrow={1}>
                {xsDown ? null : (
                    <>
                        <CurrentBalanceCard key={currentBalanceKey} />
                        <Divider />
                    </>
                )}
                {botProfile.id ? (
                    <ChatBoxV2
                        botToken={botToken}
                        botName={botProfile.botName}
                        avatar={botProfile.avatar || ""}
                        chatColor={botProfile.chatColor}
                        isPublic={Boolean(botProfile.isPublic)}
                        level={botProfile.level}
                        isOwner={botProfile.ownerToken === userToken}
                        isStoryIdRequired
                        toggleInformationPanel={() => setOpenInformation((prev) => !prev)}
                        onChargeMoney={() => setCurrentBalanceKey(uuidv4())}
                        onStartNewChat={refetch}
                    />
                ) : null}
            </Box>
        );
    }, [
        botProfile.avatar,
        botProfile.botName,
        botProfile.chatColor,
        botProfile.id,
        botProfile.isPublic,
        botProfile.level,
        botProfile.ownerToken,
        botToken,
        currentBalanceKey,
        refetch,
        userToken,
        xsDown,
    ]);

    const renderPanelRight = useMemo(() => {
        if (!openInformation) return null;

        const rightPanel = (
            <Box
                sx={{
                    borderLeft: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    height: "100%",
                    width: 230,
                    flexShrink: 0,
                }}
            >
                <BrandExchangeV2
                    sx={{
                        borderRadius: 0,
                        py: 1,
                        flexShrink: 0,
                    }}
                    spaceBetween="0px"
                />
                <Divider />
                <InformationCard
                    botToken={botToken}
                    botName={botProfile.botName}
                    avatar={botProfile.avatar || ""}
                    chatColor={botProfile.chatColor}
                    description={botProfile.description}
                    version={botProfile.version || ""}
                    tags={botProfile.tags || []}
                    language={botProfile.language || ""}
                    voiceId={botProfile.voiceId || ""}
                    isOwner={botProfile.ownerToken === userToken}
                    price={botProfile.price || 0}
                />
            </Box>
        );

        return (
            <>
                {lgDown ? (
                    <Drawer
                        open={openInformation}
                        anchor="right"
                        onClose={() => setOpenInformation(false)}
                    >
                        {rightPanel}
                    </Drawer>
                ) : (
                    rightPanel
                )}
            </>
        );
    }, [botProfile, botToken, lgDown, openInformation, userToken]);

    const renderContent = useMemo(() => {
        return (
            <>
                {renderPanelLeft}
                {renderPanelMain}
                {botToken ? renderPanelRight : null}
            </>
        );
    }, [botToken, renderPanelLeft, renderPanelMain, renderPanelRight]);

    return (
        <Box
            ref={chatPanelRef}
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {renderAppBar}
            {userBots.length === 0 && !isFiltering ? (
                <>
                    {isFetched ? (
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {renderMenuIcon}
                            <ChatEmpty />
                        </Box>
                    ) : (
                        <LoadingIcon open={true} />
                    )}
                </>
            ) : (
                <Box
                    sx={{
                        height: xsDown ? "calc(100vh - 68px)" : "100%",
                        display: "flex",
                    }}
                >
                    {renderContent}
                </Box>
            )}
        </Box>
    );
};

export default ChatPanel;
