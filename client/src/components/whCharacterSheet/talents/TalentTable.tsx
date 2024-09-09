import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Talent, TalentObject } from "../../../types"
import { GridItem } from "../GridItem"
import { Paper } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';


interface Props {
    header: string,
    talents: TalentObject[]
    // handleClick: (skillName: string, talent) => void,
    handleAddSkillClick: () => void,
}

const TalentTable: React.FC<Props> = (props) => {

    return (
        <GridItem>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{props.header}</TableCell>
                            <TableCell align="center">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.talents.map((talent: TalentObject) => (
                            <TableRow key={talent.talent.name}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{talent.talent.name}</TableCell>
                                <TableCell align="center">{talent.talent.description}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow hover onClick={props.handleAddSkillClick}>
                            <TableCell align="center" colSpan={4}>Add {props.header} <AddIcon fontSize="inherit"/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </GridItem>
    )
}

export { TalentTable };