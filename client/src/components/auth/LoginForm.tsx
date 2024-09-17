import { Button, Stack, TextField } from "@mui/material";
import React from "react"

interface Props {
    handleSubmit: () => void,
}


const LoginForm: React.FC<Props> = (props) => {

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);
        console.log(JSON.stringify(payload));
        try {
            await fetch("https://devproj3ct.pl:9000/auth/login", {
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
                    <Button type="submit">Zaloguj</Button>
                </Stack>
            </form>
        </>

    )
}

export { LoginForm };