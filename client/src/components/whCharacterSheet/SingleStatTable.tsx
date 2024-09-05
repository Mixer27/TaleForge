import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import { GridItem } from "./GridItem"


interface Stat {
    statName?: string,
    singleStat?: number,
}

interface Props {
    header: string,
    stats: Array<Stat>
    handleClick: (statName: string) => void,
}

const nameFormat = (name: string | undefined) => {
    let result = name ? name.replace(/([A-Z])/g, ' $1') : "";
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
}

const SingleStatTable: React.FC<Props> = (props) => {
    // const handleClick = (stat: Stat) => {
    //     console.log(stat.statName);
    // }

    return (
        <GridItem>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{props.header}</TableCell>
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