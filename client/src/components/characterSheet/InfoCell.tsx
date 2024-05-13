import React from "react";
import { Container } from "@mui/material";
import "./InfoCell.css"

interface Props {
    cellName: string,
    value: string | number | undefined
}

const InfoCell: React.FC<Props> = (props) => {

    return (
        <>
            <Container className="InfoCell">{props.cellName}: {props.value}</Container>
        </>
    )
}

export { InfoCell }