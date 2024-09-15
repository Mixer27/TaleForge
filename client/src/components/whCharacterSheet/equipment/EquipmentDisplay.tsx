import { Box, Grid, Stack, Theme, useMediaQuery, useTheme } from "@mui/material"
import { Armor, ArmorItem, Item, Money, PlayerCharacterSheet, WeaponItem } from "../../../types"
// import { useState } from "react"
import { ItemTable } from "./ItemTable";
import { WeaponItemTable } from "./WeaponItemTable";
import { ArmorItemTable } from "./ArmorItemTable";
import { MoneyDisplay } from "./MoneyDisplay";
// import { getNewId } from "../../../types/fetch";
import { useCallback } from "react";

interface Props {
    items: Item[],
    weapons: WeaponItem[],
    armor: Armor,
    money: Money,
    handleSubmit: () => void,
    handleChange: (key: keyof PlayerCharacterSheet, value: Money | Armor | Item[] | WeaponItem[]) => void,
}

// const defaultStat: PlayerStat = { name: '', starting: 0, current: 0, advance: 0 };
// const defaultSingleStat: SingleStat = { name: "", current: 0 };

const EquipmentDisplay: React.FC<Props> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [newId, setNewId] = useState<string>("");
    const theme: Theme = useTheme();
    const isXLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));

    const getNewId = useCallback(async (): Promise<string> => {
        try {
            const res = await fetch(`https://uwu.sex.pl:9000/pcsheets/new_id`);
            const data = await res.json();
            if (data) {
                // setNewId(data);
                console.log("nowe ID", data);
                return (data);
            }
            else {
                return "";
            }
        } catch (error) {
            console.error("Error with get new_id request", error);
            return "";
        }
    }, [])


    const handleItemChange = (updatedItem: Item) => {
        console.log("EqDisplay", props.items, updatedItem);
        const updatedItems = props.items.map((i: Item) => {
            if (i._id === updatedItem._id) {
                return updatedItem;
            }
            else {
                return i;
            }
        })
        props.handleChange("items", updatedItems);
    }
    const handleRemoveItem = (removedItemId: string) => {
        const updatedItems = props.items.filter((i: Item) => {
            return i._id !== removedItemId;
        })
        props.handleChange('items', updatedItems);
    }
    const handleAddItem = async (addedItem: Item) => {
        // const updatedItems = [...props.items, {...addedItem, _id: uuid()}];
        const newId: string = await getNewId();
        const updatedItems = [...props.items, { ...addedItem, _id: newId }];
        props.handleChange('items', updatedItems);
    }
    const handleArmorChange = (location: keyof Armor, updatedArmorItem: ArmorItem) => {
        console.log("EqDisplay", props.armor, updatedArmorItem)
        const updatedArmor = { ...props.armor, [location]: updatedArmorItem };
        props.handleChange("armor", updatedArmor)
    }
    const handleChangeWeapon = (updatedWeapon: WeaponItem) => {
        console.log("EqDisplay", props.weapons, updatedWeapon);
        const updatedWeapons = props.weapons.map((w: WeaponItem) => {
            if (w._id === updatedWeapon._id) {
                return updatedWeapon;
            }
            else {
                return w;
            }
        })
        props.handleChange("weapons", updatedWeapons);
    }
    const handleAddWeapon = async (addedWeapon: WeaponItem) => {
        const newId: string = await getNewId();
        const updatedWeapons = [...props.weapons, { ...addedWeapon, _id: newId }]
        props.handleChange('weapons', updatedWeapons);
    }
    const handleRemoveWeapon = (removedWeaponId: string) => {
        const updatedWeapons = props.weapons.filter((w: WeaponItem) => {
            return w._id !== removedWeaponId;
        })
        props.handleChange('weapons', updatedWeapons);
    }
    const handleMoneyChange = (updatedMoney: Money) => {
        console.log("EqDisplay", props.money, updatedMoney)
        props.handleChange('wealth', updatedMoney);
    }

    return (
        <>
            <Grid container spacing={1} direction={isXLargeScreen ? "column" : "row"}>
                <Grid container item xs={12} xl={7} style={{ flexGrow: 1 }}>
                    <Box width={isXLargeScreen ? 'inherit' : "100%"}>
                        <Stack spacing={2} style={{ flexGrow: 1 }}>
                            <WeaponItemTable header="Broń" items={props.weapons ?? []} handleAddWeapon={handleAddWeapon} handleRemoveWeapon={handleRemoveWeapon} handleChangeWeapon={handleChangeWeapon} />
                            <ItemTable header="Przedmiot" items={props.items ?? []} handleChange={handleItemChange} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid container item xs={12} xl={5} style={{ flexGrow: 1 }}>
                    <Stack spacing={2} style={{ flexGrow: 1 }}>
                        <ArmorItemTable header="Pancerz" armor={props.armor} handleArmorChange={handleArmorChange} />
                        <MoneyDisplay money={props.money} handleChange={handleMoneyChange} />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export { EquipmentDisplay }