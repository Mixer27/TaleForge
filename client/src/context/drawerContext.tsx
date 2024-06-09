import { createContext } from "react"

interface drawerContextType {
    isDrawerOpen: boolean,
    toggleDrawer: (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void,
}

const DrawerContext = createContext<drawerContextType>({isDrawerOpen: false, toggleDrawer: () => () => {}})

export { DrawerContext }