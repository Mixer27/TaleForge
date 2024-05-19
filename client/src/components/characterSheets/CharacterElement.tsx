

interface Props {
    id: string,
    name: string,
}

const CharacterElement: React.FC<Props> = (props) => {

    return (
        <>
            <li><a href={"/pcsheets/" + props.id}>{props.name}</a></li>
        </>
    )
}

export { CharacterElement }