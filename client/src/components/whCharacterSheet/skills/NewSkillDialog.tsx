import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete, TextField } from '@mui/material'
import { Skill } from '../../../types'
import { useEffect, useState } from 'react';

interface Props {
    headerName: string,
    skills: Skill[]
    isOpen: boolean,
    // handleChange?: (field: string, value: string) => void,
    handleChange: (skill: Skill) => void,
    handleClose: () => void,
    handleSave: (addedSkill: Skill) => void,
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

const NewSkillDialog: React.FC<Props> = (props) => {
    const [addedSkill, setAddedSkill] = useState<Skill | undefined>(undefined);
    const [skills, setSkills] = useState<Skill[]>([]);
    useEffect(() => {
        fetch(`https://uwu.sex.pl:9000/skills`)
            .then((res: Response) => {
                return res.json();
            })
            .then((data: Skill[]) => {
                console.log(data);
                if (props.skills) {
                    const filteredSkills = data.filter((skill: Skill) => {
                        return !props.skills.some((s: Skill) => s._id === skill._id)
                    });
                    console.log(filteredSkills);
                    setSkills(filteredSkills);
                } else {
                    setSkills(data);
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
        if (addedSkill) {
            props.handleSave(addedSkill)
        } else {
            props.handleClose();
        }
    }
    const onSkillChange = (_event: any, newValue: Skill | null) => {
        if (newValue) {
            setAddedSkill(newValue); // Aktualizacja stanu na podstawie wybranego skilla
        } else {
            setAddedSkill(undefined);
        }
    };

    return (
        <form onSubmit={props.handleSubmit}>
            <Dialog open={props.isOpen} onClose={onClose} scroll='body'>
                <DialogTitle>{props.headerName}</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        autoHighlight
                        options={skills}
                        onChange={onSkillChange}
                        getOptionLabel={(option: Skill) => option.name} // Wyświetlanie pola `name` dla każdego obiektu
                        sx={{ mt: 2, width: 300 }}
                        renderInput={(params) => <TextField autoFocus {...params} label="umiejętność" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onSave} type='submit'>Add</Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}

export { NewSkillDialog };