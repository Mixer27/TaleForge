import { PlayerCharacterSheet } from "../../types";
import { useEffect, useState } from "react";
import { CharacterElement } from "./CharacterElement";

const CharacterList: React.FC = () => {
    const [characterList, setCharacterList] = useState<Array<PlayerCharacterSheet>>([]);
    useEffect(() => {
        fetch(`https://uwu.sex.pl:9000/pcsheets`)
            .then((res: Response) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setCharacterList(data);
            })
            .catch((error) => {
                console.error("Error fetching data!", error);
            })

    }, []);
    return (
        <>
            <ul>
                {characterList.map(item => (
                    <CharacterElement id={item._id} name={item.name} key={item._id} />
                ))}
            </ul>
        </>
    )
}

export { CharacterList }