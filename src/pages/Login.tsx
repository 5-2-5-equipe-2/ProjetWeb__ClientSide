import * as React from "react";
import {useForm} from "react-hook-form";
import {
    Button, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@mui/material";
import "../media/css/Login.css";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {getUserByUsername, login} from "../api/User/User";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {loggedInUserContext} from "../App";
import {useContext} from "react";

    

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
    const setLoggedInUser = useContext(loggedInUserContext).setLoggedInUser;

    // Get redirect data from query params
    let params = new URLSearchParams(window.location.search)
    let navigate = useNavigate();
    const {mutate: getUser,} = useMutation(getUserByUsername, {
        onSuccess: (data) => {
            console.log(data.data);
            setLoggedInUser(data.data);
        }
    });
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState("");
    const [dialogTitle, setDialogTitle] = React.useState("");
    const {mutate: loginUser,} = useMutation(login, {
        onSuccess: (data, variables, ) => {
            // console.log(variables);

            setDialogTitle("Success");
            setDialogMessage("User Logged in Successfully");
            handleDialogClickOpen();
            // setUser(userData);
            getUser(variables.username);
            // redirect to from page or home page with react router
            navigate(params.get('from') || '/');
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
        loginUser(data);

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

        <Grid item sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid purple",
            padding: "2 %"
        }} >
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
            <h1>Login</h1>
            <form>
                <FormGroup>
                    <Grid container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacing={4}>
                        <Grid item>
                            <FormLabel>Username</FormLabel>
                            <TextField fullWidth
                                       {...register("username", {
                                           required: true,
                                       })}
                                       error={!!errors.username}
                                       autoComplete="username"
                                       helperText={errors.username && errors.username.message}
                            />
                        </Grid>
                        <Grid item>
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

                        </Grid>
                    </Grid>
                    <Button id="button" variant="contained" color="primary"
                            onClick={handleSubmit(onSubmit)}>Submit</Button>
                </FormGroup>
            </form>
        </Grid>


    );
}
