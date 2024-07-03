import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { PlayerStat } from '../../types'
import { useState } from 'react';

interface Props {
    headerName: string,
    stat?: PlayerStat,
    singleStat?: number,
    isOpen: boolean,
    handleChange?: (field: string, value: string) => void,
    handleSingleChange?: (value: string) => void
    handleClose: () => void,
    handleSave: () => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,

}

const defaultStat: PlayerStat = { starting: 0, current: 0, advance: 0 };

const FormDialog: React.FC<Props> = (props) => {
    const [singleStat, setSingleStat] = useState<string>(props.singleStat ? String(props.singleStat) : "0");
    const [stat, setStat] = useState<PlayerStat>(props.stat ? props.stat : defaultStat)
    const onSingleStatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedValue = e.currentTarget.value;
        // console.log("Form dialog", updatedValue)
        setSingleStat(updatedValue)
        props.handleSingleChange ? props.handleSingleChange(updatedValue) : () => console.log("")
    }
    const onStatChange = (field: string, value: string) => {
        const update = { ...stat, [field]: Number(value) }
        // console.log("Form dialog", update)
        setStat({ ...update })
        props.handleChange ? props.handleChange(field, value) : () => console.log("")
    }
    const onClose = () => {
        props.handleClose()
    }

    const onSave = () => {
        props.handleSave()
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <Dialog open={props.isOpen} onClose={onClose} >
                <DialogTitle>Edit {props.headerName}</DialogTitle>
                <DialogContent>
                    {props.stat && (
                        <>
                            <TextField
                                margin="dense"
                                label="Starting"
                                type="number"
                                fullWidth
                                value={props.stat?.starting}
                                onChange={(e) => onStatChange('starting', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Advance"
                                type="number"
                                fullWidth
                                value={props.stat?.advance}
                                onChange={(e) => onStatChange('advance', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Current"
                                type="number"
                                fullWidth
                                value={props.stat?.current}
                                onChange={(e) => onStatChange('current', e.target.value)}
                            />
                        </>
                    )}
                    {typeof props.singleStat === "number" && (
                        <TextField
                            margin="dense"
                            label="Current"
                            type="number"
                            fullWidth
                            value={singleStat}
                            onChange={onSingleStatChange}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onSave} type='submit'>Save</Button>
                </DialogActions>
            </Dialog>
        </form>
    )
}

export { FormDialog };