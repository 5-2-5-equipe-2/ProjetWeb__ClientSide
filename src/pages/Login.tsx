import * as React from "react";
import {useForm} from "react-hook-form";
import {Button, Grid, TextField} from "@mui/material";
import "../media/css/Login.css";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {login} from "../api/User/User";
import {AxiosError} from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {getChatRoomById} from "../api/ChatRoom/ChatRoom";


const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),

    password: Yup.string()
        .required('Password is required'),

});


export default function LoginForm() {
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
    const {mutate: loginUser,} = useMutation(login, {
        onSuccess: () => {
            // data = data.data;
            alert("Login Successful");
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
            <form className="form">
                <section>
                    <label>Username</label>

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
                    <label>Password</label>
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
            </form>
        </Grid>


    );
}
