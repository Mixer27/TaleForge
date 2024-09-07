import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Talent } from "../../../types"
import { GridItem } from "../GridItem"
import { Paper } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';


interface Props {
    header: string,
    talents: Talent[]
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
                        {props.talents.map((talent: Talent) => (
                            <TableRow key={talent.name}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{talent.name}</TableCell>
                                <TableCell align="center">{talent.description}</TableCell>
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