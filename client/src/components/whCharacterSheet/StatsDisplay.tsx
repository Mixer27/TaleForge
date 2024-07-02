import { Grid, Theme, useMediaQuery, useTheme } from "@mui/material"
import { StatList } from "./StatList"
import { PlayerStats } from "../../types"
import { StatTable } from "./StatTable"
import { SingleStatTable } from "./SingleStatTable"

interface Props {
    stats?: Partial<PlayerStats>
}


const StatsDisplay: React.FC<Props> = (props) => {
    const theme: Theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    // const StatsNames = props.stats ? Object.getOwnPropertyNames(props.stats) : []
    // console.log(StatsNames)

    return (
        <Grid container spacing={1} direction={isMediumScreen ? "row" : "column"} wrap={'wrap'} style={{ height: "78vh"}}>
            <Grid item xs={12} md={6} lg={2}>
                <StatTable header="Primary tats" stats={[
                    { statName: "Weapon Skills", extendedStat: props.stats?.weaponSkills },
                    { statName: "Ballistic Skills", extendedStat: props.stats?.ballisticSkills },
                    { statName: "Strength", extendedStat: props.stats?.strength },
                    { statName: "Toughness", extendedStat: props.stats?.toughness },
                    { statName: "Agility", extendedStat: props.stats?.agility },
                    { statName: "Intelligence", extendedStat: props.stats?.intelligence },
                    { statName: "Will Power", extendedStat: props.stats?.willPower },
                    { statName: "Fellowship", extendedStat: props.stats?.fellowship },
                ]}></StatTable>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
                <StatTable header="Secondary stats" stats={[
                    { statName: "Attacks", extendedStat: props.stats?.attacks },
                    { statName: "Wounds", extendedStat: props.stats?.wounds },
                    { statName: "Magic", extendedStat: props.stats?.magic },
                    { statName: "Movement", extendedStat: props.stats?.movement },
                ]}></StatTable>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
                <SingleStatTable header="Special stats" stats={[
                    { statName: "Strength Bonus", singleStat: props.stats?.strengthBonus },
                    { statName: "Toughness Bonus", singleStat: props.stats?.toughnessBonus },
                    { statName: "Magic", singleStat: props.stats?.fatePoints },
                    { statName: "Movement", singleStat: props.stats?.insanityPoints },
                ]}></SingleStatTable>
            </Grid>
            {/* <Grid item xs={"auto"}>
                <StatList header="Primary tats" stats={[
                    { statName: "Weapon Skills", extendedStat: props.stats?.weaponSkills },
                    { statName: "Ballistic Skills", extendedStat: props.stats?.ballisticSkills },
                    { statName: "Strength", extendedStat: props.stats?.strength },
                    { statName: "Toughness", extendedStat: props.stats?.toughness },
                    { statName: "Agility", extendedStat: props.stats?.agility },
                    { statName: "Intelligence", extendedStat: props.stats?.intelligence },
                    { statName: "Will Power", extendedStat: props.stats?.willPower },
                    { statName: "Fellowship", extendedStat: props.stats?.fellowship },
                ]}></StatList>
            </Grid> */}
            {/* <Grid item xs={"auto"}>
                <StatList header="Secondary stats" stats={[
                    { statName: "Attacks", extendedStat: props.stats?.attacks },
                    { statName: "Wounds", extendedStat: props.stats?.wounds },
                    { statName: "Magic", extendedStat: props.stats?.magic },
                    { statName: "Movement", extendedStat: props.stats?.movement },
                ]}></StatList>
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={2}>
                <StatList header="Special stats" stats={[
                    { statName: "Strength Bonus", singleStat: props.stats?.strengthBonus },
                    { statName: "Toughness Bonus", singleStat: props.stats?.toughnessBonus },
                    { statName: "Magic", singleStat: props.stats?.fatePoints },
                    { statName: "Movement", singleStat: props.stats?.insanityPoints },
                ]}></StatList>
            </Grid> */}
        </Grid>
    )
}

export { StatsDisplay }