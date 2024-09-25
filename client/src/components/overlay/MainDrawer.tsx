import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCommentIcon from '@mui/icons-material/AddComment';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import Drawer from "@mui/material/Drawer";
import { DRAWER_WIDTH } from "../../constants";
import { useMediaQuery, useTheme, Theme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DrawerListItem } from "./DrawerListItem";
import { useDisplayThemeContext } from "../../context/DisplayThemeContext";
import ContrastIcon from '@mui/icons-material/Contrast';

interface Props {
    isOpen: boolean,
    toggleDrawer: (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

declare module '@mui/material/styles' {
    interface CustomTheme extends Theme { }
}

const MainDrawer: React.FC<Props> = (props) => {
    const theme: Theme = useTheme()
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const { toggleMode } = useDisplayThemeContext();
    const routeChange = (path: string) => {
        navigate(path);
    }

    const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (isBelowMd) {
            props.toggleDrawer(false)(event);
        }
    };

    const DrawerList = (
        <Box sx={{ width: DRAWER_WIDTH }} role="presentation" onClick={toggleDrawer()}>
            {/* <List sx={{ backgroundColor: mode === 'light' ? "#4d1f1c" : '' }}> */}
            <List>
            <DrawerListItem value="Główna" handleClick={() => { routeChange("/home") }} customIcon={HomeIcon} />
                <DrawerListItem value="Postacie" handleClick={() => { routeChange("/pcsheets") }} customIcon={GroupsIcon} />
                <DrawerListItem value="Zmień tryb" handleClick={() => { toggleMode() }} customIcon={ContrastIcon} />
                {['Kampanie', 'Bestiariusz', 'Księga zasad', 'O projekcie'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <AddCommentIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            {/* <Drawer PaperProps={{ sx: { backgroundColor: mode === 'light' ? "#3a1c1a" : '' } }} */}
            <Drawer
                open={props.isOpen}
                onClose={props.toggleDrawer(false)}
                variant="persistent"
                color="secondary">
                {DrawerList}
            </Drawer>
        </>
    )
}

export { MainDrawer };