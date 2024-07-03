import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { PlayerStat } from '../../types'

interface Props {
    headerName: string,
    extendedStat?: PlayerStat,
    singleStat?: number,
    isOpen: boolean,
    handleChange: (field: string, value: string) => void,
    handleClose: () => void,
    handleSave: () => void,

}

const FormDialog: React.FC<Props> = (props) => {

    return (
        <>
            <Dialog open={props.isOpen} onClose={props.handleClose}>
                <DialogTitle>Edit {props.headerName}</DialogTitle>
                <DialogContent>
                    {props.extendedStat && (
                        <>
                            <TextField
                                margin="dense"
                                label="Starting"
                                type="number"
                                fullWidth
                                value={props.extendedStat?.current || '0'}
                                onChange={(e) => props.handleChange('starting', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Advance"
                                type="number"
                                fullWidth
                                value={props.extendedStat?.advance || '0'}
                                onChange={(e) => props.handleChange('advance', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Current"
                                type="number"
                                fullWidth
                                value={props.extendedStat?.current || '0'}
                                onChange={(e) => props.handleChange('current', e.target.value)}
                            />
                        </>
                    )}
                    {typeof props.singleStat === "number" && (
                        <TextField
                            margin="dense"
                            label="Starting"
                            type="number"
                            fullWidth
                            value={props.singleStat || '0'}
                            onChange={(e) => props.handleChange('value', e.target.value)}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={props.handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export { FormDialog };