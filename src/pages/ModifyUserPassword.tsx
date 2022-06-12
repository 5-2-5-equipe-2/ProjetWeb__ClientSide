import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
// import {useContext} from "react";
// import {loggedInUserContext} from "../App";
import {useSnackbar} from "notistack";
import {useMutation} from "react-query";
import {changePassword} from "../api/User/User";
import {Button, Grid, TextField} from "@mui/material";
import {AxiosError} from "axios";
import {UserPasswordUpdateInterface} from "../api/User/UserInterface";
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
        onSuccess: () => {
            enqueueSnackbar("Password changed successfully", {
                variant: "success",
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }

            });
        },
        onError: (error: AxiosError) => {
            // @ts-ignore
            if (error.response?.data.error) {
                // @ts-ignore
                enqueueSnackbar(error.response.data.error, {
                    variant: "error",
                    autoHideDuration: 3000,

                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    }

                });
            } else {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    }

                });
            }
        }
    });

    function onSubmit(data: any) {

        const query: UserPasswordUpdateInterface = {
            old_password: data.oldPassword,
            new_password: data.password,
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
                        <Grid item xs={12}>
                            <TextField fullWidth
                                       {...register("oldPassword", {
                                           required: true,
                                       })}
                                       type={'password'}
                                       error={!!errors.oldPassword}
                                       autoComplete="oldPassword"
                                       helperText={errors.oldPassword && errors.oldPassword.message}
                                       label="Old Password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                       {...register("password", {required: true})}
                                       error={!!errors.password}
                                       type={'password'}
                                       autoComplete="password"
                                       helperText={errors.password && errors.password.message}
                                       label="Password"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                       {...register("confirmPassword", {required: true}
                                       )}
                                       type={'password'}
                                       error={!!errors.confirmPassword}
                                       autoComplete={'confirmPassword'}
                                       helperText={errors?.confirmPassword?.message}
                                       label="Confirm Password"
                            />
                        </Grid>

                        <Grid item xs={12}>

                            <Button id="button" variant="contained" color="primary"
                                    onClick={handleSubmit(onSubmit)}>Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );


}