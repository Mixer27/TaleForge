import React from "react";
import { Container } from "@mui/material";
import "./CharacterSheetInfoHeader.css"

interface Props {
    value: string
}

const CharacterSheetInfoHeader: React.FC<Props> = (props) => {

    return (
        <>
            <Container className="CharacterSheetInfoHeader">
                {props.value}
            </Container>
        </>
    )
}

export { CharacterSheetInfoHeader };