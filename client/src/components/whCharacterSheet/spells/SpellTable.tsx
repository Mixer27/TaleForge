import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { SpellObject } from "../../../types"
import { GridItem } from "../GridItem"
import { Paper } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';



interface Props {
    header: string,
    spells: SpellObject[],
    magic: number,
    // handleClick: (skillName: string, talent) => void,
    handleAddSpellClick: () => void,
    handleRemoveSpellClick: (removedSpell: SpellObject) => void
}

const alphabeticalSort = (array: Array<SpellObject>) => {
    if (array.every((v) => 'spell' in v)) {
        return array.sort((a: SpellObject, b: SpellObject) => {
            if (a.spell.name < b.spell.name) {
                return -1
            }
            if (a.spell.name > b.spell.name) {
                return 1
            }
            return 0
        })
    }
    else return []
}


const SpellTable: React.FC<Props> = (props) => {

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
                        {alphabeticalSort(props.spells ?? []).map((spell: SpellObject) => (
                            <TableRow key={spell.spell.name}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{spell.spell.name}</TableCell>
                                <TableCell align="left">{spell.spell.description}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete" size="small" onClick={() => props.handleRemoveSpellClick(spell)}>
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow hover onClick={props.handleAddSpellClick}>
                            <TableCell align="center" colSpan={4}>Add {props.header} <AddIcon fontSize="inherit" /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </GridItem>
    )
}

export { SpellTable };