import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { PlayerStat, SingleStat } from '../../types'
import { useState } from 'react';

interface Props {
    headerName: string,
    stat?: PlayerStat,
    singleStat?: SingleStat,
    isOpen: boolean,
    // handleChange?: (field: string, value: string) => void,
    handleChange?: (stat: PlayerStat) => void,
    handleSingleChange?: (value: SingleStat) => void
    handleClose: () => void,
    handleSave: () => void,
}

const defaultStat: PlayerStat = { name: "", starting: 0, current: 0, advance: 0 };
const defaultSingleStat: SingleStat = { name: "", current: 0 };

const FormDialog: React.FC<Props> = (props) => {
    const [singleStat, setSingleStat] = useState<SingleStat>(props.singleStat ?? defaultSingleStat);
    const [stat, setStat] = useState<PlayerStat>(props.stat ? props.stat : defaultStat)
    const onSingleStatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const update: SingleStat = { ...singleStat, current: Number(e.currentTarget.value) }
        setSingleStat({ ...update })
    }
    const onStatChange = (field: string, value: string) => {
        const update = { ...stat, [field]: Number(value) }
        setStat({ ...update })
    }
    const onClose = () => {
        props.handleClose()
    }

    const onSave = () => {
        if (props.stat) {
            console.log("update stat");
            props.handleChange ? props.handleChange(stat) : () => console.log("");
        }
        else if (props.singleStat) {
            props.handleSingleChange ? props.handleSingleChange(singleStat) : () => console.log("")
        }
        props.handleSave()
    }

    return (
        <>
            <Dialog open={props.isOpen} onClose={onClose} >
                <DialogTitle>Edytuj {props.headerName}</DialogTitle>
                <DialogContent>
                    {props.stat && (
                        <>
                            <TextField
                                margin="dense"
                                label="Startowa"
                                type="number"
                                fullWidth
                                value={stat.starting ? stat.starting : ""} 
                                onChange={(e) => onStatChange('starting', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Rozwój"
                                type="number"
                                fullWidth
                                value={stat.advance ? stat.advance : ""}
                                onChange={(e) => onStatChange('advance', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Obecna"
                                type="number"
                                fullWidth
                                value={stat.current ? stat.current : ""}
                                onChange={(e) => onStatChange('current', e.target.value)}
                            />
                        </>
                    )}
                    {props.singleStat && (
                        <TextField
                            margin="dense"
                            label="Obecna"
                            type="number"
                            fullWidth
                            value={singleStat.current}
                            onChange={onSingleStatChange}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Anuluj</Button>
                    <Button onClick={onSave} type='submit'>Zapisz</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export { FormDialog };