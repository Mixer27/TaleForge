import { GridItem } from "./GridItem"

interface Props {
    statName: string,
    stat: number,
}

const SingleStatDisplay: React.FC<Props> = (props) => {

    return (
        <>
            <GridItem>
                {props.statName} {props.stat}
            </GridItem>
        </>
    )
}

export {SingleStatDisplay}