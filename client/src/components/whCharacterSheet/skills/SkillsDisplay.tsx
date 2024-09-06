import { Grid, Theme, useMediaQuery, useTheme } from "@mui/material"
import { PlayerCharacterSheet, PlayerStats, Skill, SkillLvl } from "../../../types"
import { SkillTable } from "./SkillTable"
import { useState } from "react"
import { SkillDialog } from "./SkillDialog"
import { nameFormat } from "../../../utils/format"
import { SkillwLvl } from "../../../types"
import { NewSkillDialog } from "./NewSkillDialog"

interface Props {
    stats?: PlayerStats,
    skills?: Array<SkillwLvl>,
    handleSubmit: () => void,
    handleChange: (key: keyof PlayerCharacterSheet, value: string | PlayerStats | Array<SkillwLvl>) => void,
}

// const defaultSkill: SkillwLvl = {  };

const SkillsDisplay: React.FC<Props> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [_skills, setSkills] = useState<PlayerStats>(props.stats ? { ...props.stats } : {})
    const theme: Theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null)
    const [selectedSkill, setSelectedSkill] = useState<SkillwLvl | null>(null);
    const [newSkillDialogOpen, setNewSkillDialogOpen] = useState<boolean>(false);
    // const [selectedSingleStat, setSelectedSingleStat] = useState<number | null>(null);

    const handleSkillClick = (skillName: string, skill: SkillwLvl) => {
        setSelectedSkillName(skillName);
        // setSelectedStat(props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : null)
        setSelectedSkill(skill);

        setIsDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setNewSkillDialogOpen(false);
        setSelectedSkill(null);
    }
    const handleSave = () => {
        props.handleSubmit()
        console.log("saved to DB")
        handleCloseDialog()
    }
    const handleRemoveSkill = (removedSkill: SkillwLvl) => {
        const updatedSkills = props.skills?.filter((s) => {
            return s.skill._id !== removedSkill.skill._id
        }) ?? [];
        props.handleChange("skills", updatedSkills);
        handleCloseDialog();
    }
    const handleAddSkillClick = () => {
        setNewSkillDialogOpen(true);
    }
    const handleAddSkill = (addedSkill: Skill) => {
        handleSave();
        if (props.skills && addedSkill) {
            const updatedSkills = [...props.skills, {skill: addedSkill, lvl: SkillLvl.NORMAL}];
            setNewSkillDialogOpen(false);
            props.handleChange("skills", updatedSkills);
            // setIsDialogOpen(true)
        }
    } 

    const handleSkillsChange = (updatedSkill: SkillwLvl) => {
        if (selectedSkill) {
            setSelectedSkill(updatedSkill);
            console.log("SkillDisplay", props.skills, updatedSkill)
            // const updatedSkills = { ...props.skills, [String(selectedSkillName)]: updatedSkill };
            const updatedSkills = props.skills?.map((skill) => {
                if (skill.skill._id === updatedSkill.skill._id) {
                    return updatedSkill;
                }
                else return skill;
            }) ?? [];
            console.log('updatedSkills', updatedSkills);
            props.handleChange("skills", updatedSkills);
        }
    }

    return (
        <>
            <Grid container spacing={1} direction={isMediumScreen ? "row" : "column"} wrap={'wrap'} style={{ height: !isMediumScreen ? "75vh" : "auto" }}>
                <Grid item xs={12} md={6} lg={6} style={{ minHeight: '300px' }}>
                    <SkillTable
                        header="Basic Skills"
                        handleClick={handleSkillClick}
                        handleAddSkillClick={handleAddSkillClick}
                        skills={props.skills?.filter((skill: SkillwLvl) => skill.skill.advanced === false)}
                        stats={props.stats}
                    >
                    </SkillTable>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                <SkillTable
                        header="Advanced Skills"
                        handleClick={handleSkillClick}
                        handleAddSkillClick={handleAddSkillClick}
                        skills={props.skills?.filter((skill: SkillwLvl) => skill.skill.advanced === true)}
                        stats={props.stats}
                    >
                    </SkillTable>
                </Grid>
            </Grid>
            {selectedSkill && <SkillDialog
                headerName={selectedSkillName ? nameFormat(selectedSkillName) : ""}
                skill={selectedSkill}
                isOpen={isDialogOpen}
                handleChange={handleSkillsChange}
                handleClose={handleCloseDialog}
                handleSave={handleSave}
                handleRemoveSkill={handleRemoveSkill}
                handleSubmit={props.handleSubmit}
            />}
            {newSkillDialogOpen && <NewSkillDialog
                headerName="Select Skill to add"
                isOpen={newSkillDialogOpen}
                skills={props.skills?.map((s: SkillwLvl) => s.skill) ?? []}
                handleChange={handleAddSkill}
                handleClose={handleCloseDialog}
                handleSave={handleAddSkill}
                handleSubmit={props.handleSubmit}
            />}
        </>
    )
}

export { SkillsDisplay }