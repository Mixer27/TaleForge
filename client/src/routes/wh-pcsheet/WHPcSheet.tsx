import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PlayerCharacterSheet } from "../../types";
import { CharacterSheetNavBar } from "../../components/whCharacterSheet/CharacterSheetNavBar";
import { StatsDisplay } from "../../components/whCharacterSheet/StatsDisplay";
import { MainNavigationBar } from "../../components/overlay/MainNavigationBar";
import { CharacterSheetTab } from "../../types";
import { TabContext, TabPanel } from "@mui/lab";
import { DrawerContext } from "../../context/drawerContext";
import { Box } from "@mui/material";
// import { Padding } from "@mui/icons-material";

const WHPcSheet: React.FC = () => {
    const [sheet, setSheet] = useState<Partial<PlayerCharacterSheet>>({});
    const [currentTab, setCurrentTab] = useState<string>(CharacterSheetTab.Stats);
    const drawerContext = useContext(DrawerContext);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        // fetch(`https://194.59.140.170:9000/pcsheets/${id}`)
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

    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }

    // useEffect(() => {
    //     console.log(sheet);
    // }, [sheet]);

    return (
        <>
            <TabContext value={currentTab}>
                <MainNavigationBar headerText={sheet?.name} options={(<CharacterSheetNavBar isDrawerOpen={drawerContext.isDrawerOpen} currentTab={currentTab} handleChange={handleChangeTab} />)} />
                <Box mt="2em">
                    <TabPanel value={CharacterSheetTab.Stats} sx={{ padding: "24px 6px 24px 6px"}}>
                        <StatsDisplay stats={sheet.stats} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Skills}>
                        Skills
                    </TabPanel>
                </Box>
            </TabContext>
        </>
    )
}
export { WHPcSheet }