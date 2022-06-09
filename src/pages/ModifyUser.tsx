import * as React from "react";
import {useForm} from "react-hook-form";
import {Avatar, Button, FormGroup, FormLabel, Grid, TextField,} from "@mui/material";
// import "../media/css/Login.css";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {createUser,} from "../api/User/User";
import {AxiosError} from "axios";
import {useContext} from "react";
import {loggedInUserContext} from "../App";


const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is Required.")
        .min(1, "Username is Too Short."),
    first_name: Yup.string()
        .min(1, "First Name is Too Short."),
    surname: Yup.string()
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
    profile_picture: Yup.mixed()
        .nullable()
        .required("Required Field")
        .test("size", "File is too large", (value) => {
            console.log(value);
            return value[0] && value[0].size <= 5 * 1024 * 1024;   // 5MB
        })
        .test(
            "type",
            "Invalid file format",
            (value) => {
                return (
                    value[0] &&
                    (value[0].type === "image/jpeg" ||
                        value[0].type === "image/jpg" ||
                        value[0].type === "image/png")
                );
            }
        ),
});


export default function ModifyUser() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const {mutate,} = useMutation(createUser, {
        onSuccess: () => {
            alert("User Created Successfully!");
        },
        onError: (error: AxiosError) => {

            // alert(error.response.e.message);
        }
    });
    let loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const onSubmit = (data: any) => {
        console.log(data);
        mutate(data);
    };
    React.useEffect(() => {
        register("username", {required: true});
        register("password", {required: true});
        register("confirmPassword", {required: true});
        register("email", {required: true});
        register("image", {required: true});
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
    return (<Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{
                height: "100%",
                width: "30vw",

            }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormGroup>
                            <FormLabel>Username</FormLabel>
                            <TextField fullWidth
                                       {...register("username", {
                                           required: true,
                                       })}
                                       error={!!errors.username}
                                       autoComplete="username"
                                       helperText={errors.username && errors.username.message}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <FormLabel>First Name</FormLabel>
                            <TextField fullWidth
                                       {...register("username", {
                                           required: true,
                                       })}
                                       error={!!errors.username}
                                       autoComplete="username"
                                       helperText={errors.username && errors.username.message}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <FormLabel>Last Name</FormLabel>
                            <TextField fullWidth
                                       {...register("lastName", {
                                               required: true,
                                           }
                                       )}
                                       type={'lastName'}
                                       error={!!errors.surname}
                                       autoComplete={'lastName'}
                                       helperText={errors?.surname?.message}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
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
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
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

                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <FormLabel>Profile Picture</FormLabel>
                            <TextField fullWidth
                                       {...register("image", {
                                               required: true,

                                           }
                                       )}
                                       type={'file'}
                                       error={!!errors.image}
                                       autoComplete={'image'}
                                       helperText={errors?.image?.message}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
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
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                        >
                            <Avatar src={loggedInUser.profile_picture}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>

                        <Button id="button" variant="contained" color="primary"
                                onClick={handleSubmit(onSubmit)}>Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );


}