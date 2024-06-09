import { Box, Typography } from "@mui/material";
import { CharacterList } from "../../components/characterSheets/CharacterList";
import { MainNavigationBar } from "../../components/overlay/MainNavigationBar";

const Home: React.FC = () => {
    return (
        <Box p={4}>  
            <MainNavigationBar headerText="TaleForge"/>
            <Typography variant="h4">Home</Typography>
            <CharacterList />
        </Box>
    )
}
export default Home;