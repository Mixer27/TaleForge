import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { Item } from '../../../types'
import { useEffect, useState } from 'react';
import { SERVER_ADDRESS } from '../../../constants';
import { defaultItem } from '../../../utils/defaults';

interface Props {
    headerName: string,
    item: Item | null
    isOpen: boolean,
    handleClose: () => void,
    handleChange: (item: Item) => void,
    handleRemove: (removedItemId: string) => void,
}

const ItemDialog: React.FC<Props> = (props) => {
    const [item, setItem] = useState<Item>(props.item ?? defaultItem);
    const [items, setItems] = useState<Item[]>([]);

    // fetch armor items
    useEffect(() => {
        fetch(`${SERVER_ADDRESS}/items`)
            .then((res: Response) => {
                return res.json();
            })
            .then((data: Item[]) => {
                console.log(data);
                setItems(data);
            })
            .catch((error) => {
                console.error("Error fetching data!", error);
            })

    }, []);

    const onChange = (field: string, value: string) => {
        if (field in item.value) {
            const updateMoney = { ...item.value, [field]: Number(value) >= 0 ? Number(value) : 0 };
            const update = { ...item, value: updateMoney };
            console.log("value", update)
            setItem(update);
        }
        else {
            const update = { ...item, [field as keyof Item]: value }
            console.log("item", update)
            setItem(update)
        }
    }
    const onClose = () => {
        props.handleClose()
    }

    const onSave = () => {
        // if (props.stat) {
        console.log("update item", item);
        props.handleChange(item);
        onClose()
    }

    const onAutocompleteChange = (_event: any, newValue: Item | null) => {
        console.log(props.item, newValue)
        if (newValue) {
            console.log("import item", newValue);
            setItem({ ...newValue, _id: item._id });
            // props.handleChange(props.armorLocation, newValue);
        }
    }
    const onItemClear = () => {
        if (props.item) {
            console.log("clear item");
            setItem({...defaultItem, _id: item._id});
            // props.handleChange(props.armorLocation, emptyItem);
        }
    }
    const onItemRemove = () => {
        if (item._id) {
            console.log("remove item", item);
            props.handleRemove(item._id);
            onClose()
        }
    }

    return (
        // <form onSubmit={props.handleSubmit}>
        <Dialog open={props.isOpen} onClose={onClose} >
            <DialogTitle>Edytuj {props.headerName}</DialogTitle>
            <DialogContent>
                {props.item && (
                    <>
                        {/* {item._id ?? "null"} */}
                        <TextField
                            margin="dense"
                            label="Nazwa"
                            type="text"
                            fullWidth
                            value={item.name || ""}
                            onChange={(e) => onChange('name', e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Obciążenie"
                            type="number"
                            fullWidth
                            value={item.weight || ""}
                            onChange={(e) => onChange('weight', e.target.value)}
                        />
                        <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
                            <TextField
                                margin="dense"
                                label="zk"
                                type="number"
                                // fullWidth
                                value={item.value.gc || ""}
                                onChange={(e) => onChange('gc', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="s"
                                type="number"
                                // fullWidth
                                value={item.value.sh || ""}
                                onChange={(e) => onChange('sh', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="p"
                                type="number"
                                // fullWidth
                                value={item.value.pn || ""}
                                onChange={(e) => onChange('pn', e.target.value)}
                            />
                        </Stack>
                        <TextField
                            margin="dense"
                            label="Dostępność"
                            type="text"
                            fullWidth
                            value={item.availability || ""}
                            onChange={(e) => onChange('availability', e.target.value)}
                        />
                        <Autocomplete
                            autoHighlight
                            options={items}
                            onChange={onAutocompleteChange}
                            getOptionLabel={(option: Item) => option.name}
                            sx={{ mt: 2, width: 300 }}
                            renderInput={(params) => <TextField {...params} label="przedmiot" />}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onItemRemove} sx={{marginRight: "auto"}}>Usuń</Button>
                <Button onClick={onItemClear}>Wyczyść</Button>
                <Button onClick={onClose}>Anuluj</Button>
                <Button onClick={onSave} type='submit'>Zapisz</Button>
            </DialogActions>
        </Dialog>
        // </form>
    )
}

export { ItemDialog };