import { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm";


const Login: React.FC = () => {
    const [username, setUsername] = useState("")
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleSubmit = () => {
        setRefreshTrigger(prev => prev + 1);
    }

    useEffect(() => {
        try {

            fetch('https://devproj3ct.pl:9000/auth/session', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setUsername(data.username);
                    console.log(data)
                });
        } catch (err) {
            console.log("error with checking session", err);
        }
    }, [refreshTrigger])

    return (
        <>
            LOGIN
            Logged user: {username ?? "none"};
            <LoginForm handleSubmit={handleSubmit}></LoginForm>
        </>
    )
}

export { Login };