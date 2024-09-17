import { Button, Stack, TextField } from "@mui/material";
import React from "react"

interface Props {
    handleSubmit: () => void,
}


const RegisterForm: React.FC<Props> = (props) => {

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);
        if (payload.password === payload.confirmPassword) {
            
        }
        console.log(JSON.stringify(payload));
        try {
            await fetch("https://devproj3ct.pl:9000/auth/register", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.handleSubmit()
                    // navigate("/home");
                })

        } catch (err) {
            console.error("Error in login post request", err);
        }
        console.log(payload, document.cookie);

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <Stack spacing={2} width={"80%"} marginLeft={"10%"}>
                    <TextField name="username" label="Nazwa użytkownika"></TextField>
                    <TextField name="password" type="password" label="Hasło"></TextField>
                    <TextField name="confirmPassword" type="password" label="Potwierdź hasło"></TextField>
                    <Button type="submit">Zarejestruj</Button>
                </Stack>
            </form>
        </>

    )
}

export { RegisterForm };