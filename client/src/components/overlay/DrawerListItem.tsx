import { ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/types"
import React from "react"

interface Props {
    value: string,
    handleClick: () => void,
    customIcon: OverridableComponent<SvgIconTypeMap>,
}

const DrawerListItem: React.FC<Props> = (props) => {

    return (
        <ListItem key={props.value} disablePadding>
            <ListItemButton onClick={props.handleClick}>
                <ListItemIcon>
                    <props.customIcon/>
                </ListItemIcon>
                <ListItemText primary={props.value} />
            </ListItemButton>
        </ListItem>
    )
}

export { DrawerListItem }