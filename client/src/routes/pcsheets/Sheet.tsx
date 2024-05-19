import { Container, Grid } from "@mui/material"
import { useEffect, useState } from "react"
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

    // const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //     })
    // }

    return (
        <Container className="Sheet">
            <Button variant="contained" color="success" sx={{mb:3}}>Edit</Button>
            <Grid container className="Empty" spacing={2}>
                <Grid item xs={6} className="Empt">
                    <Grid container rowSpacing={5} spacing={2}>
                        <Grid item className="GridElement" xs={12}>
                            <CharacterStack
                                name={String(sheet.name)}
                                race={String(sheet.race)}
                                currentCareer={String(sheet.currentCareer)}
                                previousCareer={sheet.PreviousCareers?.join(", ")}
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
                                distinguishMark={sheet.distinguishMarks}
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