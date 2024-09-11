import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Item } from "../../../types"
import { GridItem } from "../GridItem"
import { Paper } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';


interface Props {
    header: string,
    items: Item[],
    // handleClick: (statName: string) => void,
}

// const nameFormat = (name: string | undefined) => {
//     let result = name ? name.replace(/([A-Z])/g, ' $1') : "";
//     result = result.charAt(0).toUpperCase() + result.slice(1);
//     return result;
// }

const ItemTable: React.FC<Props> = (props) => {

    return (
        <GridItem>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{props.header}</TableCell>
                            <TableCell align="center">Obciążenie</TableCell>
                            <TableCell align="center">Cena</TableCell>
                            <TableCell align="center">Dostępność</TableCell>
                            {/* <TableCell align="center">Opis</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.items.map((item: Item) => (
                            <TableRow key={item._id}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="center">{item.weight}</TableCell>
                                <TableCell align="center">{item.value.gc != 0 ? item.value.gc + " zk" : ""} {item.value.sh != 0 ? item.value.sh + " s" : ""} {item.value.pn != 0 ? item.value.pn + " p" : ""}</TableCell>
                                <TableCell align="center">{item.availability}</TableCell>
                                {/* <TableCell align="center">{item.description}</TableCell> */}
                            </TableRow>
                        ))}
                        <TableRow hover>
                            <TableCell align="center" colSpan={4}>dodaj przedmiot<AddIcon fontSize="inherit"/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </GridItem>
    )
}


export { ItemTable };