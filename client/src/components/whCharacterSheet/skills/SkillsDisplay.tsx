import { Grid, Theme, useMediaQuery, useTheme } from "@mui/material"
import { PlayerCharacterSheet, PlayerStats } from "../../../types"
import { SkillTable } from "./SkillTable"
import { useState } from "react"
import { SkillDialog } from "./SkillDialog"
import { nameFormat } from "../../../utils/format"
import { SkillwLvl } from "../../../types"

interface Props {
    stats?: PlayerStats,
    skills?: Array<SkillwLvl>,
    handleSubmit: () => void,
    handleChange: (key: keyof PlayerCharacterSheet, value: string | PlayerStats | Array<SkillwLvl>) => void,
}

// const defaultStat: PlayerStat = { starting: 0, current: 0, advance: 0 };

const SkillsDisplay: React.FC<Props> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [_skills, setSkills] = useState<PlayerStats>(props.stats ? { ...props.stats } : {})
    const theme: Theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null)
    const [selectedSkill, setSelectedSkill] = useState<SkillwLvl | null>(null);
    // const [selectedSingleStat, setSelectedSingleStat] = useState<number | null>(null);

    const handleSkillClick = (skillName: string, skill: SkillwLvl) => {
        setSelectedSkillName(skillName);
        // setSelectedStat(props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : null)
        setSelectedSkill(skill);

        setIsDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedSkill(null);
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
    // const handleSingleStatChange = (value: string) => {
    //     if (typeof selectedSingleStat === "number") {
    //         setSelectedSingleStat(Number(value));
    //         const updatedStats = { ...props.stats, [String(selectedStatName)]: Number(value) }
    //         setStats(updatedStats);
    //         props.handleChange("stats", updatedStats)
    //     }
    // }

    return (
        <>
            <Grid container spacing={1} direction={isMediumScreen ? "row" : "column"} wrap={'wrap'} style={{ height: !isMediumScreen ? "75vh" : "" }}>
                <Grid item xs={12} md={6} lg={2}>
                    <SkillTable
                        header="Basic Skills"
                        handleClick={handleSkillClick}
                        skills={props.skills?.filter((skill: SkillwLvl) => skill.skill.advanced === false)}
                        stats={props.stats}
                    >
                    </SkillTable>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                <SkillTable
                        header="Advanced Skills"
                        handleClick={handleSkillClick}
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
                handleSubmit={props.handleSubmit}
            />}
            {/* {(typeof selectedSingleStat === "number") && <FormDialog
                headerName={selectedStatName ? nameFormat(selectedStatName) : ""}
                singleStat={selectedSingleStat}
                isOpen={isDialogOpen}
                handleSingleChange={handleSingleStatChange}
                handleClose={handleCloseDialog}
                handleSave={handleSave}
                handleSubmit={props.handleSubmit}
            />} */}
        </>
    )
}

export { SkillsDisplay }