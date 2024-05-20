import React from "react";
import { Grid } from "@mui/material";
import { InfoCell } from "./InfoCell";
import { CharacterSheetInfoHeader } from "./CharacterSheetInfoHeader";
import './InfoGrid.css';

interface Props {
    age?: number,
    gender?: string,
    eyeColor?: string,
    hairColor?: string,
    starSign?: string,
    weight?: number,
    height?: number,
    numOfSiblings?: number,
    birthplace?: string,
    distinguishMarks?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const PersonalDetailsGrid: React.FC<Props> = (props) => {


    return (
        <Grid container className="InfoGrid">
            <Grid item xs={12}>
                <CharacterSheetInfoHeader value="Personal Details"/>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Age" textFieldName="age" value={props.age} onChange={props.onChange}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Gender" textFieldName="gender" value={props.gender} onChange={props.onChange}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Eye color" textFieldName="eyeColor" value={props.eyeColor} onChange={props.onChange}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Height" textFieldName="height" value={props.height} onChange={props.onChange}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Hair color" textFieldName="hairColor" value={props.hairColor} onChange={props.onChange}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Weight" textFieldName="weight" value={props.weight} onChange={props.onChange}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Star sign" textFieldName="starSign" value={props.starSign} onChange={props.onChange}></InfoCell>
            </Grid>
            <Grid item xs={6}>
                <InfoCell cellName="Number of siblings" textFieldName="numOfSiblings" value={props.numOfSiblings} onChange={props.onChange}></InfoCell>
            </Grid>
            <Grid item xs={12}>
                <InfoCell cellName="Birthplace" textFieldName="birthplace" value={props.birthplace} onChange={props.onChange}></InfoCell>
            </Grid>
            <Grid item xs={12}>
                <InfoCell cellName="Distinguish marks" textFieldName="distinguishMarks" value={props.distinguishMarks} onChange={props.onChange}></InfoCell>
            </Grid>
        </Grid>
    )
}

export { PersonalDetailsGrid };