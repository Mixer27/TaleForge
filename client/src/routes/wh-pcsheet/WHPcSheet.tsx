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
import { SERVER_ADDRESS } from "../../constants";

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
                const response = await fetch(`${SERVER_ADDRESS}/pcsheets/${id}`, {
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
                if (response.status === 403) {
                    console.log(response.status);
                    navigate('/home');
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
            const response = await fetch(`${SERVER_ADDRESS}/pcsheets/${id}`, {
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
                if (response.status === 403) {
                    console.log(response.status);
                    navigate('/home');
                }
                throw new Error("Failed to update character sheet");
            }
            else {
                setSheet(update);
            }
            const updatedSheet = await response.json();
            console.log("Character sheet updated succesfully.", updatedSheet);

        } catch (error) {
            console.error("Error with patch request", error, sheet);
            console.log(sheet)
        }
    }, [id, navigate]);

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
                {sheet && <Box mt="2em">
                    <TabPanel value={CharacterSheetTab.Stats} sx={{ padding: "24px 6px 24px 6px" }}>
                        <StatsDisplay stats={sheet.stats} handleChange={updateStats} />
                    </TabPanel >
                    <TabPanel value={CharacterSheetTab.Skills} sx={{ padding: "24px 6px 24px 6px" }}>
                        <SkillsDisplay skills={sheet.skills} stats={sheet.stats} handleChange={updateSimple} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Talents} sx={{ padding: "24px 6px 24px 6px" }}>
                        <TalentsDisplay talents={sheet.talents} handleChange={updateSimple} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Spells} sx={{ padding: "24px 6px 24px 6px" }}>
                        <SpellsDisplay spells={sheet.spells} magic={ 0} handleChange={updateSimple} />
                    </TabPanel>
                    <TabPanel value={CharacterSheetTab.Inventory} sx={{ padding: "24px 6px 24px 6px" }}>
                        <EquipmentDisplay items={sheet.items} weapons={sheet.weapons} armor={sheet.armor} money={sheet.wealth} handleChange={updateSimple} />
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
                </Box>}
            </TabContext>
        </>
    )
}
export { WHPcSheet }