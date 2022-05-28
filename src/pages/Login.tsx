import * as React from "react";
import {useForm} from "react-hook-form";
import {Button, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import "../media/css/Login.css";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {getUserByUsername, login} from "../api/User/User";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import UserInterface from "../api/User/UserInterface";


const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),

    password: Yup.string()
        .required('Password is required'),

});


export default function LoginForm({setLoggedInUser}: { setLoggedInUser: (user: UserInterface) => void }) {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    // Get redirect data from query params
    let params = new URLSearchParams(window.location.search)
    let navigate = useNavigate();
    const {mutate: getUser,} = useMutation(getUserByUsername, {
        onSuccess: (data) => {
            console.log(data);
        }
    });
    const {mutate: loginUser,} = useMutation(login, {
        onSuccess: (data, variables, context) => {
            // console.log(variables);
            alert("Login Successful");
            // setUser(userData);
            getUser(variables.username);
            // redirect to from page or home page with react router
            navigate(params.get('from') || '/');
        },
        onError: (error: AxiosError) => {
            if (error.response) {
                const {data} = error.response;
                // @ts-ignore
                const {error: error1} = data;
                alert(error1);
            }

        }
    });

    const onSubmit = (data: any) => {
        loginUser(data);

    }

    React.useEffect(() => {
        register("username", {required: true});
        register("password", {required: true});
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                // click the form submit button
                document.getElementById("button")?.click();

            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };

    }, [register]);

    return (

        <Grid item xs={2}>
            <h1>Login</h1>
            <FormGroup className="form">
                <section>
                    <FormLabel>Username</FormLabel>

                    <TextField fullWidth
                               {...register("username", {
                                   required: true,
                               })}
                               error={!!errors.username}
                               autoComplete="username"
                               helperText={errors.username && errors.username.message}
                    />


                </section>

                <section>
                    <FormLabel>Password</FormLabel>
                    <TextField fullWidth
                               {...register("password", {
                                   required: true,
                               })}
                               type="password"
                               autoComplete="password"
                               error={!!errors.password}
                               helperText={errors?.password?.message}
                    />

                </section>

                <Button id="button" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
            </FormGroup>
        </Grid>


    );
}
