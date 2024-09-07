import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PlayerCharacterSheet, SkillwLvl } from "../../types";
import { CharacterSheetNavBar } from "../../components/whCharacterSheet/CharacterSheetNavBar";
import { StatsDisplay } from "../../components/whCharacterSheet/StatsDisplay";
import { MainNavigationBar } from "../../components/overlay/MainNavigationBar";
import { CharacterSheetTab, PlayerStats, Talent } from "../../types";
import { TabContext, TabPanel } from "@mui/lab";
import { DrawerContext } from "../../context/drawerContext";
import { Box } from "@mui/material";
import { defaultPlayerCharacterSheet } from "../../utils/defaults";
import { SkillsDisplay } from "../../components/whCharacterSheet/skills/SkillsDisplay";
import { TalentsDisplay } from "../../components/whCharacterSheet/talents/TalentsDisplay";
// import { Padding } from "@mui/icons-material";

const WHPcSheet: React.FC = () => {
    const [sheet, setSheet] = useState<PlayerCharacterSheet>(defaultPlayerCharacterSheet);
    const isInitialLoad = useRef(true);
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
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data!", error);
            })

    }, [id]);

    const updateCharacterSheet = useCallback(async (sheet: PlayerCharacterSheet) => {
        try {
            const response = await fetch(`https://uwu.sex.pl:9000/pcsheets/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(sheet),
            });

            if (!response.ok) {
                throw new Error("Failed to update character sheet");
            }

            // await response.json()
            const updatedSheet = await response.json();
            console.log("Character sheet updated succesfully.", updatedSheet);
            navigate(`/pcsheets/${id}`);

        } catch (error) {
            // console.error("Error with patch request", error);
        }
    }
        , [id, navigate]);

    const handleSubmit = async () => {
        // e.preventDefault()
        // console.log(sheet);
        console.log("a");

    }

    useEffect(() => {
        console.log(isInitialLoad.current)
        if (isInitialLoad.current) {
            return;
        }
        console.log("DEBUG")
        updateCharacterSheet(sheet);
    }, [sheet, updateCharacterSheet])

    const handleChange = (key: keyof PlayerCharacterSheet, value: string | PlayerStats | Array<SkillwLvl>  | Array<Talent>) => {
        // console.log("zmieniam sheet", name, value)
        if (key === "PreviousCareers" && typeof value === 'string') {
            setSheet({
                ...sheet,
                PreviousCareers: value.split(",").map((c: string) => c.trim())
            })
        }
        else if (key === 'stats' && typeof value === 'object') {
            const update: PlayerCharacterSheet = {
                ...sheet,
                [key]: { ...value } as PlayerStats

            }
            setSheet(update)
            // console.log("SHEET - zmiana statów", value, update.stats, sheet.stats)
        }
        else if (key === 'skills' && Array.isArray(value) && value.every((v) => 'skill' in v && 'lvl' in v)) {
            console.log("change skills")
            setSheet({
                ...sheet,
                [key]: value,
            })
        }
        else if (key === 'talents' && Array.isArray(value) && value.every((v) => 'name' in v && 'description' in v)) {
            console.log("change talents")
            setSheet({
                ...sheet,
                [key]: value,
            })
        }
        else {
            console.log("change other")
            setSheet({
                ...sheet,
                [key]: value,
            });
        }
        // przy zmianie zamyka initail load
        isInitialLoad.current = false;
        console.log("SHEET", sheet.stats)
    }

    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
        localStorage.setItem('currentTab', newValue); // Zapisanie wybranej karty
    }

// ustawianie otwartej karty przy ładowaniu strony
    useEffect(() => {
        const savedTab = localStorage.getItem('currentTab');
        if (savedTab) {
            setCurrentTab(savedTab);
        }
    }, []);

    return (
        <>
            <TabContext value={currentTab}>
                <MainNavigationBar headerText={sheet?.name} options={(<CharacterSheetNavBar isDrawerOpen={drawerContext.isDrawerOpen} currentTab={currentTab} handleChange={handleChangeTab} />)} />
                <Box mt="2em">
                    <TabPanel value={CharacterSheetTab.Stats} sx={{ padding: "24px 6px 24px 6px" }}>
                        <StatsDisplay stats={sheet.stats} handleSubmit={handleSubmit} handleChange={handleChange} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Skills}>
                        <SkillsDisplay skills={sheet.skills} stats={sheet.stats} handleSubmit={handleSubmit} handleChange={handleChange} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Talents}>
                        {/* aaa */}
                        <TalentsDisplay talents={sheet.talents} handleSubmit={handleSubmit} handleChange={handleChange} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Spells}>
                        aaa
                        {/* <TalentsDisplay talents={sheet.talents} handleSubmit={handleSubmit} handleChange={handleChange} /> */}
                    </TabPanel>
                </Box>
            </TabContext>
        </>
    )
}
export { WHPcSheet }