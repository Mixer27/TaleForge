import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
// import { useState } from 'react'
import { Box, IconButton, Link, styled } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { DRAWER_WIDTH } from '../../constatns';

interface Props {
    isDrawerOpen: boolean,
    toggleDrawer: (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const NavigationBarShift = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({

    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
    }),
}));

const MainNavigationBar: React.FC<Props> = (props) => {

    return (
        <>
            <NavigationBarShift open={props.isDrawerOpen}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static" sx={{backgroundColor: "#222"}} elevation={0}>
                        <Toolbar>
                            <IconButton onClick={props.toggleDrawer(!props.isDrawerOpen)} sx={{marginRight: 1}}>
                                <MenuIcon />
                            </IconButton>
                            <Link href="/home" variant='h6' underline='none' color="inherit" >TaleForge</Link>
                            <Typography variant="h6" sx={{ marginLeft: "auto" }}>User</Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
            </NavigationBarShift>
            {/* <MainDrawer isOpen={props.isDrawerOpen} toggleDrawer={props.toggleDrawer}/> */}
        </>
    )
}

export { MainNavigationBar };