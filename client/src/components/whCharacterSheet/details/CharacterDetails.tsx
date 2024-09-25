import { Box, Grid, Divider, List, Paper, ListItemButton, Typography, ListItem } from "@mui/material";
import { Gender, PlayerCharacterSheet, Race } from "../../../types";
import { useState } from "react";
import { DetailDialog } from "./DetailDialog";

interface Props {
    name: string,
    race: Race,
    gender: Gender,
    age: number,
    eyeColor: string,
    hairColor: string,
    starSign: string,
    weight: number,
    height: number,
    numOfSiblings: number,
    birthplace: string,
    distinguishMarks: string,
    scarsAndWounds: string,
    mentalDisorders: string,
    backstory: string,
    religion: string,
    currentCareer: string,
    PreviousCareers: string[],
    handleChange: (field: keyof PlayerCharacterSheet, value: string | number) => void,
}



const CharacterDetails: React.FC<Props> = (props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectionD, setSelectionD] = useState<string | number | null>(null)
    const [selection, setSelection] = useState<keyof Props | null>(null)
    const [selectionName, setSelectionName] = useState<string | null>(null)

    const handleOpenDialog = (selection: keyof Props, selectionName: string) => {
        // console.log("click", selection);
        if (Array.isArray(props[selection])) {
            setSelectionD(props[selection].join(', '));
        }
        else if (typeof props[selection] === 'number') {
            console.log('number')
            setSelectionD(Number(props[selection]));
        }
        else {
            setSelectionD(String(props[selection]));
        }
        setSelection(selection)
        setSelectionName(selectionName);
        setIsDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setSelection(null)
        setSelectionD(null);
        setIsDialogOpen(false)
    }
    const changeDetail = (value: string | number) => {
        props.handleChange(selection as keyof PlayerCharacterSheet, value)
        handleCloseDialog();
    }

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={1}>
                    <Grid item sm={12} lg={4}>
                        <Paper>
                            <List>
                                <ListItem alignItems="center"><Typography variant="h5">Informacje o postaci</Typography></ListItem>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('name', "imię")}>Imię: {props.name}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('race', "rasę")}>Rasa: {props.race}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('gender', 'płeć')}>Płeć: {props.gender}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('currentCareer', 'aktualną profesję')}>Aktualna profesja: {props.currentCareer}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('PreviousCareers', 'przebieg kariery')}>Przebieg kariery: {props.PreviousCareers.join(', ')}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('mentalDisorders', 'zaburzenia psychiczne')}>Zaburzenia psychiczne: {props.mentalDisorders}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('starSign', 'znak gwiezdny')}>Znak gwiezdny: {props.starSign}</ListItemButton>
                                {/* <ListItemButton onClick={() => handleClick('')}>{props.}</ListItemButton> */}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item sm={12} lg={4}>
                        <Paper>
                            <List>
                                <ListItem alignItems="center"><Typography variant="h5">Wygląd zewnętrzny</Typography></ListItem>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('eyeColor', 'oczy')}>Oczy: {props.eyeColor}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('hairColor', 'włosy')}>włosy: {props.hairColor}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('age', 'wiek')}>Wiek: {props.age}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('height', 'wzrost')}>Wzrost: {props.height}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('weight', 'wagę')}>Waga: {props.weight}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('distinguishMarks', 'znaki szczególne')}>Znaki szczególne: {props.distinguishMarks}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('scarsAndWounds', 'rany i blizny')}>Rany i blizny: {props.scarsAndWounds}</ListItemButton>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item sm={12} lg={4}>
                        <Paper>
                            <List>
                                <ListItem alignItems="center"><Typography variant="h5">Pozostałe</Typography></ListItem>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('backstory', 'historię')}>Historia: {props.backstory}</ListItemButton>
                                <Divider />
                                <ListItemButton onClick={() => handleOpenDialog('religion', 'religię')}>Religia: {props.religion}</ListItemButton>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            {isDialogOpen && <DetailDialog
                header={selectionName ?? ''}
                isOpen={isDialogOpen}
                detail={selectionD ?? ''}
                detailType={typeof selectionD}
                onClose={handleCloseDialog}
                onSave={changeDetail}
            />
            }
        </>
    )
}

export { CharacterDetails };