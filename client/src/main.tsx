import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import App from './App.tsx'
// import Home from './routes/home/Home.tsx';
// import About from './routes/about/About.tsx';
// import Test from './routes/test/Test.tsx';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'; 

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Home />
//     },
//     {
//         path: "/home",
//         element: <Home />
//     },
//     {
//         path: "/about",
//         element: <About />
//     },
//     {
//         path: "/test",
//         element: <Test />
//     }
// ])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CssBaseline enableColorScheme />
        <App />
        {/* <RouterProvider router={router} /> */}
    </React.StrictMode>,
)
