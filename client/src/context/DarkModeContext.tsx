import { createContext } from "react"

interface DarkModeContextType {
    isDrawerOpen: boolean,
    toggleDrawer: (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void,
}

const DarkModeContext = createContext<DarkModeContextType>({ isDrawerOpen: false, toggleDrawer: () => () => { } });

export { DarkModeContext };