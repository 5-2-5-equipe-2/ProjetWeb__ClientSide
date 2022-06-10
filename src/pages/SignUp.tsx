import * as React from "react";
import {useForm} from "react-hook-form";
import {
    Button,
    FormGroup,
    FormLabel,
    Grid,
    TextField,
} from "@mui/material";
// import "../media/css/Login.css";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {createUser,} from "../api/User/User";
import {AxiosError} from "axios";
import {useSnackbar} from "notistack";


const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is Required.")
        .min(1, "Username is Too Short."),
    // firstName: Yup.string()
    //     .min(1, "First Name is Too Short."),
    // lastName: Yup.string()
    //     .min(1, "Last Name is Too Short."),

    email: Yup.string().email().required("Email is Required."),
    password: Yup.string()
        .required("No password provided.")
        .min(8, "Password should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
        .required("Confirm Password is Required.")
        .min(8, "Confirm Password is Too Short."),
});


export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const {enqueueSnackbar} = useSnackbar();
    const {mutate,} = useMutation(createUser, {
        onSuccess: () => {
            enqueueSnackbar("User Created Successfully!", {
                variant: "success",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
                autoHideDuration: 3000,

            });
        },
        onError: (error: AxiosError) => {

            if (error.response && error.response.data) {
                // @ts-ignore
                enqueueSnackbar(error.response.data.error, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                    autoHideDuration: 3000,
                });
            } else {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right",
                    },
                    autoHideDuration: 3000,
                });
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
        <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={4}>

            <h1>Sign Up</h1>
            <form encType="multipart/form-data">

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
                    <section>
                        <FormLabel>Confirm Password</FormLabel>
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
                        <FormLabel>Email</FormLabel>
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
                    <Button id="button" variant="contained" color="primary"
                            onClick={handleSubmit(onSubmit)}>Submit</Button>
                </FormGroup>
            </form>

        </Grid>

    );
}
