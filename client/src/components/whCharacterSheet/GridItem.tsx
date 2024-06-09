import { Paper } from "@mui/material"
import { ReactNode } from "react"

const GridItem: React.FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <Paper elevation={6} sx={{ padding: 0 }}>
            {children}
        </Paper>
    )
}

export { GridItem }