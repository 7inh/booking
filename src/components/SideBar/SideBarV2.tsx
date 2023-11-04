import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { useMemo } from "react";
import AccountMenu from "src/components/SideBar/AccountMenu";
import Logo from "src/components/SideBar/Logo";
import NavSectionVertical from "src/components/SideBar/NavSectionVertical";
import NavToggleButton from "src/components/SideBar/NavToggleButton";
import SideBarContainer from "src/components/SideBar/SideBarContainer";
import SocialAndDownloadLink from "src/components/SideBar/SocialAndDownloadLink";
import { NAV } from "src/components/SideBar/const";
import { useNavContext } from "src/contexts/NavContext";
import useGetAccountInfoV2 from "src/hooks/useGetAccountInfoV2";
import { useNavData } from "src/hooks/useNavData";

export default function SideBarV2() {
    const { open } = useNavContext();
    const navData = useNavData();
    const { account } = useGetAccountInfoV2({});

    const renderMenu = useMemo(() => {
        return (
            <>
                <Box>
                    <Logo />
                    <NavSectionVertical
                        data={navData}
                        sx={{}}
                        config={{
                            currentRole: "admin",
                        }}
                    />
                </Box>
            </>
        );
    }, [navData]);

    const renderSocialAndDownloadLink = useMemo(() => {
        return <SocialAndDownloadLink />;
    }, []);

    const renderAccountMenu = useMemo(() => {
        return (
            <Box>
                <Divider></Divider>
                <AccountMenu
                    account={{
                        displayName: account.displayName,
                        avatar: account.avatar || "",
                        email: account.email,
                    }}
                />
            </Box>
        );
    }, [account]);

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: open ? NAV.W_VERTICAL : NAV.W_MINI,
            }}
            display="flex"
            flexDirection="column"
        >
            <NavToggleButton />
            <SideBarContainer>
                {renderMenu}
                {renderSocialAndDownloadLink}
                {renderAccountMenu}
            </SideBarContainer>
        </Box>
    );
}
