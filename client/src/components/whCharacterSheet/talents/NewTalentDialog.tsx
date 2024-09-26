import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete, TextField } from '@mui/material'
import { Talent } from '../../../types'
import { useEffect, useState } from 'react';
import { SERVER_ADDRESS } from '../../../constants';

interface Props {
    headerName: string,
    talents: Talent[]
    isOpen: boolean,
    // handleChange?: (field: string, value: string) => void,
    // handleChange: (skill: Talent) => void,
    handleClose: () => void,
    handleSave: (addedTalent: Talent) => void,
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

const NewTalentDialog: React.FC<Props> = (props) => {
    const [addedTalent, setAddedTalent] = useState<Talent | undefined>(undefined);
    const [talents, setTalents] = useState<Talent[]>([]);
    useEffect(() => {
        fetch(`${SERVER_ADDRESS}/talents`)
            .then((res: Response) => {
                return res.json();
            })
            .then((data: Talent[]) => {
                console.log(data);
                if (props.talents) {
                    const filteredTalents = data.filter((talent: Talent) => {
                        return !props.talents.some((t: Talent) => t._id === talent._id)
                    });
                    console.log(filteredTalents);
                    setTalents(filteredTalents);
                } else {
                    setTalents(data);
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
    const onSkillChange = (_event: any, newValue: Talent | null) => {
        if (newValue) {
            setAddedTalent(newValue); // Aktualizacja stanu na podstawie wybranego skilla
        } else {
            setAddedTalent(undefined);
        }
    };

    return (
        <>
            <Dialog open={props.isOpen} onClose={onClose} scroll='body'>
                <DialogTitle>{props.headerName}</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        autoHighlight
                        options={talents}
                        onChange={onSkillChange}
                        getOptionLabel={(option: Talent) => option.name} // Wyświetlanie pola `name` dla każdego obiektu
                        sx={{ mt: 2, width: 300 }}
                        renderInput={(params) => <TextField autoFocus {...params} label="zdolność" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Anuluj</Button>
                    <Button onClick={onSave} type='submit'>Dodaj</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export { NewTalentDialog };