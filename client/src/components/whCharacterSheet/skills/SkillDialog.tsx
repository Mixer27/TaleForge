import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { SkillwLvl, SkillLvl } from '../../../types'
import { useState } from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    headerName: string,
    skill?: SkillwLvl
    singleStat?: number,
    isOpen: boolean,
    // handleChange?: (field: string, value: string) => void,
    handleChange: (skill: SkillwLvl) => void,
    handleClose: () => void,
    handleSave: () => void,
    handleRemoveSkill: (removedSkill: SkillwLvl) => void,
}

const defaultSkill: SkillwLvl = {
    lvl: SkillLvl.NORMAL,
    skill: {
        _id: 'id',
        name: 'Placeholder',
        advanced: false,
        relatedStatName: "agility",
        description: "placeholder"
    }
}

const SkillDialog: React.FC<Props> = (props) => {
    // const [skill, setSkill] = useState<SkillwLvl>(props.skill ? props.skill : defaultSkill);
    const [skillLvl, setSkillLvl] = useState<SkillLvl>(props.skill ? props.skill.lvl : SkillLvl.NORMAL);
    const onSkillChange = (value: SkillLvl) => {
        // const update = { ...skill, [field]: Number(value) }
        // console.log("Form dialog", update)
        setSkillLvl(value);
        // props.handleChange ? props.handleChange(field, value) : () => console.log("")
    }
    const onClose = () => {
        props.handleClose()
    }

    const onSave = () => {
        // if (props.skill) {
        //     console.log("update stat");
        //     props.handleChange ? props.handleChange(skillLvl) : () => console.log("");
        // }
        props.handleChange(props.skill ? { ...props.skill, lvl: skillLvl } : defaultSkill);
        props.handleSave()
    }
    const onRemoveButtonClick = (removedSkill: SkillwLvl | undefined) => {
        if (removedSkill) {
            console.log("delete skill", removedSkill.skill.name);
            props.handleRemoveSkill(removedSkill);
        }
    }

    return (
        <>
            <Dialog open={props.isOpen} onClose={onClose} >
                <DialogTitle>{props.skill?.skill.name ? props.skill?.skill.name : "loading"}</DialogTitle>
                <DialogContent>
                    {props.skill && (
                        <>
                            <Typography variant='caption'>Opis umiejętności</Typography>
                            <Typography variant='body1'>{props.skill.skill.description}</Typography>
                            <FormControl>
                                <FormLabel><Typography variant='caption'>Stopień wyszkolenia</Typography></FormLabel>
                                <RadioGroup row name='skill-profficiency'>
                                    {(Object.keys(SkillLvl) as (keyof typeof SkillLvl)[]).map((key) => {
                                        return <FormControlLabel key={SkillLvl[key]} checked={SkillLvl[key] === skillLvl} value={key} control={<Radio />} label={SkillLvl[key]} onChange={() => onSkillChange(SkillLvl[key])} />
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onRemoveButtonClick(props.skill)} sx={{ marginRight: "auto" }}>Usuń</Button>
                    <Button onClick={onClose}>Anuluj</Button>
                    <Button onClick={onSave} type='submit'>Zapisz</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export { SkillDialog };