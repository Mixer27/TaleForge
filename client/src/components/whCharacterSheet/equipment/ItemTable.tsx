import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Item } from "../../../types"
import { GridItem } from "../GridItem"
import { Paper } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { ItemDialog } from "./ItemDialog";


interface Props {
    header: string,
    items: Item[],
    handleChange: (updatadItem: Item) => void,
    handleAddItem: (addedItem: Item) => void,
    handleRemoveItem: (removedItemId: string) => void,
}

const emptyItem: Item = {
    name: "-",
    description: "-",
    value: { gc: 0, sh: 0, pn: 0 },
    weight: 0,
    availability: "-",
}

const ItemTable: React.FC<Props> = (props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const handleClick = (item: Item) => {
        console.log("item", selectedItem)
        setSelectedItem(item);
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
                                <TableCell align="center">Obciążenie</TableCell>
                                <TableCell align="center">Cena</TableCell>
                                <TableCell align="center">Dostępność</TableCell>
                                {/* <TableCell align="center">Opis</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.items.map((item: Item) => (
                                <TableRow key={item._id ?? "new"}
                                    hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => handleClick(item)}
                                >
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="center">{item.weight}</TableCell>
                                    <TableCell align="center">{item.value.gc != 0 ? item.value.gc + " zk" : ""} {item.value.sh != 0 ? item.value.sh + " s" : ""} {item.value.pn != 0 ? item.value.pn + " p" : ""}</TableCell>
                                    <TableCell align="center">{item.availability}</TableCell>
                                    {/* <TableCell align="center">{item.description}</TableCell> */}
                                </TableRow>
                            ))}
                            <TableRow hover onClick={() => props.handleAddItem(emptyItem)}>
                                <TableCell align="center" colSpan={4}>dodaj przedmiot<AddIcon fontSize="inherit" /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </GridItem>
            {isDialogOpen && <ItemDialog
                headerName="przedmiot"
                item={selectedItem}
                isOpen={isDialogOpen}
                handleChange={props.handleChange}
                handleClose={handleCloseDialog}
                handleRemove={props.handleRemoveItem}
            />}
        </>
    )
}


export { ItemTable };