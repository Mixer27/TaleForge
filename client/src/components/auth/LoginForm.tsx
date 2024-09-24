import { Button, Stack, TextField } from "@mui/material";
import React from "react"
import * as yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
	handleSubmit: () => void,
}

const validationSchema = yup.object({
	username: yup
		.string()
		.required('Nazwa użytkownika nie może być pusta')
		.min(3, 'Nazwa użytkownika powinna mieć minimum 3 znaków'),
	password: yup
		.string()
		.required('Hasło nie może być puste')
		.min(3, 'o musi mieć minimum 8 znaków')
});


const LoginForm: React.FC<Props> = (props) => {
	const { setUsername } = useAuth();
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				if (localStorage.getItem('username')) {
					setUsername(localStorage.getItem('username'));
					navigate('/home')
				} else {
					const response = await fetch("https://devproj3ct.pl:9000/auth/login", {
						method: 'POST',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(values),
					});
					const data = await response.json();
                    console.log(data);
                    if (data.isLoggedIn) {
						localStorage.setItem('username', data.username);
						setUsername(data.username);
					}
					props.handleSubmit();
				}
			} catch (err) {
				console.error("Error in login post request", err);
				navigate('/home')
			}
		},
	});

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<Stack spacing={2} width={"80%"} marginLeft={"10%"}>
					<TextField
						name="username"
						label="Nazwa użytkownika"
						value={formik.values.username}
						onChange={formik.handleChange}
						error={formik.touched.username && Boolean(formik.errors.username)}
						helperText={formik.touched.username && formik.errors.username}
					/>
					<TextField
						name="password"
						type="password"
						label="Hasło"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<Button type="submit" variant="contained">Zaloguj</Button>
				</Stack>
			</form>
		</>

	)
}

export { LoginForm };