import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCommentIcon from '@mui/icons-material/AddComment';
import Drawer from "@mui/material/Drawer";
import { DRAWER_WIDTH } from "../../constatns";

interface Props {
    isOpen: boolean,
    toggleDrawer: (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const MainDrawer: React.FC<Props> = (props) => {

    const DrawerList = (
        <Box sx={{ width: DRAWER_WIDTH }} role="presentation" onClick={props.toggleDrawer(false)}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
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
            <Drawer open={props.isOpen} onClose={props.toggleDrawer(false)} variant="persistent">
                {DrawerList}
            </Drawer>
        </>
    )
}

export { MainDrawer };