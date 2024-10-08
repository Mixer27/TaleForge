import { Box, Card, CardContent, CardHeader, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { MainNavigationBar } from "../../components/overlay/MainNavigationBar";

const Home: React.FC = () => {
    const theme: Theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box p={4} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // minHeight: '90vh',
          }}>
            <MainNavigationBar headerText="TaleForge" />
            <Card sx={{width: isBelowMd ? "100%" : "50%"}}>
                <CardHeader title="Witaj w TaleForge">
                </CardHeader>
                <CardContent>
                    <Typography variant="body1">TaleForge to aplikacja stworzona z myślą o mistrzach gry (GM) i graczach gier fabularnych, która oferuje nardzędzia ułatwiające przygotowywanie oraz prowadzenie sesji gier fabularnych. Obecnie dostępną funkcją jest zarządzanie kartami psotaci dla systemu Warhammer Fantasy Roleplay. Aktualnie zaimplementowane narzędzia dostępne są z poziomu menu dostępnego w lewej górnej części ekranu. Aplikacja jest rozwijana i z czasem pojawią się nowe funkcjonalności.
                    </Typography>
                </CardContent>
            </Card>
        </Box >
    )
}
export default Home;