import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
// import { useState } from 'react'
import { IconButton, styled } from '@mui/material'
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
    // const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    // const toggleDrawer = (newValue: boolean) => () => {
    //     setIsDrawerOpen(newValue);
    //     console.log(isDrawerOpen)
    // }

    return (
        <>
            <NavigationBarShift open={props.isDrawerOpen}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton onClick={props.toggleDrawer(!props.isDrawerOpen)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            TaleForge
                        </Typography>
                    </Toolbar>
                </AppBar>
            </NavigationBarShift>
            {/* <MainDrawer isOpen={props.isDrawerOpen} toggleDrawer={props.toggleDrawer}/> */}
        </>
    )
}

export { MainNavigationBar };