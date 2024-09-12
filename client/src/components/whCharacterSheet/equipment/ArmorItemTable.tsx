import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Armor, ArmorItem } from "../../../types"
import { GridItem } from "../GridItem"
import { Paper } from "@mui/material"
import { useState } from "react"
import { ArmorDialog } from "./ArmorDialog"

interface Props {
    header: string,
    armor: Armor,
    handleArmorChange: (location: keyof Armor, updatedArmorItem: ArmorItem) => void
}

// const nameFormat = (name: string | undefined) => {
//     let result = name ? name.replace(/([A-Z])/g, ' $1') : "";
//     result = result.charAt(0).toUpperCase() + result.slice(1);
//     return result;
// }

const ArmorItemTable: React.FC<Props> = (props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedArmorLocation, setSelectedArmorLocation] = useState<keyof Armor | null>(null);

    const onClick = (location: keyof Armor) => {
        console.log(location);
        setSelectedArmorLocation(location);
        setIsDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    }
    return (
        <>
            <GridItem>
                <TableContainer component={Paper}>
                    {props.armor.arms && <Table>
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
                        <TableBody>
                            {Object.keys(props.armor).map((key: string) => (
                                <TableRow key={props.armor[key as keyof Armor].item._id}
                                    hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => onClick(key as keyof Armor)}
                                >
                                    <TableCell>{props.armor[key as keyof Armor].item.name}</TableCell>
                                    <TableCell align="center">{props.armor[key as keyof Armor].item.weight}</TableCell>
                                    <TableCell align="center">{props.armor[key as keyof Armor].item.value.gc != 0 ? props.armor[key as keyof Armor].item.value.gc + " zk" : ""} {props.armor[key as keyof Armor].item.value.sh != 0 ? props.armor[key as keyof Armor].item.value.sh + " s" : ""} {props.armor[key as keyof Armor].item.value.pn != 0 ? props.armor[key as keyof Armor].item.value.pn + " p" : ""}</TableCell>
                                    <TableCell align="center">{props.armor[key as keyof Armor].coverLocation.join(', ')}</TableCell>
                                    <TableCell align="center">{String(props.armor[key as keyof Armor].armor)}</TableCell>
                                    <TableCell align="center">{props.armor[key as keyof Armor].item.availability}</TableCell>
                                    {/* <TableCell align="center">{props.armor[key as keyof Armor].item.description}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>}
                </TableContainer>
            </GridItem>
            {
                isDialogOpen && <ArmorDialog
                    headerName="Edytuj pancerz"
                    armor={props.armor[selectedArmorLocation ?? "head"]}
                    armorLocation={selectedArmorLocation}
                    isOpen={isDialogOpen}
                    handleClose={handleCloseDialog}
                    handleChange={props.handleArmorChange}
                />
            }
        </>
    )
}


export { ArmorItemTable };