import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
    header: string,
    detail: String | number,
    detailType: string,
    isOpen: boolean,
    onClose: () => void,
    onSave: (value: string | number) => void,
}

const DetailDialog: React.FC<Props> = (props) => {
    const [detail, setDetail] = useState<string>(String(props.detail))

    const onChange = (value: string) => {
        console.log(props.detailType)
        setDetail(value);
    }
    const onClose = () => {
        props.onClose();
    }
    const onClear = () => {
        setDetail('');
    }
    const onSave = () => {
        if (props.detailType === 'number') {
            props.onSave(Number(detail));
        }
        else {
            props.onSave(detail)
        }
    }

    return (
        <>
            <Dialog open={props.isOpen} onClose={onClose} scroll="body">
                <DialogTitle>Edytuj {props.header}</DialogTitle>
                <DialogContent>
                    <>
                        <TextField
                            sx={{width: '400px'}}
                            margin="dense"
                            label=""
                            type={props.detailType === 'string' ? "text" : 'number'}
                            // fullWidth
                            multiline={props.header === 'historię' ? true : false}
                            value={detail || ""}
                            onChange={(e) => onChange(e.target.value)}
                        />

                    </>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClear}>Wyczyść</Button>
                    <Button onClick={onClose}>Anuluj</Button>
                    <Button onClick={() => onSave()} type='submit'>Zapisz</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export { DetailDialog };