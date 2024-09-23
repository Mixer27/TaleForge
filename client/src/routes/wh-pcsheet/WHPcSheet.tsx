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
import { useAuth } from "../../context/AuthContext";
// import { Padding } from "@mui/icons-material";

const WHPcSheet: React.FC = () => {
    const [sheet, setSheet] = useState<PlayerCharacterSheet>(defaultPlayerCharacterSheet);
    const isInitialLoad = useRef(true);
    const [currentTab, setCurrentTab] = useState<string>(CharacterSheetTab.Stats);
    const drawerContext = useContext(DrawerContext);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { setUsername } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://devproj3ct.pl:9000/pcsheets/${id}`, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 401) {
                    console.log(response.status);
                    setUsername(null);
                    navigate('/auth');
                    return;
                }
                const data = await response.json();
                console.log(data);
                if (data) {
                    setSheet(data);
                    console.log(data);
                } else {
                    navigate('/pcsheets');
                }
            } catch (error) {
                console.error("Error fetching data!", error);
            }
        }
        fetchData();
    }, [id]);

    const updateCharacterSheet = useCallback(async (update: PlayerCharacterSheet) => {
        try {
            const response = await fetch(`https://devproj3ct.pl:9000/pcsheets/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(update),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.log(response.status);
                    localStorage.removeItem('username');
                    setUsername(null);
                    navigate('/auth');
                }
                throw new Error("Failed to update character sheet");
            }
            else {
                setSheet(update);
            }

            const updatedSheet = await response.json();
            // setSheet(updatedSheet);
            console.log("Character sheet updated succesfully.", updatedSheet);
            // navigate(`/pcsheets/${id}`);

        } catch (error) {
            console.error("Error with patch request", error, sheet);
            console.log(sheet)
            // setSheet(sheet);
        }
    }, [id, navigate]);


    // useEffect(() => {
    //     console.log(isInitialLoad.current)
    //     if (isInitialLoad.current) {
    //         return;
    //     }
    //     console.log("DEBUG", sheet)
    //     updateCharacterSheet(sheet);
    // }, [sheet, updateCharacterSheet])

    const handleSubmit = async () => {
        // e.preventDefault()
        // console.log(sheet);
        console.log("a");

    }

    const updateStats = async (key: keyof PlayerCharacterSheet, data: PlayerStats) => {
        console.log("handleUpdateStats", key, data)
        const update = {
            ...sheet,
            [key]: { ...data } as PlayerStats
        }
        updateCharacterSheet(update);
        isInitialLoad.current = false;
    }

    const updateSimple = async (key: keyof PlayerCharacterSheet, data: Array<Item> | Array<WeaponItem> | Armor | Money | Array<TalentObject> | Array<SkillwLvl> | string | Array<SpellObject> | number) => {
        if (key === "PreviousCareers" && typeof data === 'string') {
            const update = {
                ...sheet,
                PreviousCareers: data.split(", ").map((c: string) => c.trim())
            }
            updateCharacterSheet(update);
        } else {
            console.log("update simple: ", key);
            const update = {
                ...sheet,
                [key]: data,
            }
            updateCharacterSheet(update);
        }
        isInitialLoad.current = false;
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
                        <StatsDisplay stats={sheet.stats} handleSubmit={handleSubmit} handleChange={updateStats} />
                    </TabPanel >
                    <TabPanel value={CharacterSheetTab.Skills} sx={{ padding: "24px 6px 24px 6px" }}>
                        <SkillsDisplay skills={sheet.skills} stats={sheet.stats} handleSubmit={handleSubmit} handleChange={updateSimple} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Talents} sx={{ padding: "24px 6px 24px 6px" }}>
                        {/* aaa */}
                        <TalentsDisplay talents={sheet.talents} handleSubmit={handleSubmit} handleChange={updateSimple} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Spells} sx={{ padding: "24px 6px 24px 6px" }}>
                        <SpellsDisplay spells={sheet.spells} magic={sheet.stats.magic?.current ?? 0} handleSubmit={handleSubmit} handleChange={updateSimple} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Inventory} sx={{ padding: "24px 6px 24px 6px" }}>
                        <EquipmentDisplay items={sheet.items} weapons={sheet.weapons} armor={sheet.armor} money={sheet.wealth} handleSubmit={handleSubmit} handleChange={updateSimple} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Details} sx={{ padding: "24px 6px 24px 6px" }}>
                        <CharacterDetails
                            name={sheet.name}
                            race={sheet.race}
                            gender={sheet.gender}
                            currentCareer={sheet.currentCareer}
                            PreviousCareers={sheet.PreviousCareers}
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
                            mentalDisorders={sheet.mentalDisorders}
                            scarsAndWounds={sheet.scarsAndWounds}
                            religion={sheet.religion}
                            handleChange={updateSimple}
                        />
                    </TabPanel>
                </Box>
            </TabContext>
        </>
    )
}
export { WHPcSheet }