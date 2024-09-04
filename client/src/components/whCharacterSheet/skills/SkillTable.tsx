import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { SkillwLvl } from "../../../types"
import { GridItem } from "../GridItem"
import { Paper } from "@mui/material"
import { nameFormat } from "../../../utils/format"
import { PlayerStats, PlayerStat, SkillLvl } from "../../../types"


interface Props {
    skills?: Array<SkillwLvl>,
    stats?: PlayerStats,
    handleClick: (statName: string) => void,
}

const calculateSkillValue = (current_value: number, skill_level: SkillLvl) => {
    switch (skill_level) {
        case SkillLvl.ADVANCED:
            return current_value + 10;
            break;
        case SkillLvl.EXPERT:
            return current_value + 20;
            break;
        default:
            return current_value;
    }
}

const SkillTable: React.FC<Props> = (props) => {

    return (
        <GridItem>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Skill name</TableCell>
                            <TableCell align="center">Advanced</TableCell>
                            <TableCell align="center">Value</TableCell>
                            <TableCell align="center">Stat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.skills?.map((skill: SkillwLvl) => (
                            <TableRow key={skill.skill.name}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => props.handleClick(String(skill.skill.name))}>
                                <TableCell>{nameFormat(skill.skill.name)}</TableCell>
                                <TableCell align="center">{skill.skill.advanced ? "X" : " "}</TableCell>
                                <TableCell align="center">
                                    {props.stats && skill.skill.relatedStatName in props.stats
                                        && typeof props.stats[skill.skill.relatedStatName as keyof PlayerStats] === 'object'
                                        ? calculateSkillValue((props.stats[skill.skill.relatedStatName as keyof PlayerStats] as PlayerStat)?.current ?? "0", skill.lvl) : "0"}
                                </TableCell>
                                <TableCell align="center">{skill.skill.relatedStatName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </GridItem>
    )
}

export { SkillTable };