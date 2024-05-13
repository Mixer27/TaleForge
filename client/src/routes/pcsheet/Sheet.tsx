import { Container, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { PlayerCharacterSheet } from "../../types";
import { useParams } from "react-router-dom";
import { CharacterStack } from "../../components/characterSheet/CharacterStack";
import { PersonalDetailsGrid } from "../../components/characterSheet/PersonalDetailsGrid";
import "./Sheet.css";
import { CharacterSheetInfoHeader } from "../../components/characterSheet/CharacterSheetInfoHeader";

const Sheet: React.FC = () => {
    const [sheet, setSheet] = useState<Partial<PlayerCharacterSheet>>({});

    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        fetch(`https://uwu.sex.pl:9000/pcsheet/${id}`)
            .then((res: Response) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setSheet(data);
            })
            .catch((error) => {
                console.error("Error fetching data!", error);
            })

    }, [id]);

    return (
        <Container className="Sheet">
            <Grid container className="Empty" spacing={2}>
                <Grid item xs={6} className="Empty">
                    <Grid item className="GridElement">
                        <CharacterStack
                            name={String(sheet.name)}
                            race={String(sheet.race)}
                            currentCareer={String(sheet.currentCareer)}
                            previousCareer={sheet.PreviousCareers?.join(", ")}
                        />
                    </Grid>
                    <Grid item className="Empty">
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
                            distinguishMark={sheet.distinguishMarks}
                        />
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