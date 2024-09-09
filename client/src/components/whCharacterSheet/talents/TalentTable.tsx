import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { TalentObject } from "../../../types"
import { GridItem } from "../GridItem"
import { Paper } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';



interface Props {
    header: string,
    talents: TalentObject[]
    // handleClick: (skillName: string, talent) => void,
    handleAddTalentClick: () => void,
    handleRemoveTalentClick: (removedTalent: TalentObject) => void
}

const TalentTable: React.FC<Props> = (props) => {

    return (
        <GridItem>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{props.header}</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.talents.map((talent: TalentObject) => (
                            <TableRow key={talent.talent.name}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{talent.talent.name}</TableCell>
                                <TableCell align="left">{talent.talent.description}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete" size="small" onClick={() => props.handleRemoveTalentClick(talent)}>
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow hover onClick={props.handleAddTalentClick}>
                            <TableCell align="center" colSpan={4}>Add {props.header} <AddIcon fontSize="inherit" /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </GridItem>
    )
}

export { TalentTable };