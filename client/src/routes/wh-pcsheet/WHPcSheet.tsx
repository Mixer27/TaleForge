import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Armor, PlayerCharacterSheet, SkillwLvl, SpellObject, TalentObject, Money, Item, WeaponItem } from "../../types";
import { CharacterSheetNavBar } from "../../components/whCharacterSheet/CharacterSheetNavBar";
import { StatsDisplay } from "../../components/whCharacterSheet/StatsDisplay";
import { MainNavigationBar } from "../../components/overlay/MainNavigationBar";
import { CharacterSheetTab, PlayerStats } from "../../types";
import { TabContext, TabPanel } from "@mui/lab";
import { DrawerContext } from "../../context/drawerContext";
import { Box } from "@mui/material";
import { defaultPlayerCharacterSheet } from "../../utils/defaults";
import { SkillsDisplay } from "../../components/whCharacterSheet/skills/SkillsDisplay";
import { TalentsDisplay } from "../../components/whCharacterSheet/talents/TalentsDisplay";
import { SpellsDisplay } from "../../components/whCharacterSheet/spells/SpellsDisplay";
import { EquipmentDisplay } from "../../components/whCharacterSheet/equipment/EquipmentDisplay";
import { CharacterDetails } from "../../components/whCharacterSheet/details/CharacterDetails";
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
                if (data) {
                    setSheet(data);
                    console.log(data);
                }
                else {
                    navigate('/pcsheets');
                }
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

            const updatedSheet = await response.json();
            // setSheet(updatedSheet);
            console.log("Character sheet updated succesfully.", updatedSheet);
            navigate(`/pcsheets/${id}`);

        } catch (error) {
            console.error("Error with patch request", error);
        }
    }, [id, navigate]);

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
        console.log("DEBUG", sheet)
        updateCharacterSheet(sheet);
    }, [sheet, updateCharacterSheet])

    const handleChange = async (key: keyof PlayerCharacterSheet, value: string | PlayerStats | SkillwLvl[] | TalentObject[] | SpellObject[] | Item[] | WeaponItem[] | Armor | Money) => {
        // console.log("zmieniam sheet", name, value)
        console.log("handle Change", key, value)
        let update: PlayerCharacterSheet = sheet;
        if (key === "PreviousCareers" && typeof value === 'string') {
            update = {
                ...sheet,
                PreviousCareers: value.split(",").map((c: string) => c.trim())
            }
        }
        else if (key === 'stats' && typeof value === 'object') {
            update = {
                ...sheet,
                [key]: { ...value } as PlayerStats

            }
            // setSheet(update)
            // console.log("SHEET - zmiana statów", value, update.stats, sheet.stats)
        }
        else if (key === 'skills' && Array.isArray(value) && value.every((v) => 'skill' in v && 'lvl' in v)) {
            console.log("change skills", value)
            update = {
                ...sheet,
                [key]: value,
            }
        }
        else if (key === 'talents' && Array.isArray(value) && value.every((v) => "talent" in v)) {
            update = {
                ...sheet,
                [key]: value as Array<TalentObject>,
            }
            console.log("change talents", value, update)
            // setSheet(update)
        }
        else if (key === 'spells' && Array.isArray(value) && value.every((v) => "spell" in v)) {
            update = {
                ...sheet,
                [key]: value as Array<SpellObject>,
            }
            console.log("change spells", value, update)
            // setSheet(update)
        }
        else if (key === 'armor' && typeof value === 'object' && 'armor' in value) {
            update = {
                ...sheet,
                [key]: value as Armor,
            }
            console.log("change armor", value, update)
            // setSheet(update)
        }
        else if (key === 'wealth' && typeof value === 'object' && 'gc' in value) {
            update = {
                ...sheet,
                [key]: value as Money,
            }
            console.log("change armor", value, update)
            // setSheet(update)
        }
        else {
            update = {
                ...sheet,
                [key]: value,
            }
            console.log("change other", value, update)
            // setSheet(update)

        }
        // przy zmianie zamyka initail load
        // setSheet(update)
        setSheet(update);
        await updateCharacterSheet(update);
        // isInitialLoad.current = false;
        // console.log("SHEET", sheet.stats)
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
                    </TabPanel >
                    <TabPanel value={CharacterSheetTab.Skills} sx={{ padding: "24px 6px 24px 6px" }}>
                        <SkillsDisplay skills={sheet.skills} stats={sheet.stats} handleSubmit={handleSubmit} handleChange={handleChange} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Talents} sx={{ padding: "24px 6px 24px 6px" }}>
                        {/* aaa */}
                        <TalentsDisplay talents={sheet.talents} handleSubmit={handleSubmit} handleChange={handleChange} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Spells} sx={{ padding: "24px 6px 24px 6px" }}>
                        <SpellsDisplay spells={sheet.spells} magic={sheet.stats.magic?.current ?? 0} handleSubmit={handleSubmit} handleChange={handleChange} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Inventory} sx={{ padding: "24px 6px 24px 6px" }}>
                        <EquipmentDisplay items={sheet.items} weapons={sheet.weapons} armor={sheet.armor} money={sheet.wealth} handleSubmit={handleSubmit} handleChange={handleChange} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Details} sx={{ padding: "24px 6px 24px 6px" }}>
                        <CharacterDetails
                            name={sheet.name}
                            race={sheet.race}
                            gender={sheet.gender}
                            currentCareer={sheet.currentCareer}
                            previousCareers={sheet.PreviousCareers}
                            age={sheet.age}
                            eyeColor={sheet.eyeColor}
                            hairColor={sheet.hairColor}
                            starSign={sheet.starSign}
                            weight={sheet.weight}
                            height={sheet.height}
                            numOfSiblings={sheet.numOfSiblings}
                            birthplace={sheet.birthplace}
                            distinguishMarks={sheet.distinguishMarks}
                            backstory={sheet.backstory}
                        />
                    </TabPanel>
                </Box>
            </TabContext>
        </>
    )
}
export { WHPcSheet }