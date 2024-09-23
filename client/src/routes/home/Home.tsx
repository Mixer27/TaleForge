import { Box, Typography } from "@mui/material";
import { CharacterList } from "../../components/characterSheets/CharacterList";
import { MainNavigationBar } from "../../components/overlay/MainNavigationBar";

const Home: React.FC = () => {
    return (
        <Box p={4}>  
            <MainNavigationBar headerText="TaleForge"/>
            <Typography variant="h4">Witaj w TaleForge</Typography>
            <Typography variant="body1">TaleForge to aplikacja stworzona z myślą o mistrzach gry (GM) i graczach gier fabularnych, która oferuje nardzędzia ułatwiające przygotowywanie oraz prowadzenie sesji gier fabularnych. Obecnie dostępną funkcją jest zarządzanie kartami psotaci dla systemu Warhammer Fantasy Roleplay. Aktualnie zaimplementowane narzędzia dostępne są z poziomu menu dostępnego w lewej górnej części ekranu.
            Aplikacja jest rozwijana i z czasem pojawią się nowe funkcjonalności.</Typography>
            <CharacterList />
        </Box>
    )
}
export default Home;