import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { Armor, ArmorItem, ArmorLocations } from '../../../types'
import { useEffect, useState } from 'react';

interface Props {
    headerName: string,
    armor: ArmorItem
    isOpen: boolean,
    armorLocation: keyof Armor | null
    // handleChange?: (field: string, value: string) => void,
    handleChange: (location: keyof Armor, armorItem: ArmorItem) => void,
    handleClose: () => void,
    // handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

const emptyItem: ArmorItem = {
    item: {
        name: "-",
        description: "-",
        value: { gc: 0, sh: 0, pn: 0 },
        weight: 0,
        availability: "-",
    },
    armor: 0,
    coverLocation: ["wszystkie"],
}

const ArmorDialog: React.FC<Props> = (props) => {
    const [armor, setArmor] = useState<ArmorItem>(props.armor);
    const [items, setItems] = useState<ArmorItem[]>([]);

    // fetch armor items
    useEffect(() => {
        fetch(`https://uwu.sex.pl:9000/items/armors`)
            .then((res: Response) => {
                return res.json();
            })
            .then((data: ArmorItem[]) => {
                console.log(data);
                setItems(data);
            })
            .catch((error) => {
                console.error("Error fetching data!", error);
            })

    }, []);

    const onArmorChange = (field: string, value: string) => {
        if (field in armor.item.value) {
            const updateMoney = { ...armor.item.value, [field]: Number(value) >= 0 ? Number(value) : 0 };
            const update = { ...armor.item, value: updateMoney };
            console.log("value", update)
            setArmor({ ...armor, item: update });
        }
        else if (field in armor.item) {
            const update = { ...armor.item, [field]: value }
            console.log("item", update)
            setArmor({ ...armor, item: update });
        }
        else {
            if (field === "coverLocation") {
                const valueArray = value.split(' ');
                const update = { ...armor, [field]: valueArray }
                console.log("armor cover", update)
                setArmor({ ...update });
            }
            else {
                const update = { ...armor, [field]: value }
                console.log("armor", update)
                setArmor({ ...update })
            }
        }
    }
    const onClose = () => {
        props.handleClose()
    }

    const onSave = (location: keyof Armor | null, item: ArmorItem) => {
        // if (props.stat) {
        if (location) {
            console.log("update stat");
            onClose()
            props.handleChange(location, item);
        }
    }

    const onAutocompleteChange = (_event: any, newValue: ArmorItem | null) => {
        console.log(props.armorLocation, newValue)
        if (props.armorLocation && newValue) {
            console.log("import item");
            setArmor(newValue);
            // props.handleChange(props.armorLocation, newValue);
        }
    }
    const onItemRemove = () => {
        if (props.armorLocation) {
            console.log("remove item");
            setArmor(emptyItem);
            // props.handleChange(props.armorLocation, emptyItem);
        }
    }

    return (
        // <form onSubmit={props.handleSubmit}>
        <Dialog open={props.isOpen} onClose={onClose} >
            <DialogTitle>Edytuj {props.headerName} &lt;{ArmorLocations[props.armorLocation ?? 'head']}&gt;</DialogTitle>
            <DialogContent>
                {props.armor && (
                    <>
                        <TextField
                            margin="dense"
                            label="Nazwa"
                            type="text"
                            fullWidth
                            value={armor.item.name || ""}
                            onChange={(e) => onArmorChange('name', e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Obciążenie"
                            type="number"
                            fullWidth
                            value={armor.item.weight || ""}
                            onChange={(e) => onArmorChange('weight', e.target.value)}
                        />
                        <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
                            <TextField
                                margin="dense"
                                label="zk"
                                type="number"
                                // fullWidth
                                value={armor.item.value.gc || ""}
                                onChange={(e) => onArmorChange('gc', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="s"
                                type="number"
                                // fullWidth
                                value={armor.item.value.sh || ""}
                                onChange={(e) => onArmorChange('sh', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="p"
                                type="number"
                                // fullWidth
                                value={armor.item.value.pn || ""}
                                onChange={(e) => onArmorChange('pn', e.target.value)}
                            />
                        </Stack>
                        <TextField
                            margin="dense"
                            label="Chronione lokacje"
                            type="text"
                            fullWidth
                            value={armor.coverLocation.join(" ") || ""}
                            onChange={(e) => onArmorChange('coverLocation', e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Punkty zbroi"
                            type="number"
                            fullWidth
                            value={armor.armor || ""}
                            onChange={(e) => onArmorChange('armor', e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Dostępność"
                            type="text"
                            fullWidth
                            value={armor.item.availability || ""}
                            onChange={(e) => onArmorChange('availability', e.target.value)}
                        />
                        <Autocomplete
                            autoHighlight
                            options={items.filter((a: ArmorItem) => a.coverLocation.some((l) => l === ArmorLocations[props.armorLocation ?? "head"]))}
                            // onChange={() => onAutocompleteChange(props.armorLocation ?? "head", selectedItem)}
                            onChange={onAutocompleteChange}
                            getOptionLabel={(option: ArmorItem) => option.item.name} // Wyświetlanie pola `name` dla każdego obiektu
                            sx={{ mt: 2, width: 300 }}
                            renderInput={(params) => <TextField {...params} label="przedmiot" />}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onItemRemove}>Wyczyść</Button>
                <Button onClick={onClose}>Anuluj</Button>
                <Button onClick={() => onSave(props.armorLocation, armor)} type='submit'>Zapisz</Button>
            </DialogActions>
        </Dialog>
        // </form>
    )
}

export { ArmorDialog };