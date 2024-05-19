import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/home/Home.tsx';
import About from './routes/about/About.tsx';
import Test from './routes/test/Test.tsx';
import { Sheet } from './routes/pcsheets/Sheet.tsx';

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

    return (
        <>
        <RouterProvider router={router} />
            
        </>
    )
}

export default App
