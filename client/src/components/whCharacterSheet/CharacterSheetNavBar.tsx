import { AppBar, Box, Tab, Tabs, Toolbar, styled } from "@mui/material";
import React from "react";
import { CharacterSheetTab } from "../../types";
import { useDisplayThemeContext } from "../../context/DisplayThemeContext";

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
    const { mode } = useDisplayThemeContext();
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: mode === "dark" ? "#212121" : "#532f28" }}>
                    <Toolbar variant="dense">
                        <Tabs sx={{ flexGrow: 1 }} variant="scrollable" value={props.currentTab} onChange={props.handleChange}>
                            <NavBarButton value={CharacterSheetTab.Stats} label="Cechy" />
                            <NavBarButton value={CharacterSheetTab.Skills} label="Umiejętności" />
                            <NavBarButton value={CharacterSheetTab.Talents} label="Zdolności" />
                            <NavBarButton value={CharacterSheetTab.Spells} label="Czary" />
                            <NavBarButton value={CharacterSheetTab.Inventory} label="Ekwipunek" />
                            <NavBarButton value={CharacterSheetTab.Details} label="Szczegóły" />
                        </Tabs>
                    </Toolbar>
                </AppBar>
            </Box >
        </>
    )
}

export { CharacterSheetNavBar };