import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Armor } from "../../../types"
import { GridItem } from "../GridItem"
import { Paper } from "@mui/material"


interface Props {
    header: string,
    armor: Armor,
    // handleClick: (statName: string) => void,
}

// const nameFormat = (name: string | undefined) => {
//     let result = name ? name.replace(/([A-Z])/g, ' $1') : "";
//     result = result.charAt(0).toUpperCase() + result.slice(1);
//     return result;
// }

const ArmorItemTable: React.FC<Props> = (props) => {

    return (
        <GridItem>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{props.header}</TableCell>
                            <TableCell align="center">Obciążenie</TableCell>
                            <TableCell align="center">Cena</TableCell>
                            <TableCell align="center">Chronione lokacje</TableCell>
                            <TableCell align="center">PZ</TableCell>
                            <TableCell align="center">Dostępność</TableCell>
                            {/* <TableCell align="center">Opis</TableCell> */}
                        </TableRow>
                    </TableHead>
                    {props.armor.arms && <TableBody>
                        {Object.keys(props.armor).map((key: string) => (
                            <TableRow key={props.armor[key as keyof Armor].item._id}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{props.armor[key as keyof Armor].item.name}</TableCell>
                                <TableCell align="center">{props.armor[key as keyof Armor].item.weight}</TableCell>
                                <TableCell align="center">{props.armor[key as keyof Armor].item.value.gc != 0 ? props.armor[key as keyof Armor].item.value.gc + " zk" : ""} {props.armor[key as keyof Armor].item.value.sh != 0 ? props.armor[key as keyof Armor].item.value.sh + " s" : ""} {props.armor[key as keyof Armor].item.value.pn != 0 ? props.armor[key as keyof Armor].item.value.pn + " p" : ""}</TableCell>
                                <TableCell align="center">{props.armor[key as keyof Armor].coverLocation}</TableCell>
                                <TableCell align="center">{String(props.armor[key as keyof Armor].armor)}</TableCell>
                                <TableCell align="center">{props.armor[key as keyof Armor].item.availability}</TableCell>
                                {/* <TableCell align="center">{props.armor[key as keyof Armor].item.description}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>}
                </Table>
            </TableContainer>
        </GridItem>
    )
}


export { ArmorItemTable };