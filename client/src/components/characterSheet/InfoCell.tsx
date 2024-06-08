import React, { useEffect, useState } from "react";
import { Container, TextField } from "@mui/material";
import "./InfoCell.css"

interface Props {
    cellName: string,
    textFieldName: string,
    value: string | number | undefined
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const InfoCell: React.FC<Props> = (props) => {
    const [value, setValue] = useState("");
    useEffect(() => {
        setValue(props.value ? props.value.toString() : "");
    }, [props.value])
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        props.onChange(e)
    }

    return (
        <>
            <Container className="InfoCell">{props.cellName}: <TextField name={props.textFieldName} variant="standard" fullWidth size="small" value={value} onChange={onChange}/></Container>
        </>
    )
}

export { InfoCell }