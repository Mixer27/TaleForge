import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { SkillwLvl } from "../../../types"
import { GridItem } from "../GridItem"
import { Paper } from "@mui/material"
import { nameFormat } from "../../../utils/format"
import { PlayerStats, PlayerStat, SkillLvl } from "../../../types"
import AddIcon from '@mui/icons-material/Add';


interface Props {
    header: string,
    skills: Array<SkillwLvl>,
    stats?: PlayerStats,
    handleClick: (skillName: string, skill: SkillwLvl) => void,
    handleAddSkillClick: () => void,
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

const alphabeticalSort = (array: Array<SkillwLvl>) => {
    if (array.every((v) => 'skill' in v)) {
        return array.sort((a: SkillwLvl, b: SkillwLvl) => {
            if (a.skill.name < b.skill.name) {
                return -1
            }
            if (a.skill.name > b.skill.name) {
                return 1
            }
            return 0
        })
    }
    else return []
}

const SkillTable: React.FC<Props> = (props) => {

    return (
        <GridItem>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{props.header}</TableCell>
                            <TableCell align="center">Wyszkolenie</TableCell>
                            <TableCell align="center">Wartość</TableCell>
                            <TableCell align="center">Statystyka</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alphabeticalSort(props.skills).map((skill: SkillwLvl) => (
                            <TableRow key={skill.skill.name}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => props.handleClick(String(skill.skill.name), skill)}>
                                <TableCell>{nameFormat(skill.skill.name)}</TableCell>
                                <TableCell align="center">{nameFormat(skill.lvl)}</TableCell>
                                <TableCell align="center">
                                    {props.stats && skill.skill.relatedStatName in props.stats
                                        && typeof props.stats[skill.skill.relatedStatName as keyof PlayerStats] === 'object'
                                        ? calculateSkillValue((props.stats[skill.skill.relatedStatName as keyof PlayerStats] as PlayerStat)?.current ?? "0", skill.lvl) : "0"}
                                </TableCell>
                                <TableCell align="center">{props.stats?.[skill.skill.relatedStatName as keyof PlayerStats]?.name ?? ""}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow hover onClick={props.handleAddSkillClick}>
                            <TableCell align="center" colSpan={4}>dodaj umiejętność<AddIcon fontSize="inherit"/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </GridItem>
    )
}

export { SkillTable };