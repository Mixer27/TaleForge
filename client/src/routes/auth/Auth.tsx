import { useEffect, useState } from "react";
import { LoginForm } from "../../components/auth/LoginForm";
import { AppBar, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RegisterForm } from "../../components/auth/RegisterForm";

const AuthForm = Object.freeze({
    LOGIN: 'Logowanie',
    REGISTER: 'Rejestracja',
})


const Auth: React.FC = () => {
    const { username } = useAuth();
    const [currentTab, setCurrentTab] = useState<string>(AuthForm.LOGIN);
    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            navigate("/home");
        }
    }, [username])

    const handleSubmit = async () => {
        // await checkSession();
        navigate("/home");
    }

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    return (
        <>
            <Container sx={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', marginBottom: 5 }}>
                <Typography variant='h1'>TaleForge</Typography>
            </Container>
            <Container sx={{ width: "500px" }}>
                <Paper>
                    <TabContext value={currentTab}>
                        <AppBar position="static">
                            <Tabs
                                value={currentTab}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="inherit"
                                centered
                                aria-label="full width tabs example"
                            >
                                <Tab value={AuthForm.LOGIN} label={AuthForm.LOGIN} />
                                <Tab value={AuthForm.REGISTER} label={AuthForm.REGISTER} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={AuthForm.LOGIN} sx={{ padding: "24px 6px 24px 6px" }}>
                            <LoginForm handleSubmit={handleSubmit}></LoginForm>
                        </TabPanel>
                        <TabPanel value={AuthForm.REGISTER}>
                            <RegisterForm handleSubmit={handleSubmit}></RegisterForm>
                        </TabPanel>
                    </TabContext>
                </Paper>
            </Container>
        </>
    )
}

export { Auth };