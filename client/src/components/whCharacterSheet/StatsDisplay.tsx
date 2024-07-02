import { Grid, Theme, useMediaQuery, useTheme } from "@mui/material"
import { PlayerStat, PlayerStats } from "../../types"
import { StatTable } from "./StatTable"
import { SingleStatTable } from "./SingleStatTable"

interface Props {
    stats?: PlayerStats
}

const defaultStat: PlayerStat = { starting: 0, current: 0, advance: 0 };

const StatsDisplay: React.FC<Props> = (props) => {
    const theme: Theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const statsNames = props.stats ? Object.getOwnPropertyNames(props.stats) : []
    // console.log(statsNames)

    return (
        <Grid container spacing={1} direction={isMediumScreen ? "row" : "column"} wrap={'wrap'} style={{ height: !isMediumScreen ? "75vh" : ""}}>
            <Grid item xs={12} md={6} lg={2}>
                <StatTable header="Primary tats" stats={statsNames ? statsNames.slice(0, 8).map((statName: string) => ({
                    statName: statName,
                    extendedStat: props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : defaultStat
                })) : [{ statName: "", extendedStat: defaultStat }]}
                >
                </StatTable>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
                <StatTable header="Primary tats" stats={statsNames ? statsNames.slice(8, 12).map((statName: string) => ({
                    statName: statName,
                    extendedStat: props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : defaultStat
                })) : [{ statName: "", extendedStat: defaultStat }]}
                >
                </StatTable>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
                <SingleStatTable header="Primary tats" stats={statsNames ? statsNames.slice(12, 16).map((statName: string) => ({
                    statName: statName,
                    singleStat: props.stats ? props.stats[statName as keyof PlayerStats] as number : 0
                })) : [{ statName: "", singleStat: 0 }]}
                >
                </SingleStatTable>
            </Grid>
        </Grid>
    )
}

export { StatsDisplay }