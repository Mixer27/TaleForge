import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { WeaponItem } from "../../../types"
import { GridItem } from "../GridItem"
import { Paper } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { WeaponDialog } from "./WeaponDialog";
import { defaultWeapon } from "../../../utils/defaults";


interface Props {
    header: string,
    items: WeaponItem[],
    handleChangeWeapon: (updatadItem: WeaponItem) => void,
    handleAddWeapon: (addedItem: WeaponItem) => void,
    handleRemoveWeapon: (removedItemId: string) => void,
}

const WeaponItemTable: React.FC<Props> = (props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedWeapon, setSelectedWeapon] = useState<WeaponItem | null>(null);

    const handleClick = (weapon: WeaponItem) => {
        console.log("weapon", selectedWeapon)
        setSelectedWeapon(weapon);
        setIsDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    }

    return (
        <>
            <GridItem>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{props.header}</TableCell>
                                <TableCell align="center">Cena</TableCell>
                                <TableCell align="center">Obciążenie</TableCell>
                                <TableCell align="center">Kategoria</TableCell>
                                <TableCell align="center">Siła broni</TableCell>
                                <TableCell align="center">Zasięg</TableCell>
                                <TableCell align="center">Przeładowanie</TableCell>
                                <TableCell align="center">Cechy Oręża</TableCell>
                                <TableCell align="center">Dostępność</TableCell>
                                {/* <TableCell align="center">Opis</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.items.map((weapon: WeaponItem) => (
                                <TableRow key={weapon._id}
                                    hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => handleClick(weapon)}
                                >
                                    <TableCell>{weapon.item.name}</TableCell>
                                    <TableCell align="center">{weapon.item.value.gc != 0 ? weapon.item.value.gc + " zk" : ""} {weapon.item.value.sh != 0 ? weapon.item.value.sh + " s" : ""} {weapon.item.value.pn != 0 ? weapon.item.value.pn + " p" : ""}</TableCell>
                                    <TableCell align="center">{weapon.item.weight}</TableCell>
                                    <TableCell align="center">{weapon.category}</TableCell>
                                    <TableCell align="center">{weapon.strength}</TableCell>
                                    <TableCell align="center">{weapon.range}</TableCell>
                                    <TableCell align="center">{weapon.reload}</TableCell>
                                    <TableCell align="center">{weapon.weaponFeatures}</TableCell>
                                    <TableCell align="center">{weapon.item.availability}</TableCell>
                                    {/* <TableCell align="center">{weapon.item.description}</TableCell> */}
                                </TableRow>
                            ))}
                            <TableRow hover onClick={() => props.handleAddWeapon(defaultWeapon)}>
                                <TableCell align="center" colSpan={9}>dodaj przedmiot<AddIcon fontSize="inherit" /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </GridItem>
            {isDialogOpen && <WeaponDialog
                headerName={"broń"}
                weapon={selectedWeapon}
                isOpen={isDialogOpen}
                handleClose={handleCloseDialog}
                handleChange={props.handleChangeWeapon}
                handleRemove = {props.handleRemoveWeapon}
            />}
        </>
    )
}


export { WeaponItemTable };