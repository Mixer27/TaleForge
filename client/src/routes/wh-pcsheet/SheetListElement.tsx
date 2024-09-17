import { IconButton, ListItem, ListItemButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    id: string,
    name: string,
    handleClick: (path: string) => void,
    handleRemoveClick: (id: string) => void,
}

const SheetListElement: React.FC<Props> = (props) => {
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => { props.handleClick(`/pcsheets/${props.id}`)}}>
                {props.name}
            </ListItemButton>
            <IconButton onClick={() => props.handleRemoveClick(props.id)}><DeleteIcon></DeleteIcon></IconButton>
        </ListItem>
    )
}

export { SheetListElement }