import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/home/Home.tsx';
import About from './routes/about/About.tsx';
import Test from './routes/test/Test.tsx';
import { Sheet } from './routes/pcsheets/Sheet.tsx';
import { WHPcSheet } from './routes/wh-pcsheet/WHPcSheet.tsx';
// import { MainNavigationBar } from './components/overlay/MainNavigationBar.tsx';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { Box, CssBaseline, useMediaQuery, Theme, useTheme } from '@mui/material';
import { DRAWER_WIDTH } from './constants.tsx';
import { useState } from 'react';
import { DrawerContext } from './context/drawerContext.tsx';
import { SheetsList } from './routes/wh-pcsheet/SheetList.tsx';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: "4em",
    marginLeft: 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: `${DRAWER_WIDTH}px`,
        }
    }),
}));


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/test",
        element: <Test />
    },
    {
        path: "/pcsheets",
        element: <SheetsList />
    },
    {
        path: "/pcsheets/:id",
        element: <WHPcSheet />
    },
    {
        path: "/old-pcsheets/:id",
        element: <Sheet/>
    }
])

function App() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const theme: Theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = (newValue: boolean) => () => {
        setIsDrawerOpen(newValue);
    }
    const handleMainToggleDrawer = () => {
        if (isBelowMd && isDrawerOpen) {
            setIsDrawerOpen(false);
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline>
                <Box sx={{ display: 'flex' }}>
                    {/* <Box sx={{ flexGrow: 1 }}> */}
                    <Main open={isDrawerOpen} onClick={handleMainToggleDrawer}>
                        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
                            <RouterProvider router={router} />
                        </DrawerContext.Provider>
                    </Main>
                    {/* </Box> */}
                </Box>
            </CssBaseline>
        </ThemeProvider >
    )
}

export default App
