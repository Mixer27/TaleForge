import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { PlayerCharacterSheet } from "../../types";

const Sheet: React.FC = () => {
    const [sheet, setSheet] = useState<Partial<PlayerCharacterSheet>>({});

    useEffect(() => {
        fetch("https://uwu.sex.pl:9000/pcsheet")
            .then((res: Response) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setSheet(data);
            })

    }, []);

    return (
        <Box>
            <h1>{sheet.name}</h1>
            <h2>{sheet.race}</h2>
        </Box>
    )
}

export { Sheet };