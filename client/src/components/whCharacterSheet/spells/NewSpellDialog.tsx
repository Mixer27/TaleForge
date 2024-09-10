import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete, TextField } from '@mui/material'
import { Spell } from '../../../types'
import { useEffect, useState } from 'react';

interface Props {
    headerName: string,
    spells: Spell[],
    isOpen: boolean,
    // handleChange?: (field: string, value: string) => void,
    // handleChange: (skill: Talent) => void,
    handleClose: () => void,
    handleSave: (addedSpell: Spell) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

// const defaultSkill: SkillwLvl = {
//     lvl: SkillLvl.NORMAL,
//     skill: {
//         _id: 'id',
//         name: 'Placeholder',
//         advanced: false,
//         relatedStatName: "agility",
//         description: "placeholder"
//     }
// }

const NewSpellDialog: React.FC<Props> = (props) => {
    const [addedTalent, setAddedTalent] = useState<Spell | undefined>(undefined);
    const [spells, setSpells] = useState<Spell[]>([]);
    useEffect(() => {
        fetch(`https://uwu.sex.pl:9000/spells`)
            .then((res: Response) => {
                return res.json();
            })
            .then((data: Spell[]) => {
                console.log(data);
                if (props.spells) {
                    const filteredSpells = data.filter((spell: Spell) => {
                        return !props.spells.some((s: Spell) => s._id === spell._id)
                    });
                    console.log(filteredSpells);
                    setSpells(filteredSpells);
                } else {
                    setSpells(data);
                }
            })
            .catch((error) => {
                console.error("Error fetching data!", error);
            })

    }, []);

    const onClose = () => {
        props.handleClose()
    }
    const onSave = () => {
        if (addedTalent) {
            console.log('onSave', addedTalent)
            props.handleSave(addedTalent)
        } else {
            props.handleClose();
        }
    }
    const onSkillChange = (_event: any, newValue: Spell | null) => {
        if (newValue) {
            setAddedTalent(newValue); // Aktualizacja stanu na podstawie wybranego skilla
        } else {
            setAddedTalent(undefined);
        }
    };

    return (
        <form onSubmit={props.handleSubmit}>
            <Dialog open={props.isOpen} onClose={onClose} scroll='body'>
                <DialogTitle>{props.headerName}</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        autoHighlight
                        options={spells}
                        onChange={onSkillChange}
                        getOptionLabel={(option: Spell) => option.name} // Wyświetlanie pola `name` dla każdego obiektu
                        sx={{ mt: 2, width: 300 }}
                        renderInput={(params) => <TextField autoFocus {...params} label="czar" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Anuluj</Button>
                    <Button onClick={onSave} type='submit'>Dodaj</Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}

export { NewSpellDialog };