import { List, ListItem, ListItemButton } from "@mui/material"
import { PlayerStat } from "../../types"
import { GridItem } from "./GridItem"

interface Stat {
    statName?: string,
    extendedStat?: PlayerStat,
    singleStat?: number
}

interface Props {
    stats: Array<Stat>
}

const StatList: React.FC<Props> = (props) => {

    return (
        <GridItem>
            <List>
                {props.stats?.map((stat: Stat) => (
                    <ListItem disablePadding>
                        <ListItemButton>{stat.statName} {stat?.singleStat} {stat.extendedStat?.starting} {stat.extendedStat?.advance} {stat.extendedStat?.current}</ListItemButton>
                    </ListItem>
                ))}
            </List>
        </GridItem>
    )
}

export { StatList };