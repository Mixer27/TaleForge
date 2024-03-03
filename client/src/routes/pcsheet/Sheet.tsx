import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { PlayerCharacterSheet } from "../../types";
import { useParams } from "react-router-dom";

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
        <Box>
            <h1>{sheet.name}</h1>
            <h2>{sheet.race}</h2>
            <h3>{sheet.currentCareer}</h3>
        </Box>
    )
}

export { Sheet };