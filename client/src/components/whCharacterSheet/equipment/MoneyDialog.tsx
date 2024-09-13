import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { Money } from '../../../types'
import { useState } from 'react';

interface Props {
    headerName: string,
    money: Money,
    isOpen: boolean,
    // handleChange?: (field: string, value: string) => void,
    handleChange: (money: Money) => void,
    handleClose: () => void,
    // handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

const defaultMoney = {
    gc: 0, sh: 0, pn: 0
}


const MoneyDialog: React.FC<Props> = (props) => {
    const [money, setMoney] = useState<Money>(props.money || defaultMoney);

    const onChange = (field: string, value: string) => {
        const update = {...money, [field as keyof Money]: Number(value)}
        setMoney(update);
    }
    const onClose = () => {
        props.handleClose()
    }
    const onSave = () => {
        if (props.money) {
            console.log("update money");
            onClose()
            props.handleChange(money);
        }
    }
    const onItemRemove = () => {
        console.log("clear money");
        setMoney(defaultMoney);
    }

    return (
        // <form onSubmit={props.handleSubmit}>
        <Dialog open={props.isOpen} onClose={onClose} >
            <DialogTitle>Edytuj {props.headerName}</DialogTitle>
            <DialogContent>
                {props.money && (
                    <>
                        <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
                            <TextField
                                margin="dense"
                                label="zk"
                                type="number"
                                // fullWidth
                                value={money.gc || ""}
                                onChange={(e) => onChange('gc', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="s"
                                type="number"
                                // fullWidth
                                value={money.sh || ""}
                                onChange={(e) => onChange('sh', e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="p"
                                type="number"
                                // fullWidth
                                value={money.pn || ""}
                                onChange={(e) => onChange('pn', e.target.value)}
                            />
                        </Stack>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onItemRemove}>Wyczyść</Button>
                <Button onClick={onClose}>Anuluj</Button>
                <Button onClick={() => onSave()} type='submit'>Zapisz</Button>
            </DialogActions>
        </Dialog>
        // </form>
    )
}

export { MoneyDialog };