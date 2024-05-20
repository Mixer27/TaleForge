import { Container, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { PlayerCharacterSheet } from "../../types";
import { useParams } from "react-router-dom";
import { CharacterStack } from "../../components/characterSheet/CharacterStack";
import { PersonalDetailsGrid } from "../../components/characterSheet/PersonalDetailsGrid";
import "./Sheet.css";
import { CharacterSheetInfoHeader } from "../../components/characterSheet/CharacterSheetInfoHeader";
import Button from "@mui/material/Button";

const Sheet: React.FC = () => {
    const [sheet, setSheet] = useState<Partial<PlayerCharacterSheet>>({});

    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        fetch(`https://uwu.sex.pl:9000/pcsheets/${id}`)
            .then((res: Response) => {
                return res.json();
            })
            .then((data) => {
                setSheet(data);
            })
            .catch((error) => {
                console.error("Error fetching data!", error);
            })

    }, [id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(sheet);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // console.log("zmieniam sheet", name, value)
        if (name == "previousCareers") {
            setSheet({
                ...sheet,
                PreviousCareers: value.split(",").map((c) => c.trim())
            })
        }
        else {
            setSheet({
                ...sheet,
                [name]: value,
            });
        }
        // console.log(sheet)
    }

    return (
        <Container component="form" onSubmit={handleSubmit} className="Sheet">
            <Button variant="contained" color="success" type="submit" sx={{ mb: 3 }}>Edit</Button>
            <Grid container className="Empty" spacing={2}>
                <Grid item xs={6} className="Empt">
                    <Grid container rowSpacing={5} spacing={2}>
                        <Grid item className="GridElement" xs={12}>
                            <CharacterStack
                                name={String(sheet.name)}
                                race={String(sheet.race)}
                                currentCareer={String(sheet.currentCareer)}
                                previousCareers={sheet.PreviousCareers?.join(", ")}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item className="Empt" xs={12}>
                            <PersonalDetailsGrid
                                age={sheet.age}
                                gender={sheet.gender}
                                eyeColor={sheet.eyeColor}
                                hairColor={sheet.hairColor}
                                height={sheet.height}
                                weight={sheet.weight}
                                numOfSiblings={sheet.numOfSiblings}
                                starSign={sheet.starSign}
                                birthplace={sheet.birthplace}
                                distinguishMarks={sheet.distinguishMarks}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} >
                    <Grid item xs={12}>
                        <CharacterSheetInfoHeader value="WARHAMMER"></CharacterSheetInfoHeader>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export { Sheet };