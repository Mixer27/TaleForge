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
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,

}

const defaultStat: PlayerStat = { name: "", starting: 0, current: 0, advance: 0 };
const defaultSingleStat: SingleStat = { name: "", current: 0 };

const FormDialog: React.FC<Props> = (props) => {
    // const [singleStat, setSingleStat] = useState<string>(props.singleStat ? String(props.singleStat) : "0");
    const [singleStat, setSingleStat] = useState<SingleStat>(props.singleStat ?? defaultSingleStat);
    const [stat, setStat] = useState<PlayerStat>(props.stat ? props.stat : defaultStat)
    const onSingleStatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const updatedValue = e.currentTarget.value;
        // console.log("Form dialog", updatedValue)
        const update: SingleStat = { ...singleStat, current: Number(e.currentTarget.value) }
        setSingleStat({ ...update })
        // props.handleSingleChange ? props.handleSingleChange(updatedValue) : () => console.log("")
    }
    const onStatChange = (field: string, value: string) => {
        const update = { ...stat, [field]: Number(value) }
        // console.log("Form dialog", update)
        setStat({ ...update })
        // props.handleChange ? props.handleChange(field, value) : () => console.log("")
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
        <form onSubmit={props.handleSubmit}>
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
                                // value={props.stat?.starting}
                                value={stat.starting ? stat.starting : ""} 
                                onChange={(e) => onStatChange('starting', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Rozwój"
                                type="number"
                                fullWidth
                                // value={props.stat?.advance}
                                value={stat.advance ? stat.advance : ""}
                                onChange={(e) => onStatChange('advance', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Obecna"
                                type="number"
                                fullWidth
                                // value={props.stat?.current}
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
        </form>
    )
}

export { FormDialog };