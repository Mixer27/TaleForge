import { Grid, Theme, useMediaQuery, useTheme } from "@mui/material"
import { PlayerStat, PlayerStats } from "../../types"
import { StatTable } from "./StatTable"
import { SingleStatTable } from "./SingleStatTable"
import { useState } from "react"
import { FormDialog } from "./FormDialog"
import { nameFormat } from "../../utils/format"

interface Props {
    stats?: PlayerStats,
    handleSubmit: () => void,
    handleChange: (key: string, value: string | PlayerStats) => void,
}

const defaultStat: PlayerStat = { starting: 0, current: 0, advance: 0 };

const StatsDisplay: React.FC<Props> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_stats, setStats] = useState<PlayerStats>(props.stats ? {...props.stats} : {})
    const theme: Theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const statsNames = props.stats ? Object.getOwnPropertyNames(props.stats) : []
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStatName, setSelectedStatName] = useState<string | null>(null)
    const [selectedStat, setSelectedStat] = useState<PlayerStat | null>(null);
    const [selectedSingleStat, setSelectedSingleStat] = useState<number | null>(null);
    
    const handleStatClick = (statName: string) => {
        setSelectedStatName(statName);
        setSelectedStat(props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : null)
        setSelectedSingleStat(null);

        setIsDialogOpen(true);
    }
    const handleSingleStatClick = (statName: string) => {
        setSelectedStatName(statName);
        setSelectedSingleStat(props.stats ? props.stats[statName as keyof PlayerStats] as number : null);
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
            // const updatedStat = {
            //     ...selectedStat,
            //     [field]: Number(value),
            // };
            setSelectedStat(updatedStat);
            console.log("StatsDisplay", props.stats, updatedStat)
            const updatedStats = { ...props.stats, [String(selectedStatName)]: updatedStat };
            setStats(updatedStats);
            props.handleChange("stats", updatedStats)
        }
    }
    const handleSingleStatChange = (value: string) => {
        if (typeof selectedSingleStat === "number") {
            setSelectedSingleStat(Number(value));
            const updatedStats = { ...props.stats, [String(selectedStatName)]: Number(value) }
            setStats(updatedStats);
            props.handleChange("stats", updatedStats)
        }
    }

    return (
        <>
            <Grid container spacing={1} direction={isMediumScreen ? "row" : "column"} wrap={'wrap'} style={{ height: !isMediumScreen ? "75vh" : "" }}>
                <Grid item xs={12} md={6} lg={2}>
                    <StatTable
                        header="Primary stats"
                        handleClick={handleStatClick}
                        stats={statsNames ? statsNames.slice(0, 8).map((statName: string) => ({
                            statName: statName,
                            extendedStat: props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : defaultStat
                        })) : [{ statName: "", extendedStat: defaultStat }]}
                    >
                    </StatTable>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <StatTable
                        header="Primary stats"
                        handleClick={handleStatClick}
                        stats={statsNames ? statsNames.slice(8, 12).map((statName: string) => ({
                            statName: statName,
                            extendedStat: props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : defaultStat
                        })) : [{ statName: "", extendedStat: defaultStat }]}
                    >
                    </StatTable>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <SingleStatTable
                        header="Primary stats"
                        handleClick={handleSingleStatClick}
                        stats={statsNames ? statsNames.slice(12, 16).map((statName: string) => ({
                            statName: statName,
                            singleStat: props.stats ? props.stats[statName as keyof PlayerStats] as number : 0
                        })) : [{ statName: "", singleStat: 0 }]}
                    >
                    </SingleStatTable>
                </Grid>
            </Grid>
            {selectedStat && <FormDialog
                headerName={selectedStatName ? nameFormat(selectedStatName) : ""}
                stat={selectedStat}
                isOpen={isDialogOpen}
                handleChange={handleStatChange}
                handleClose={handleCloseDialog}
                handleSave={handleSave}
                handleSubmit={props.handleSubmit}
            />}
            {(typeof selectedSingleStat === "number") && <FormDialog
                headerName={selectedStatName ? nameFormat(selectedStatName) : ""}
                singleStat={selectedSingleStat}
                isOpen={isDialogOpen}
                handleSingleChange={handleSingleStatChange}
                handleClose={handleCloseDialog}
                handleSave={handleSave}
                handleSubmit={props.handleSubmit}
            />}
        </>
    )
}

export { StatsDisplay }