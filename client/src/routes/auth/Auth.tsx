import { useEffect, useState } from "react";
import { LoginForm } from "../../components/auth/LoginForm";
import { AppBar, Container, Paper, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RegisterForm } from "../../components/auth/RegisterForm";

const AuthForm = Object.freeze({
    LOGIN: 'Logowanie',
    REGISTER: 'Rejestracja',
})


const Auth: React.FC = () => {
    const { isLoggedIn, checkSession } = useAuth();
    // const [username, setUsername] = useState("");
    const [currentTab, setCurrentTab] = useState<string>(AuthForm.LOGIN);
    // const [value, setValue] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home");
        }
    }, [isLoggedIn])

    const handleSubmit = async () => {
        await checkSession();
        navigate("/home");
    }

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        console.log(newValue);
        setCurrentTab(newValue);
    };

    return (
        <>
            <Container sx={{ width: "500px" }}>
                <Paper>
                    <TabContext value={currentTab}>
                        <AppBar position="static">
                            <Tabs
                                value={currentTab}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                // variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab value={AuthForm.LOGIN} label={AuthForm.LOGIN} />
                                <Tab value={AuthForm.REGISTER} label={AuthForm.REGISTER} />
                                {/* <Tab label="Item Three" /> */}
                            </Tabs>
                        </AppBar>
                        <TabPanel value={AuthForm.LOGIN} sx={{padding: "24px 6px 24px 6px"}}>
                            <LoginForm handleSubmit={handleSubmit}></LoginForm>
                        </TabPanel>
                        <TabPanel value={AuthForm.REGISTER}>
                            <RegisterForm handleSubmit={handleSubmit}></RegisterForm>
                            {/* Logged user: {username ?? "none"};
                            <LoginForm handleSubmit={handleSubmit}></LoginForm> */}
                        </TabPanel>
                    </TabContext>
                </Paper>
            </Container>
        </>
    )
}

export { Auth };