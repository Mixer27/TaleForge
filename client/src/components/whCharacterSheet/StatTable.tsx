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
    stats: Array<Stat>
}

const StatTable: React.FC<Props> = (props) => {
    const handleClick = (stat: Stat) => {
        console.log(stat.statName);
    }

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
                                onClick={() => handleClick(stat)}>
                                <TableCell>{stat.statName}</TableCell>
                                <TableCell align="center">{stat.extendedStat?.starting}</TableCell>
                                <TableCell align="center">{stat.extendedStat?.starting}</TableCell>
                                <TableCell align="center">{stat.extendedStat?.starting}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </GridItem>
    )
}


export { StatTable };