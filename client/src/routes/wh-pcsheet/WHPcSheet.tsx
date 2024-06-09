import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlayerCharacterSheet } from "../../types";
import { Box } from "@mui/material";
import { CharacterSheetNavBar } from "../../components/whCharacterSheet/CharacterSheetNavBar";
import { StatsDisplay } from "../../components/whCharacterSheet/StatsDisplay";
import { MainNavigationBar } from "../../components/overlay/MainNavigationBar";

const WHPcSheet: React.FC = () => {
    const [sheet, setSheet] = useState<Partial<PlayerCharacterSheet>>({});
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        fetch(`https://194.59.140.170:9000/pcsheets/${id}`)
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(sheet);
        try {
            const response = await fetch(`https://194.59.140.170:9000/pcsheets/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(sheet),
            });

            if (!response.ok) {
                throw new Error("Failed to update character sheet");
            }

            const updatedSheet = await response.json();
            console.log("Character sheet updated succesfully.", updatedSheet);
            navigate(`/pcsheets/${id}`);

        } catch (error) {
            console.error("Error with patch request", error);
        }
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

    useEffect(() => {
        console.log(sheet);
    }, [sheet]);

    return (
        <>
            <MainNavigationBar headerText={sheet?.name} />
            <CharacterSheetNavBar />
            <Box m={2}>
                <StatsDisplay stats={sheet.stats} />
            </Box>
        </>
    )
}
export { WHPcSheet }