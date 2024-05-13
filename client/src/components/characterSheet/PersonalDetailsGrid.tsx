import React from "react";
import { Grid } from "@mui/material";
import { InfoCell } from "./InfoCell";
import { CharacterSheetInfoHeader } from "./CharacterSheetInfoHeader";

interface Props {
    age: number,
    gender: string,
    eyeColor: string,
    hairColor: string,
    starSign: string,
    weight: number,
    height: number,
    numOfSiblings: number,
    birthplace: string,
    distinguishMark: string,
}

const PersonalDetailsGrid: React.FC<Partial<Props>> = (props) => {


    return (
        <Grid container>
            <Grid item xs={12}>
                <CharacterSheetInfoHeader value="Personal Details"/>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Age" value={props.age}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Gender" value={props.gender}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Eye color" value={props.eyeColor}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Height" value={props.height}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Hair color" value={props.hairColor}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Weight" value={props.weight}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Star sign" value={props.starSign}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Number of siblings" value={props.numOfSiblings}></InfoCell>
            </Grid>
            <Grid item xs={12}>
                <InfoCell cellName="Birthplace" value={props.birthplace}></InfoCell>
            </Grid>
            <Grid item xs={12}>
                <InfoCell cellName="Distinguish marks" value={props.distinguishMark}></InfoCell>
            </Grid>
        </Grid>
    )
}

export { PersonalDetailsGrid };