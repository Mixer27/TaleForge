import { ListItem, ListItemButton } from "@mui/material"


interface Props {
    id: string,
    name: string,
    handleClick: (path: string) => void,
}

const SheetListElement: React.FC<Props> = (props) => {
    return (
        <ListItem onClick={() => { props.handleClick(`/pcsheets/${props.id}`)}} disablePadding>
            <ListItemButton >
                {props.name}
            </ListItemButton>
        </ListItem>
    )
}

export { SheetListElement }