import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Box, IconButton, Stack, styled } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { DRAWER_WIDTH } from '../../constants';
import { DrawerContext } from '../../context/drawerContext';
import { useContext } from 'react';
import { MainDrawer } from './MainDrawer';
import { useAuth } from '../../context/AuthContext';
import { LogoutButton } from '../auth/LogoutButon';

interface Props {
    headerText?: string,
    options?: React.ReactNode
}

const NavigationBarShift = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({

    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    width: "100%",
    ...(open && {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: `${DRAWER_WIDTH}px`,
        },
    }),
}));

const MainNavigationBar: React.FC<Props> = (props) => {
    const drawerContext = useContext(DrawerContext);
    const { username } = useAuth();

    return (
        <>
            <MainDrawer isOpen={drawerContext.isDrawerOpen} toggleDrawer={drawerContext.toggleDrawer} />
            <NavigationBarShift open={drawerContext.isDrawerOpen} sx={{ marginBottom: props.options ? "2em" : 0 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" elevation={0}>
                        <Toolbar>
                            <IconButton onClick={drawerContext.toggleDrawer(!drawerContext.isDrawerOpen)} sx={{ marginRight: 1 }}>
                                <MenuIcon sx={{ color: "#FFF" }} />
                            </IconButton>
                            <Typography variant="h6">{props?.headerText}</Typography>
                            <Stack direction="row" spacing={1} sx={{ marginLeft: "auto", alignItems: "center" }}>
                                {username && <>
                                    <Typography variant="h6" sx={{}}>{username}</Typography>
                                    <LogoutButton />
                                </>
                                }
                            </Stack>
                        </Toolbar>
                    </AppBar>
                </Box>
                {props.options && (
                    props.options
                )}
            </NavigationBarShift>
        </>
    )
}

export { MainNavigationBar };