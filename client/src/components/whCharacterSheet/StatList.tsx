import { List, ListItem, ListItemButton, ListSubheader, styled } from "@mui/material"
import { PlayerStat } from "../../types"
import { GridItem } from "./GridItem"

interface Stat {
    statName?: string,
    extendedStat?: PlayerStat,
    singleStat?: number
}

interface Props {
    header: string,
    stats: Array<Stat>
}

const CustomListSubheader = styled(ListSubheader)(() => ({
   backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11))", 
}))

const StatList: React.FC<Props> = (props) => {

    return (
        <GridItem>
            <List>
                <CustomListSubheader>{props.header}</CustomListSubheader>
                {props.stats?.map((stat: Stat) => (
                    <ListItem disablePadding key={stat.statName}>
                        <ListItemButton>{stat.statName} {stat?.singleStat} {stat.extendedStat?.starting} {stat.extendedStat?.advance} {stat.extendedStat?.current}</ListItemButton>
                    </ListItem>
                ))}
            </List>
        </GridItem>
    )
}

export { StatList };