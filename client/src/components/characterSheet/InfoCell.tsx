import React, { useEffect, useState } from "react";
import { Container, TextField } from "@mui/material";
import "./InfoCell.css"

interface Props {
    cellName: string,
    value: string | number | undefined
}

const InfoCell: React.FC<Props> = (props) => {
    const [value, setValue] = useState(props.value);
    useEffect(() => {
        setValue(props.value ? props.value.toString() : "");
    }, [props.value])
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <>
            <Container className="InfoCell">{props.cellName}: <TextField variant="standard" fullWidth size="small" value={value} onChange={onChange}/></Container>
        </>
    )
}

export { InfoCell }