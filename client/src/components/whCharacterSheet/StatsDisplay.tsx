import { Grid, Theme, useMediaQuery, useTheme } from "@mui/material"
import { PlayerCharacterSheet, PlayerStat, PlayerStats, SingleStat } from "../../types"
import { StatTable } from "./StatTable"
import { SingleStatTable } from "./SingleStatTable"
import { useState } from "react"
import { FormDialog } from "./FormDialog"

interface Props {
    stats?: PlayerStats,
    handleSubmit: () => void,
    handleChange: (key: keyof PlayerCharacterSheet, data: PlayerStats) => void,
}

const defaultStat: PlayerStat = { name: '', starting: 0, current: 0, advance: 0 };
const defaultSingleStat: SingleStat = { name: "", current: 0 };

const StatsDisplay: React.FC<Props> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_stats, setStats] = useState<PlayerStats>(props.stats ? { ...props.stats } : {})
    const theme: Theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const statsNames = props.stats ? Object.getOwnPropertyNames(props.stats) : []
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
            setStats(updatedStats);
            props.handleChange("stats", updatedStats)
        }
    }
    const handleSingleStatChange = (value: SingleStat) => {
        if (selectedSingleStat) {
            setSelectedSingleStat(value);
            const updatedStats = { ...props.stats, [String(selectedStatName)]: value }
            setStats(updatedStats);
            props.handleChange("stats", updatedStats)
        }
    }

    return (
        <>
            <Grid container spacing={1} direction={isMediumScreen ? "row" : "column"} wrap={'wrap'} style={{ height: !isMediumScreen ? "75vh" : "" }}>
                <Grid item xs={12} md={6} lg={2}>
                    <StatTable
                        header="Cechy główne"
                        handleClick={handleStatClick}
                        stats={statsNames ? statsNames.slice(0, 8).map((statName: string) => ({
                            key: statName,
                            stat: props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : defaultStat
                        })) : []}
                    >
                    </StatTable>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <StatTable
                        header="cechy drugorzędne"
                        handleClick={handleStatClick}
                        stats={statsNames ? statsNames.slice(8, 12).map((statName: string) => ({
                            key: statName,
                            stat: props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : defaultStat
                        })) : []}
                    >
                    </StatTable>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <SingleStatTable
                        header="Pozostałe cechy"
                        handleClick={handleSingleStatClick}
                        // stats={[props.stats?.strengthBonus ?? defaultSingleStat, props.stats?.toughnessBonus ?? defaultSingleStat, props.stats?.insanityPoints ?? defaultSingleStat, props.stats?.fatePoints ?? defaultSingleStat] ?? []}
                        stats={statsNames ? statsNames.slice(12, 16).map((statName: string) => ({
                            key: statName,
                            stat: props.stats?.[statName as keyof PlayerStats] ?? defaultSingleStat,
                            // current: props.stats ? props.stats[statName as keyof PlayerStats]?.current as number : 0
                        })) : []}
                    >
                    </SingleStatTable>
                </Grid>
            </Grid >
            {selectedStat && <FormDialog
                headerName={props.stats?.[selectedStatName as keyof PlayerStats]?.name ?? ""}
                stat={selectedStat}
                isOpen={isDialogOpen}
                handleChange={handleStatChange}
                handleClose={handleCloseDialog}
                handleSave={handleSave}
                handleSubmit={props.handleSubmit}
            />
            }
            {selectedSingleStat && <FormDialog
                headerName={props.stats?.[selectedStatName as keyof PlayerStats]?.name ?? ""}
                singleStat={selectedSingleStat}
                isOpen={isDialogOpen}
                handleSingleChange={handleSingleStatChange}
                handleClose={handleCloseDialog}
                handleSave={handleSave}
                handleSubmit={props.handleSubmit}
            />
            }
        </>
    )
}

export { StatsDisplay }