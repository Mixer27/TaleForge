import React from "react";
import { Stack } from "@mui/material";
import { InfoCell } from "./InfoCell";
import { CharacterSheetInfoHeader } from "./CharacterSheetInfoHeader";

interface Props {
    name?: string,
    race?: string,
    currentCareer?: string,
    previousCareers?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const CharacterStack: React.FC<Props> = (props) => {

    return (
        <>
            <Stack spacing={0} className="InfoGrid">
                <CharacterSheetInfoHeader value="Character"></CharacterSheetInfoHeader>
                <InfoCell cellName="Name" textFieldName="name" value={props.name} onChange={props.onChange}></InfoCell>
                <InfoCell cellName="Race" textFieldName="race" value={props.race} onChange={props.onChange}></InfoCell>
                <InfoCell cellName="Current Career" textFieldName="currentCareer" value={props.currentCareer} onChange={props.onChange}></InfoCell>
                <InfoCell cellName="Previous Careers" textFieldName="previousCareers" value={props.previousCareers} onChange={props.onChange}></InfoCell>
            </Stack>
        </>
    )
}

export { CharacterStack }