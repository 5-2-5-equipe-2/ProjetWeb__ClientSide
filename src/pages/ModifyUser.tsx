import * as React from "react";
import {useForm} from "react-hook-form";
import {Avatar, Box, Button, Fade, FormGroup, FormLabel, Grid, TextField, Typography,} from "@mui/material";
// import "../media/css/Login.css";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {createUser, updateUser,} from "../api/User/User";
import {AxiosError} from "axios";
import {useContext, useEffect, useState} from "react";
import {loggedInUserContext} from "../App";
import {useSnackbar} from "notistack";
import UserInterface from "../api/User/UserInterface";
import {convertToBase64} from "../components/utils";
import {UserUpdateInterface} from "../api/User/UserInterface";
import {uploadImage} from "../storage_server/File";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is Required.")
        .min(1, "Username is Too Short."),
    first_name: Yup.string().nullable(true),
    surname: Yup.string().nullable(true),
    email: Yup.string().email().nullable(true),
    profilePicture: Yup.mixed().nullable(true)
    // .test("size", "File is too large", (value) => {
    //     if (!value) return true;
    //     return value[0] && value[0].size <= 5 * 1024 * 1024;   // 5MB
    // })
    // .test(
    //     "type",
    //     "Invalid file format",
    //     (value) => {
    //         if (!value) return true;
    //         return (
    //             value[0] &&
    //             (value[0].type === "image/jpeg" ||
    //                 value[0].type === "image/jpg" ||
    //                 value[0].type === "image/png")
    //         );
    //     }
    // ),
});


export default function ModifyUser() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const {enqueueSnackbar} = useSnackbar();
    const {mutateAsync: updateUserMutation,} = useMutation(updateUser, {

            onSuccess: (data, variables, context) => {
                enqueueSnackbar('User modified', {
                    variant: 'success', autoHideDuration: 1300,
                    TransitionComponent: Fade,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    }
                });
                // console.log(data, variables, context);

            }
            ,
            onError: (error: AxiosError) => {

                // @ts-ignore
                if (error?.response?.data?.error) {
                    // @ts-ignore
                    enqueueSnackbar(error.response.data.error.replace('Arguments missing or invalid', ''), {
                        variant: 'error', autoHideDuration: 1700,
                        TransitionComponent: Fade,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        }
                    });
                }
            }
        }
    )


    const {
        mutateAsync: uploadImageMutation,
        isLoading: isUploadImageLoading,
        isError: isUploadImageError,
        error: uploadImageError,
        data: uploadImageData,
    } = useMutation(uploadImage, {
            onSuccess: (data, variables, context) => {
                console.log(data, variables, context);
                // // @ts-ignore
                // setUser({...user, profilePicture: data.uploadImage.url});
            }
            ,
            onError: (error: AxiosError) => {
                console.log(error);
                // @ts-ignore
                // enqueueSnackbar(error.response.data.error.replace('Arguments missing or invalid', ''), {
                //     variant: 'error', autoHideDuration: 1700,
                //     TransitionComponent: Fade,
                //     anchorOrigin: {
                //         vertical: 'top',
                //         horizontal: 'center',
                //
                //     }
                // });

            }
        }
    );
    const onSubmit = async (data: any) => {
        let newUser: UserUpdateInterface = {
            id: loggedInUser.id,
            username: data.username || loggedInUser.username,
            firstname: data.firstName ? data.firstName : null,
            surname: data.surname ? data.surname : null,
            email: data.email ? data.email : null,
            profile_picture: '' || loggedInUser.profile_picture,
        };
        if (selectedImage) {
            await uploadImageMutation(selectedImage);
            newUser.profile_picture = uploadImageData?.data?.url;
        }
        await updateUserMutation(newUser);
    };
    React.useEffect(() => {
        register("username", {required: true});
        register("email",);
        register("profilePicture",);
        register("firstName",);
        register("lastName",);
        register("phoneNumber",);
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

    const [selectedImage, setSelectedImage] = useState(null as File | null);
    const [imageUrl, setImageUrl] = useState(null as string | null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);
    return (<Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
        >
            <h1>Modify User</h1>
            <Grid item>
                <form onSubmit={handleSubmit(onSubmit)} style={{
                    height: "100%",
                    width: "30vw",

                }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField fullWidth
                                       {...register("username", {
                                           required: true,
                                       })}
                                       error={!!errors.username}
                                       autoComplete="username"
                                       helperText={errors.username && errors.username.message}
                                       label="Username"
                                       defaultValue={loggedInUser.username}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth
                                       {...register("firstName", {})}
                                       error={!!errors.first_name}
                                       autoComplete="firstName"
                                       helperText={errors.first_name && errors.first_name.message}
                                       label="First Name"
                                       defaultValue={loggedInUser.first_name}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth
                                       {...register("surname", {}
                                       )}
                                       type={'lastName'}
                                       error={!!errors.surname}
                                       autoComplete={'lastName'}
                                       helperText={errors?.surname?.message}
                                       label="Last Name"
                                       defaultValue={loggedInUser.surname}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth
                                       {...register("email", {}
                                       )}
                                       type={'email'}
                                       error={!!errors.email}
                                       autoComplete={'email'}
                                       helperText={errors?.email?.message}
                                       label="Email"
                                       defaultValue={loggedInUser.email}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container
                                  direction="row"
                                  justifyContent={'center'}
                                  alignItems={'center'}
                                  spacing={2}
                            >
                                <Grid item>
                                    <input
                                        {...register("profilePicture", {}
                                        )}
                                        accept="image/*"
                                        type="file"
                                        id="select-image"
                                        style={{display: 'none'}}
                                        onChange={async e => {
                                            if (e.target.files) {
                                                setSelectedImage(e?.target?.files[0]);
                                                await register("image").onChange(e);
                                            }
                                        }}
                                        defaultValue={loggedInUser.profile_picture}

                                    />
                                    <label htmlFor="select-image">
                                        <Button variant="contained" color="secondary" component="span"
                                        >
                                            Upload Image
                                        </Button>

                                    </label>

                                </Grid>
                                <Grid item>
                                    {imageUrl && selectedImage && (
                                        <Box mt={2} textAlign="center">
                                            <div>Image Preview:</div>
                                            <img src={imageUrl} alt={selectedImage.name} height="100px"/>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
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