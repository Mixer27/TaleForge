import { ListItemButton } from "@mui/material";

interface Props {
    detail: string
    handleClick: () => void,
}

const DetailItem: React.FC<Props> = (props) => {

    return (
        <ListItemButton onClick={props.handleClick}>
            {props.detail}
        </ListItemButton>
    )
}

export { DetailItem };