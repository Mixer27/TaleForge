import { Grid, Theme, useMediaQuery, useTheme } from "@mui/material"
import { PlayerCharacterSheet, Talent, TalentObject } from "../../../types"
import { useState } from "react"
import { TalentTable } from "./TalentTable"
import { NewTalentDialog } from "./NewTalentDialog"

interface Props {
    talents: TalentObject[],
    handleSubmit: () => void,
    handleChange: (key: keyof PlayerCharacterSheet, value: Array<TalentObject>) => void,
}

// const defaultSkill: SkillwLvl = {  };

const TalentsDisplay: React.FC<Props> = (props) => {
    const theme: Theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    // const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null)
    // const [selectedTalent, setSelectedTalent] = useState<SkillwLvl | null>(null);
    const [newTalentDialogOpen, setNewTalentDialogOpen] = useState<boolean>(false);

    // const handleSkillClick = (skillName: string, skill: SkillwLvl) => {
    //     setSelectedSkillName(skillName);
    //     setSelectedSkill(skill);

    //     setIsDialogOpen(true);
    // }
    const handleCloseDialog = () => {
        setNewTalentDialogOpen(false);
    }
    const handleSave = () => {
        props.handleSubmit()
        console.log("saved to DB")
        handleCloseDialog()
    }
    const handleRemoveTalent = (removedTalent: TalentObject) => {
        const updatedTalents = props.talents?.filter((t: TalentObject) => {
            return t.talent._id !== removedTalent.talent._id
        }) ?? [];
        props.handleChange("talents", updatedTalents);
        handleCloseDialog();
    }
    const handleAddTalentClick = () => {
        setNewTalentDialogOpen(true);
    }
    const handleAddTalent = (addedTalent: Talent) => {
        handleSave();
        if (props.talents && addedTalent) {
            const update: Array<TalentObject> = [...props.talents, {talent: addedTalent}];
            console.log('handleAddTalent', addedTalent, update);
            setNewTalentDialogOpen(false);
            props.handleChange("talents", update);
            // setIsDialogOpen(true)
        }
    } 

    // const handleSkillsChange = (updatedTalent: SkillwLvl) => {
    //     if (selectedTalent) {
    //         setSelectedTalent(updatedSkill);
    //         console.log("SkillDisplay", props.skills, updatedSkill)
    //         // const updatedSkills = { ...props.skills, [String(selectedSkillName)]: updatedSkill };
    //         const updatedSkills = props.skills?.map((skill) => {
    //             if (skill.skill._id === updatedSkill.skill._id) {
    //                 return updatedSkill;
    //             }
    //             else return skill;
    //         }) ?? [];
    //         console.log('updatedSkills', updatedSkills);
    //         props.handleChange("skills", updatedSkills);
    //     }
    // }

    return (
        <>
            <Grid container spacing={1} direction={isMediumScreen ? "row" : "column"} wrap={'wrap'} style={{ height: !isMediumScreen ? "75vh" : "auto" }}>
                <Grid item xs={12} md={6} lg={6} style={{ minHeight: '300px' }}>
                    <TalentTable
                        header="Talent"
                        handleAddTalentClick={handleAddTalentClick}
                        handleRemoveTalentClick={handleRemoveTalent}
                        talents={props.talents}
                    >
                    </TalentTable>
                </Grid>
            </Grid>
            {newTalentDialogOpen && <NewTalentDialog
                headerName="Wybierz talent do dodania"
                isOpen={newTalentDialogOpen}
                talents={props.talents.map((t: TalentObject) => t.talent) ?? []}
                // handleChange={handleAdd}
                handleClose={handleCloseDialog}
                handleSave={handleAddTalent}
                handleSubmit={props.handleSubmit}
            />}
        </>
    )
}

export { TalentsDisplay }