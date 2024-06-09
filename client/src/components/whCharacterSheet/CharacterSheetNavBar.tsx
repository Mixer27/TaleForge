import { AppBar, Box, Button, Toolbar, styled } from "@mui/material";
import React from "react";

const NavBarButton = styled(Button)(() => ({
    color: "white",
    display: "block",
    flexGrow: 1,
}))

const CharacterSheetNavBar: React.FC = () => {


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#222" }} elevation={2}>
                    <Toolbar variant="dense">
                        <NavBarButton>Stats</NavBarButton>
                        <NavBarButton>Skills</NavBarButton>
                        <NavBarButton>Talents</NavBarButton>
                        <NavBarButton>Spells</NavBarButton>
                        <NavBarButton>Inventory</NavBarButton>
                        <NavBarButton>Details</NavBarButton>
                    </Toolbar>
                </AppBar>
            </Box >
        </>
    )
}

export { CharacterSheetNavBar };