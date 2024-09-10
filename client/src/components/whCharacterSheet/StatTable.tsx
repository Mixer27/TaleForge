import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { PlayerStat } from "../../types"
import { GridItem } from "./GridItem"
import { Paper } from "@mui/material"

interface Stat {
    key: string
    stat: PlayerStat,
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

    return (
        <GridItem>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{props.header}</TableCell>
                            <TableCell align="center">Startowa</TableCell>
                            <TableCell align="center">Rozwój</TableCell>
                            <TableCell align="center">Obecna</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.stats?.map((stat: Stat) => (
                            <TableRow key={stat.key}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => props.handleClick(String(stat.key))}>
                                <TableCell>{nameFormat(stat.stat.name)}</TableCell>
                                <TableCell align="center">{stat.stat.starting}</TableCell>
                                <TableCell align="center">{stat.stat.advance}</TableCell>
                                <TableCell align="center">{stat.stat.current}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </GridItem>
    )
}


export { StatTable };