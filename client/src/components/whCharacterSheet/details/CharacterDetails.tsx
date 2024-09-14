import { Box, Grid, Divider, List, Paper, ListItemButton, Typography, ListItem } from "@mui/material";
import { Gender, PlayerCharacterSheet, Race } from "../../../types";
import { DetailItem } from "./DetailItem";

interface Props {
    name: string,
    race: Race,
    gender: Gender,
    age: number;
    eyeColor: string;
    hairColor: string;
    starSign: string;
    weight: number;
    height: number;
    numOfSiblings: number;
    birthplace: string;
    distinguishMarks: string;
    backstory: string;
    currentCareer: string,
    previousCareers: string[],
}

const handleClick = (selection: keyof PlayerCharacterSheet) => {
    console.log("click", selection);
}

const CharacterDetails: React.FC<Props> = (props) => {

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={1}>
                    <Grid item sm={12} lg={4}>
                        <Paper>
                            <List>
                                <ListItem alignItems="center"><Typography variant="h5">Informacje o postaci</Typography></ListItem>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('name')}>Imię: {props.name}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('race')}>Rasa: {props.race}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('gender')}>Płeć: {props.gender}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('currentCareer')}>Aktualna profesja: {props.currentCareer}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('PreviousCareers')}>Przebieg kariery: {props.previousCareers.join(', ')}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('starSign')}>Zaburzenia psychiczne: to do</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('starSign')}>Znak gwiezdny: {props.starSign}</ListItemButton>
                                {/* <ListItemButton onClick={() => handleClick('')}>{props.}</ListItemButton> */}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item sm={12} lg={4}>
                        <Paper>
                            <List>
                                <ListItem alignItems="center"><Typography variant="h5">Wygląd zewnętrzny</Typography></ListItem>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('eyeColor')}>Oczy: {props.eyeColor}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('hairColor')}>włosy: {props.hairColor}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('age')}>Wiek: {props.age}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('height')}>Wzrost: {props.height}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('weight')}>Waga: {props.weight}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('distinguishMarks')}>Znaki szczególne: {props.distinguishMarks}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleClick('age')}>Rany i blizny: to do</ListItemButton>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export { CharacterDetails };