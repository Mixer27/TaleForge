import React from "react";
import { Stack } from "@mui/material";
import { InfoCell } from "./InfoCell";
import { CharacterSheetInfoHeader } from "./CharacterSheetInfoHeader";

interface Props {
    name: string | undefined,
    race: string | undefined,
    currentCareer: string | undefined,
    previousCareer: string | undefined,
}

const CharacterStack: React.FC<Props> = (props) => {

    return (
        <>
            <Stack spacing={0}>
                <CharacterSheetInfoHeader value="Character"></CharacterSheetInfoHeader>
                <InfoCell cellName="Name" value={props.name}></InfoCell>
                <InfoCell cellName="Race" value={props.race}></InfoCell>
                <InfoCell cellName="Current Career" value={props.currentCareer}></InfoCell>
                <InfoCell cellName="Previous Careers" value={props.previousCareer}></InfoCell>
            </Stack>
        </>
    )
}

export { CharacterStack }