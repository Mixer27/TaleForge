// import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx';
import { DisplayThemeContextProvider } from './context/DisplayThemeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <AuthContextProvider>
        <DisplayThemeContextProvider>
            <App />
        </DisplayThemeContextProvider>
    </AuthContextProvider>
    // </React.StrictMode>,
)