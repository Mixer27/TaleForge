import { AppBar, Box, Tab, Tabs, Toolbar, styled } from "@mui/material";
import React from "react";
import { CharacterSheetTab } from "../../types";

const NavBarButton = styled(Tab)(() => ({
    color: "white",
    display: "block",
    flexGrow: 1,
}))

interface Props {
    currentTab: string,
    handleChange: (event: React.SyntheticEvent, newValue: string) => void,
    isDrawerOpen: boolean,
}

const CharacterSheetNavBar: React.FC<Props> = (props) => {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#222" }} elevation={2}>
                    <Toolbar variant="dense">
                        <Tabs sx={{ flexGrow: 1 }} variant="scrollable" value={props.currentTab} onChange={props.handleChange}>
                            <NavBarButton value={CharacterSheetTab.Stats} label="Stats" />
                            <NavBarButton value={CharacterSheetTab.Skills} label="Skills" />
                            <NavBarButton value={CharacterSheetTab.Talents} label="Talents" />
                            <NavBarButton value={CharacterSheetTab.Spells} label="Spells" />
                            <NavBarButton value={CharacterSheetTab.Inventory} label="Inventory" />
                            <NavBarButton value={CharacterSheetTab.Details} label="Details" />
                        </Tabs>
                    </Toolbar>
                </AppBar>
            </Box >
        </>
    )
}

export { CharacterSheetNavBar };