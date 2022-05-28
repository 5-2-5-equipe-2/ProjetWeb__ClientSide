import * as React from "react";
import {useForm} from "react-hook-form";
import {Button, Grid, TextField,} from "@mui/material";
import "../media/css/Login.css";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {createUser,} from "../api/User/User";
import {AxiosError} from "axios";


const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is Required.")
        .min(1, "Username is Too Short."),
    firstName: Yup.string()
        .min(1, "First Name is Too Short."),
    lastName: Yup.string()
        .min(1, "Last Name is Too Short."),

    email: Yup.string().email().required("Email is Required."),
    password: Yup.string()
        .required("No password provided.")
        .min(8, "Password should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
        .required("Confirm Password is Required.")
        .min(8, "Confirm Password is Too Short."),
    phoneNumber: Yup.string()
        .min(10, "Phone Number is Too Short."),
    address: Yup.string()
        .min(1, "Address is Too Short."),


});


export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const {mutate,} = useMutation(createUser, {
        onSuccess: () => {
            // data = data.data;
            alert("SignUp Successful");
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
        mutate(data);

    }

    React.useEffect(() => {
        register("username", {required: true});
        register("password", {required: true});
        register("confirmPassword", {required: true});
        register("email", {required: true});
        register("firstName", {required: true});
        register("lastName", {required: true});
        register("phoneNumber", {required: true});
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
            <h1>Sign Up</h1>
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
                <section>
                    <label>Confirm Password</label>
                    <TextField fullWidth
                               {...register("confirmPassword", {
                                       required: true,
                                   }
                               )}
                               type="password"
                               autoComplete="confirmPassword"
                               error={!!errors.confirmPassword}
                               helperText={errors?.confirmPassword?.message}
                    />
                </section>
                <section>
                    <label>Email</label>
                    <TextField fullWidth
                               {...register("email", {
                                       required: true,
                                   }
                               )}
                               type={'email'}
                               error={!!errors.email}
                               autoComplete={'email'}
                               helperText={errors?.email?.message}
                    />
                </section>
                <Button id="button" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
            </form>
        </Grid>


    );
}
