import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
// import { useState } from 'react'
import { Box, IconButton, styled } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { DRAWER_WIDTH } from '../../constants';
import { DrawerContext } from '../../context/drawerContext';
import { useContext, useEffect, useState } from 'react';
import { MainDrawer } from './MainDrawer';

interface Props {
    // isDrawerOpen: boolean,
    // toggleDrawer: (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
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
    const [username, setUsername] = useState("");

    useEffect(() => {
        try {

            fetch('https://devproj3ct.pl:9000/auth/session', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setUsername(data.username);
                    console.log(data)
                });
        } catch (err) {
            console.log("error with checking session", err);
        }
    }, [])

    return (
        <>
            <MainDrawer isOpen={drawerContext.isDrawerOpen} toggleDrawer={drawerContext.toggleDrawer} />
            <NavigationBarShift open={drawerContext.isDrawerOpen} sx={{marginBottom: props.options ? "2em" : 0 }}>
                <Box sx={{ flexGrow: 1}}>
                    <AppBar position="static" sx={{ backgroundColor: "#222" }} elevation={0}>
                        <Toolbar>
                            <IconButton onClick={drawerContext.toggleDrawer(!drawerContext.isDrawerOpen)} sx={{ marginRight: 1 }}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6">{props?.headerText}</Typography>
                            <Typography variant="h6" sx={{ marginLeft: "auto" }}>{username}</Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                {props.options && (
                    props.options
                )}
            </NavigationBarShift>
            {/* <MainDrawer isOpen={props.isDrawerOpen} toggleDrawer={props.toggleDrawer}/> */}
        </>
    )
}

export { MainNavigationBar };