import * as React from "react";
import {useForm} from "react-hook-form";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormGroup,
    FormLabel,
    Grid,
    TextField,
} from "@mui/material";
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
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState("");
    const [dialogTitle, setDialogTitle] = React.useState("");
    const {mutate,} = useMutation(createUser, {
        onSuccess: () => {
            setDialogTitle("Success");
            setDialogMessage("User Created Successfully");
            handleDialogClickOpen();
            console.log("User Created Successfully");
        },
        onError: (error: AxiosError) => {

            if (error.response && error.response.data) {
                setDialogTitle("Error");
                handleDialogClickOpen();
                // @ts-ignore
                setDialogMessage(error.response.data.error);
            } else {
                alert("An error occurred");
            }

        }
    });

    const onSubmit = (data: any) => {
        mutate(data);

    }


    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

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
        <Grid item xs={2}>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
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
