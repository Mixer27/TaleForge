import { Grid, Theme, useMediaQuery, useTheme } from "@mui/material"
import { Armor, Item, PlayerCharacterSheet, PlayerStat, PlayerStats, SingleStat, WeaponItem } from "../../../types"
import { useState } from "react"
import { ItemTable } from "./ItemTable";
import { WeaponItemTable } from "./WeaponItemTable";
import { ArmorItemTable } from "./ArmorItemTable";

interface Props {
    stats ?: PlayerStats,
        items: Item[],
            weapons: WeaponItem[],
                armor: Armor,
                    handleSubmit: () => void,
                        handleChange: (key: keyof PlayerCharacterSheet, value: string | PlayerStats) => void,
}

// const defaultStat: PlayerStat = { name: '', starting: 0, current: 0, advance: 0 };
// const defaultSingleStat: SingleStat = { name: "", current: 0 };

const EquipmentDisplay: React.FC<Props> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const theme: Theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
    const isXLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStatName, setSelectedStatName] = useState<string | null>(null)
    const [selectedStat, setSelectedStat] = useState<PlayerStat | null>(null);
    const [selectedSingleStat, setSelectedSingleStat] = useState<SingleStat | null>(null);

    const handleStatClick = (statName: string) => {
        setSelectedStatName(statName);
        setSelectedStat(props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : null)
        setSelectedSingleStat(null);

        setIsDialogOpen(true);
    }
    const handleSingleStatClick = (statName: string) => {
        console.log("single click", statName);
        setSelectedStatName(statName);
        setSelectedSingleStat(props.stats ? props.stats[statName as keyof PlayerStats] as SingleStat : null);
        setSelectedStat(null);

        setIsDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedStat(null);
        setSelectedSingleStat(null);
    }
    const handleSave = () => {
        // Save the updated statistics here (e.g., update the state or make an API call)
        props.handleSubmit()
        console.log("saved to DB")
        handleCloseDialog()
    }
    // const handleStatChange = (field: string, value: string) => {
    //     if (selectedStat) {
    //         const updatedStat = {
    //             ...selectedStat,
    //             [field]: Number(value),
    //         };
    //         setSelectedStat(updatedStat);
    //         console.log("StatsDisplay", props.stats, updatedStat)
    //         const updatedStats = { ...props.stats, [String(selectedStatName)]: updatedStat };
    //         setStats(updatedStats);
    //         props.handleChange("stats", updatedStats)
    //     }
    // }
    const handleStatChange = (updatedStat: PlayerStat) => {
        if (selectedStat) {
            setSelectedStat(updatedStat);
            console.log("StatsDisplay", props.stats, updatedStat)
            const updatedStats = { ...props.stats, [String(selectedStatName)]: updatedStat };
            // setStats(updatedStats);
            props.handleChange("stats", updatedStats)
        }
    }
    const handleSingleStatChange = (value: SingleStat) => {
        if (selectedSingleStat) {
            setSelectedSingleStat(value);
            const updatedStats = { ...props.stats, [String(selectedStatName)]: value }
            // setStats(updatedStats);
            props.handleChange("stats", updatedStats)
        }
    }

    return (
        <>
            <Grid container spacing={1} direction={isXLargeScreen ? "row" : "column"} wrap={'wrap'} style={{ height: !isXLargeScreen ? "75vh" : "" }}>
                <Grid item xs={12} md={12} xl={12} >
                    <WeaponItemTable header="Broń" items={props.weapons ?? []} />
                </Grid>
                <Grid item xs={12} md={12} xl={1}>
                    <Grid container spacing={1} direction="row" sx={{marginRight: 1.8}}>
                        <Grid item xs={12} md={12} xl={7}>
                            <ArmorItemTable header="Pancerz" armor={props.armor} />
                        </Grid>
                        <Grid item xs={12} md={12} xl={7}>
                            <ItemTable header="Przedmiot" items={props.items ?? []} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}

export { EquipmentDisplay }