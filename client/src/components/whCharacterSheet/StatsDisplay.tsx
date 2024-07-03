import { Grid, Theme, useMediaQuery, useTheme } from "@mui/material"
import { PlayerStat, PlayerStats } from "../../types"
import { StatTable } from "./StatTable"
import { SingleStatTable } from "./SingleStatTable"
import { useState } from "react"
import { FormDialog } from "./FormDialog"
import { nameFormat } from "../../utils/format"

interface Props {
    stats?: PlayerStats
}

const defaultStat: PlayerStat = { starting: 0, current: 0, advance: 0 };

const StatsDisplay: React.FC<Props> = (props) => {
    const theme: Theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const statsNames = props.stats ? Object.getOwnPropertyNames(props.stats) : []
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStatName, setSelectedStatName] = useState<string | null>(null)
    const [selectedStat, setSelectedStat] = useState<PlayerStat | null>(null);
    const [selectedSingleStat, setSelectedSingleStat] = useState<number | null>(null);
    const handleStatClick = (statName: string) => {
        setSelectedStatName(nameFormat(statName));
        setSelectedStat(props.stats ? props.stats[statName as keyof PlayerStats] as PlayerStat : null)
        setSelectedSingleStat(null);

        setIsDialogOpen(true);
    }
    const handleSingleStatClick = (statName: string) => {
        setSelectedStatName(nameFormat(statName));
        setSelectedSingleStat(props.stats ? props.stats[statName as keyof PlayerStats] as number : null);
        setSelectedStat(null);

        setIsDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    }
    const handleSave = () => {
        // Save the updated statistics here (e.g., update the state or make an API call)
        console.log("save to DB")
        setIsDialogOpen(false);
    }
    const handleChange = (field: string, value: string) => {
        if (selectedStat) {
            const updatedStat = {
                ...selectedStat,
                extendedStat: {
                    ...selectedStat,
                    [field]: Number(value)
                }
            };
            setSelectedStat(updatedStat);
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
                headerName={selectedStatName ? selectedStatName : ""}
                extendedStat={selectedStat}
                isOpen={isDialogOpen}
                handleChange={handleChange}
                handleClose={handleCloseDialog}
                handleSave={handleSave}
            />}
            {(typeof selectedSingleStat === "number") && <FormDialog
                headerName={selectedStatName ? selectedStatName : ""}
                singleStat={selectedSingleStat}
                isOpen={isDialogOpen}
                handleChange={handleChange}
                handleClose={handleCloseDialog}
                handleSave={handleSave}
            />}
        </>
    )
}

export { StatsDisplay }