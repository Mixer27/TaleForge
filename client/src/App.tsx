import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/home/Home.tsx';
import About from './routes/about/About.tsx';
import Test from './routes/test/Test.tsx';
import { Sheet } from './routes/pcsheets/Sheet.tsx';
import { MainNavigationBar } from './components/overlay/MainNavigationBar.tsx';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { DRAWER_WIDTH } from './constatns.tsx';
import { useState } from 'react';
import { MainDrawer } from './components/overlay/MainDrawer.tsx';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${DRAWER_WIDTH}px`,
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
        element: <Sheet />
    },
    {
        path: "/pcsheets/:id",
        element: <Sheet />
    }
])

function App() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (newValue: boolean) => () => {
        setIsDrawerOpen(newValue);
        console.log(isDrawerOpen);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline>
                <Box sx={{ display: 'flex' }}>
                    <MainDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
                    <Box sx={{ flexGrow: 1 }}>
                        {/* <NavigationBarShift open={isDrawerOpen}> */}
                            <MainNavigationBar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
                        {/* </NavigationBarShift> */}
                        <Main open={isDrawerOpen} onClick={toggleDrawer(false)}>
                            <RouterProvider router={router} />
                        </Main>
                    </Box>
                </Box>
            </CssBaseline>

        </ThemeProvider >
    )
}

export default App
