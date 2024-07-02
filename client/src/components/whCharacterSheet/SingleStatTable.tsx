import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import { GridItem } from "./GridItem"


interface Stat {
    statName?: string,
    singleStat?: number,
}

interface Props {
    header: string,
    stats: Array<Stat>
}

const SingleStatTable: React.FC<Props> = (props) => {
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
                                <TableCell align="center">{stat.singleStat}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </GridItem>
    )
}


export { SingleStatTable };