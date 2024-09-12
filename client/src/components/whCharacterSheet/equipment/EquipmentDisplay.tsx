import { Box, Grid, Stack, Theme, useMediaQuery, useTheme } from "@mui/material"
import { Armor, ArmorItem, Item, Money, PlayerCharacterSheet, WeaponItem } from "../../../types"
// import { useState } from "react"
import { ItemTable } from "./ItemTable";
import { WeaponItemTable } from "./WeaponItemTable";
import { ArmorItemTable } from "./ArmorItemTable";
import { MoneyDisplay } from "./MoneyDisplay";

interface Props {
    items: Item[],
    weapons: WeaponItem[],
    armor: Armor,
    money: Money,
    handleSubmit: () => void,
    handleChange: (key: keyof PlayerCharacterSheet, value: string | Armor) => void,
}

// const defaultStat: PlayerStat = { name: '', starting: 0, current: 0, advance: 0 };
// const defaultSingleStat: SingleStat = { name: "", current: 0 };

const EquipmentDisplay: React.FC<Props> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const theme: Theme = useTheme();
    const isXLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));

    // const handleArmorClick = (statName: string) => {
    //     setSelectedStatName(statName);
    //     setSelectedStat(props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : null)
    //     setSelectedSingleStat(null);

    //     setIsDialogOpen(true);
    // }
    // const handleSingleStatClick = (statName: string) => {
    //     console.log("single click", statName);
    //     setSelectedStatName(statName);
    //     setSelectedSingleStat(props.stats ? props.stats[statName as keyof PlayerStats] as SingleStat : null);
    //     setSelectedStat(null);

    //     setIsDialogOpen(true);
    // }
    // const handleCloseDialog = () => {
    //     setIsDialogOpen(false);
    //     setSelectedStat(null);
    //     setSelectedSingleStat(null);
    // }
    // const handleSave = () => {
    //     // Save the updated statistics here (e.g., update the state or make an API call)
    //     props.handleSubmit()
    //     console.log("saved to DB")
    //     handleCloseDialog()
    // }
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
    const handleArmorChange = (location: keyof Armor, updatedArmorItem: ArmorItem) => {
        // if (selectedStat) {
        // setSelectedStat(updatedStat);
        console.log("EqDisplay", props.armor, updatedArmorItem)
        const updatedArmor = { ...props.armor, [location]: updatedArmorItem };
        // setStats(updatedStats);
        props.handleChange("armor", updatedArmor)
        // }
    }

    return (
        <>
            <Grid container spacing={1} direction={isXLargeScreen ? "column" : "row"}>
                <Grid container item xs={12} xl={7} style={{ flexGrow: 1 }}>
                    <Box style={{ width: "100%" }}>
                        <WeaponItemTable header="Broń" items={props.weapons ?? []} />
                    </Box>
                </Grid>
                <Grid container item xs={12} xl={5} style={{ flexGrow: 1 }}>
                    <Stack spacing={2} style={{ flexGrow: 1 }}>
                        <ArmorItemTable header="Pancerz" armor={props.armor} handleArmorChange={handleArmorChange}/>
                        <MoneyDisplay money={props.money} />
                        <ItemTable header="Przedmiot" items={props.items ?? []} />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export { EquipmentDisplay }