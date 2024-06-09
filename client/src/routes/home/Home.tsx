import { Typography } from "@mui/material";
import { CharacterList } from "../../components/characterSheets/CharacterList";

const Home: React.FC = () => {
    return (
        <>
            <Typography variant="h4">Home</Typography>
            <CharacterList />
        </>
    )
}
export default Home;