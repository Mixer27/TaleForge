import { useEffect, useState } from "react";
import { PlayerCharacterSheet } from "../../types";
import { Box, List } from "@mui/material";
import { GridItem } from "../../components/whCharacterSheet/GridItem";
import { SheetListElement } from "./SheetListElement";
import { useNavigate } from "react-router-dom";
import { MainNavigationBar } from "../../components/overlay/MainNavigationBar";


const SheetsList: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = (path: string) => {
        localStorage.setItem('currentTab', 'Stats');
        navigate(path);
    }

    const [characterList, setCharacterList] = useState<Array<PlayerCharacterSheet>>([]);
    useEffect(() => {
        fetch(`https://devproj3ct.pl:9000/pcsheets`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res: Response) => {
                return res.json();
            })
            .then((data) => {
                // console.log(data);
                setCharacterList(data);
            })
            .catch((error) => {
                console.error("Error fetching data!", error);
            })

    }, []);

    return (
        <>
            <MainNavigationBar headerText="Postacie" />
            <Box mt={"2em"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexGrow={1}>
                <Box width={"50%"}>
                    <GridItem>
                        <List>
                            {characterList.map(item => (
                                <SheetListElement id={item._id} name={item.name} key={item._id} handleClick={handleClick} />
                            ))}
                        </List >
                    </GridItem>
                </Box>
            </Box>
        </>
    )
}

export { SheetsList }