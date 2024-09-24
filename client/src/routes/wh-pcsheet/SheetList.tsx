import { useEffect, useState } from "react";
import { PlayerCharacterSheet } from "../../types";
import { Box, List, ListItem, ListItemButton } from "@mui/material";
import { GridItem } from "../../components/whCharacterSheet/GridItem";
import { SheetListElement } from "./SheetListElement";
import { useNavigate } from "react-router-dom";
import { MainNavigationBar } from "../../components/overlay/MainNavigationBar";
import { useAuth } from "../../context/AuthContext";


const SheetsList: React.FC = () => {
    const navigate = useNavigate();
    const [characterList, setCharacterList] = useState<Array<PlayerCharacterSheet>>([]);
    const { setUsername } = useAuth();

    const handleClick = (path: string) => {
        localStorage.setItem('currentTab', 'Stats');
        navigate(path);
    }

    const handleAddCharacterSheet = async () => {
        await fetch(`https://devproj3ct.pl:9000/pcsheets`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res: Response) => {
                if (res.status === 401 || res.status === 404) {
                    console.log(res.status);
                    setUsername(null);
                    navigate('/auth');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                fetchCharacterList();
                // setCharacterList(data);
            })
            .catch((error) => {
                console.error("Error with post request!", error);
            })
    }

    const HandleRemoveCharacterSheet = async (characterId: string) => {
        await fetch(`https://devproj3ct.pl:9000/pcsheets/${characterId}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res: Response) => {
                if (res.status === 401) {
                    console.log(res.status);
                    setUsername(null);
                    navigate('/auth');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                fetchCharacterList();
                // setCharacterList(data);
            })
            .catch((error) => {
                console.error("Error with post request!", error);
            })
    }

    const fetchCharacterList = async () => {
        try {
            await fetch(`https://devproj3ct.pl:9000/pcsheets`, {
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
                    console.log(data);
                    setCharacterList(data);
                })
                .catch((error) => {
                    console.error("Error fetching data!", error);
                })
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchCharacterList();
    }, []);


    return (
        <>
            <MainNavigationBar headerText="Postacie" />
            <Box mt={"2em"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexGrow={1}>
                <Box width={"50%"}>
                    <GridItem>
                        <List>
                            {characterList.map(item => (
                                <SheetListElement id={item._id} name={item.name} key={item._id} handleClick={handleClick} handleRemoveClick={HandleRemoveCharacterSheet} />
                            ))}
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleAddCharacterSheet} >Dodaj kartę postaci</ListItemButton>
                            </ListItem>
                        </List >
                    </GridItem>
                </Box>
            </Box>
        </>
    )
}

export { SheetsList }