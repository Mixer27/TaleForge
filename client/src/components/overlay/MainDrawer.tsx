import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCommentIcon from '@mui/icons-material/AddComment';
import Drawer from "@mui/material/Drawer";
import { DRAWER_WIDTH } from "../../constatns";
import { useMediaQuery, useTheme, Theme } from "@mui/material";
import React from "react";

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

    const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (isBelowMd) {
            props.toggleDrawer(false)(event);
        }
    };

    const DrawerList = (
        <Box sx={{ width: DRAWER_WIDTH }} role="presentation" onClick={toggleDrawer()}>
            <List>
                {['Home', 'Campaigns', 'Characters', 'Beastiary', 'Rule Book', 'About'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
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
            <Drawer open={props.isOpen} onClose={props.toggleDrawer(false)} variant="persistent" color="secondary">
                {DrawerList}
            </Drawer>
        </>
    )
}

export { MainDrawer };