import { Grid, Theme, useMediaQuery, useTheme } from "@mui/material"
import { PlayerCharacterSheet, Spell, SpellObject } from "../../../types"
import { useState } from "react"
import { SpellTable } from "./SpellTable"
import { NewSpellDialog } from "./NewSpellDialog"

interface Props {
    spells: SpellObject[],
    magic: number,
    handleChange: (key: keyof PlayerCharacterSheet, value: Array<SpellObject>) => void,
}

// const defaultSkill: SkillwLvl = {  };

const SpellsDisplay: React.FC<Props> = (props) => {
    const theme: Theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    // const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null)
    // const [selectedTalent, setSelectedTalent] = useState<SkillwLvl | null>(null);
    const [newSpellDialogOpen, setNewSpellDialogOpen] = useState<boolean>(false);

    // const handleSkillClick = (skillName: string, skill: SkillwLvl) => {
    //     setSelectedSkillName(skillName);
    //     setSelectedSkill(skill);

    //     setIsDialogOpen(true);
    // }
    const handleCloseDialog = () => {
        setNewSpellDialogOpen(false);
    }
    const handleSave = () => {
        console.log("saved to DB")
        handleCloseDialog()
    }
    const handleRemoveSpell = (removedSpell: SpellObject) => {
        const updatedSpells = props.spells?.filter((s: SpellObject) => {
            return s.spell._id !== removedSpell.spell._id
        }) ?? [];
        props.handleChange("spells", updatedSpells);
        handleCloseDialog();
    }
    const handleAddSpellClick = () => {
        setNewSpellDialogOpen(true);
    }
    const handleAddSpell = (addedSpell: Spell) => {
        handleSave();
        if (props.spells && addedSpell) {
            const update: Array<SpellObject> = [...props.spells, {spell: addedSpell}];
            console.log('handleAddTalent', addedSpell, update);
            setNewSpellDialogOpen(false);
            props.handleChange("spells", update);
            // setIsDialogOpen(true)
        }
    }

    return (
        <>
            <Grid container spacing={1} direction={isMediumScreen ? "row" : "column"} wrap={'wrap'} style={{ height: !isMediumScreen ? "75vh" : "auto" }}>
                <Grid item xs={12} md={6} lg={6} style={{ minHeight: '300px' }}>
                    <SpellTable
                        header="czar"
                        handleAddSpellClick={handleAddSpellClick}
                        handleRemoveSpellClick={handleRemoveSpell}
                        spells={props.spells}
                        magic={props.magic}
                    >
                    </SpellTable>
                </Grid>
            </Grid>
            {newSpellDialogOpen && <NewSpellDialog
                headerName="Wybierz czar do dodania"
                isOpen={newSpellDialogOpen}
                spells={props.spells.map((s: SpellObject) => s.spell) ?? []}
                // handleChange={handleAdd}
                handleClose={handleCloseDialog}
                handleSave={handleAddSpell}
            />}
        </>
    )
}

export { SpellsDisplay }