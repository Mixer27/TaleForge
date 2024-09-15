import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { WeaponItem } from '../../../types'
import { useEffect, useState } from 'react';
import { defaultWeapon } from '../../../utils/defaults';

interface Props {
    headerName: string,
    weapon: WeaponItem | null
    isOpen: boolean,
    handleClose: () => void,
    handleChange: (weapon: WeaponItem) => void,
    handleRemove: (removedWeaponId: string) => void,
}

// const emptyWeapon: WeaponItem = {
//     item: {
//         name: "-",
//         description: "-",
//         value: { gc: 0, sh: 0, pn: 0 },
//         weight: 0,
//         availability: "-",
//     },
//     category: '-',
//     range: '-',
//     reload: '-',
//     strength: '-',
//     weaponFeatures: '-'
// }

const WeaponDialog: React.FC<Props> = (props) => {
    const [weapon, setWeapon] = useState<WeaponItem>(props.weapon ?? defaultWeapon);
    const [weapons, setWeapons] = useState<WeaponItem[]>([]);

    // fetch armor items
    useEffect(() => {
        fetch(`https://uwu.sex.pl:9000/items/weapons`)
            .then((res: Response) => {
                return res.json();
            })
            .then((data: WeaponItem[]) => {
                console.log(data);
                setWeapons(data);
            })
            .catch((error) => {
                console.error("Error fetching data!", error);
            })

    }, []);

    const onChange = (field: string, value: string) => {
        if (field in weapon.item.value) {
            const updateMoney = { ...weapon.item.value, [field]: Number(value) >= 0 ? Number(value) : 0 };
            const updatedItem = { ...weapon.item, value: updateMoney }
            const update = { ...weapon, item: updatedItem };
            console.log("weapon.item.value", update)
            setWeapon(update);
        }
        else if (field in weapon.item) {
            const updatedItem = { ...weapon.item, [field]: value };
            const update = { ...weapon, item: updatedItem };
            console.log("weapon.item", update);
            setWeapon(update);
        }
        else {
            const update = { ...weapon, [field]: value }
            console.log('weapon', update);
            setWeapon(update);
        }

    }
    const onClose = () => {
        props.handleClose()
    }

    const onSave = () => {
        // if (props.stat) {
        console.log("update weapon", weapon);
        props.handleChange(weapon);
        onClose()
    }

    const onAutocompleteChange = (_event: any, newValue: WeaponItem | null) => {
        console.log(props.weapon, newValue)
        if (newValue) {
            console.log("import weapon", newValue);
            setWeapon({ ...newValue, _id: weapon._id });
            // props.handleChange(props.armorLocation, newValue);
        }
    }
    const onItemClear = () => {
        if (props.weapon) {
            console.log("clear item");
            setWeapon({ ...defaultWeapon, _id: weapon._id });
        }
    }
    const onItemRemove = () => {
        if (weapon._id) {
            console.log("remove item", weapon);
            props.handleRemove(weapon._id);
            onClose()
        }
    }

    return (
        // <form onSubmit={props.handleSubmit}>
        <Dialog open={props.isOpen} onClose={onClose} scroll='body'>
            <DialogTitle>Edytuj {props.headerName}</DialogTitle>
            <DialogContent>
                {props.weapon && (
                    <>
                        {/* {weapon._id ?? "null"} */}
                        <TextField
                            margin="dense"
                            label="Nazwa"
                            type="text"
                            fullWidth
                            value={weapon.item.name || ""}
                            onChange={(e) => onChange('name', e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Obciążenie"
                            type="number"
                            fullWidth
                            value={weapon.item.weight || ""}
                            onChange={(e) => onChange('weight', e.target.value)}
                        />
                        <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
                            <TextField
                                margin="dense"
                                label="zk"
                                type="number"
                                // fullWidth
                                value={weapon.item.value.gc || ""}
                                onChange={(e) => onChange('gc', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="s"
                                type="number"
                                // fullWidth
                                value={weapon.item.value.sh || ""}
                                onChange={(e) => onChange('sh', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="p"
                                type="number"
                                // fullWidth
                                value={weapon.item.value.pn || ""}
                                onChange={(e) => onChange('pn', e.target.value)}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
                            <TextField
                                margin="dense"
                                label="Kategoria"
                                type="text"
                                fullWidth
                                value={weapon.category || ""}
                                onChange={(e) => onChange('category', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Siła Broni"
                                type="text"
                                fullWidth
                                value={weapon.strength || ""}
                                onChange={(e) => onChange('strength', e.target.value)}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
                            <TextField
                                margin="dense"
                                label="Zasięg"
                                type="text"
                                fullWidth
                                value={weapon.range || ""}
                                onChange={(e) => onChange('range', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Przeładowanie"
                                type="text"
                                fullWidth
                                value={weapon.reload || ""}
                                onChange={(e) => onChange('reload', e.target.value)}
                            />
                        </Stack>
                        <TextField
                            margin="dense"
                            label="Dostępność"
                            type="text"
                            fullWidth
                            value={weapon.item.availability || ""}
                            onChange={(e) => onChange('availability', e.target.value)}
                        />
                        <Autocomplete
                            autoHighlight
                            options={weapons}
                            onChange={onAutocompleteChange}
                            getOptionLabel={(option: WeaponItem) => option.item.name}
                            sx={{ mt: 2, width: 300 }}
                            renderInput={(params) => <TextField {...params} label="przedmiot" />}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onItemRemove} sx={{ marginRight: "auto" }}>Usuń</Button>
                <Button onClick={onItemClear}>Wyczyść</Button>
                <Button onClick={onClose}>Anuluj</Button>
                <Button onClick={onSave} type='submit'>Zapisz</Button>
            </DialogActions>
        </Dialog>
        // </form>
    )
}

export { WeaponDialog };