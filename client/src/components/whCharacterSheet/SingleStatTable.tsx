import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import { GridItem } from "./GridItem"
import { SingleStat } from "../../types";

interface SingleStatWKey {
    key: string,
    stat: SingleStat,
}

interface Props {
    header: string,
    stats: Array<SingleStatWKey>
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
                        {props.stats?.map((stat: SingleStatWKey) => (
                            <TableRow key={stat.key}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => props.handleClick(String(stat.key))}>
                                <TableCell>{nameFormat(stat.stat.name)}</TableCell>
                                <TableCell align="center">{stat.stat.current}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </GridItem>
    )
}


export { SingleStatTable };