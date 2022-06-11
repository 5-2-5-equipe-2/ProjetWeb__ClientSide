import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useContext, useEffect, useState} from "react";
import {loggedInUserContext} from "../App";
import {useSnackbar} from "notistack";
import {useMutation} from "react-query";
import {changePassword, updateUser} from "../api/User/User";
import {Box, Button, Fade, Grid, TextField} from "@mui/material";
import {AxiosError} from "axios";
import {uploadImage} from "../storage_server/File";
import {UserPasswordUpdateInterface, UserUpdateInterface} from "../api/User/UserInterface";
import * as React from "react";

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    password: Yup.string().required('Password is required').min(8, 'Password is too short').max(50, 'Password is too long'),
    confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
});


export default function ModifyUserPassword() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const {enqueueSnackbar} = useSnackbar();

    React.useEffect(() => {
        register("oldPassword", {required: true});
        register("password", {required: true});
        register("confirmPassword", {required: true});
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


    const {mutate: updatePasswordMutation} = useMutation(changePassword, {
        onSuccess: (data) => {
            enqueueSnackbar("Password changed successfully", {variant: "success"});
        },
        onError: (error: AxiosError) => {
            enqueueSnackbar(error.message, {variant: "error"});
        }
    });

    function onSubmit(data: any) {

        const query: UserPasswordUpdateInterface = {
            userId: loggedInUser.id,
            oldPassword: data.oldPassword,
            password: data.password,
        }
        updatePasswordMutation({newPassword: query});

    }

    return (<Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
        >
            <h1>Change Password</h1>
            <Grid item>
                <form onSubmit={handleSubmit(onSubmit)} style={{
                    height: "100%",
                    width: "30vw",

                }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField fullWidth
                                       {...register("oldPassword", {
                                           required: true,
                                       })}
                                       error={!!errors.oldPassword}
                                       autoComplete="oldPassword"
                                       helperText={errors.oldPassword && errors.username.message}
                                       label="Old Password"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth
                                       {...register("password", {})}
                                       error={!!errors.password}
                                       autoComplete="password"
                                       helperText={errors.password && errors.password.message}
                                       label="Password"

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth
                                       {...register("confirmPassword", {}
                                       )}
                                       type={'confirmPassword'}
                                       error={!!errors.confirmPassword}
                                       autoComplete={'confirmPassword'}
                                       helperText={errors?.confirmPassword?.message}
                                       label="confirm Password"
                            />
                        </Grid>

                        <Grid item xs={12}>

                            <Button id="button" variant="contained" color="primary"
                                    onClick={handleSubmit(onSubmit)}>Submit</Button>
                        </Grid>
                    </Grid></form>
            </Grid>
        </Grid>
    );


}