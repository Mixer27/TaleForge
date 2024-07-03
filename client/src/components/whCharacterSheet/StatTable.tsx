import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { PlayerStat } from "../../types"
import { GridItem } from "./GridItem"
import { Paper } from "@mui/material"

interface Stat {
    statName?: string,
    extendedStat?: PlayerStat,
}

interface Props {
    header: string,
    stats: Array<Stat>,
    handleClick: (statName: string) => void,
}

const nameFormat = (name: string | undefined) => {
    let result = name ? name.replace(/([A-Z])/g, ' $1') : "";
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
}

const StatTable: React.FC<Props> = (props) => {
    // const handleClick = (stat: Stat) => {
    //     console.log(stat.statName);
    // }

    return (
        <GridItem>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Stat name</TableCell>
                            <TableCell align="center">Starting</TableCell>
                            <TableCell align="center">Advance</TableCell>
                            <TableCell align="center">Current</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.stats?.map((stat: Stat) => (
                            <TableRow key={stat.statName}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => props.handleClick(String(stat.statName))}>
                                <TableCell>{nameFormat(stat.statName)}</TableCell>
                                <TableCell align="center">{stat.extendedStat?.starting}</TableCell>
                                <TableCell align="center">{stat.extendedStat?.advance}</TableCell>
                                <TableCell align="center">{stat.extendedStat?.current}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </GridItem>
    )
}


export { StatTable };