import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField, Autocomplete, CircularProgress, MenuItem, FormControlLabel, Switch, Box
} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {loggedInUserContext} from "../../../App";
import * as Yup from 'yup';
import {selectedChatRoomContext} from "../../../pages/Chat";
import {useMutation} from "react-query";
import {searchUsers} from "../../../api/User/User";
import UserInterface from "../../../api/User/UserInterface";
import {getChatRoomUsers, updateChatRoom, updateChatRoomUsers} from "../../../api/ChatRoom/ChatRoom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {mixed} from "yup";

import {useSnackbar} from "notistack";
import {ChatRoomUpdateInterface, ChatRoomUserUpdateInterface} from "../../../api/ChatRoom/ChatRoomInterface";
import { AxiosError} from "axios";
// import {convertToBase64} from "../../utils";
import {uploadImage} from "../../../storage_server/File";
// Yup form to edit the chatroom
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .max(50, 'Name must be less than 50 characters')
        .min(3, 'Name must be at least 3 characters'),

    description: Yup.string()
        .max(200, 'Description must be less than 200 characters'),

    isPrivate: Yup.boolean(),
    image: mixed().nullable(),
});
const ChatEdit = () => {
    const loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const chatroom = useContext(selectedChatRoomContext).selectedChatRoom;
    const [open, setOpen] = React.useState(false);
    React.useRef<HTMLInputElement>(null);
    const [value, setValue] = useState([] as UserInterface[]);
    const [inputValue, setInputValue] = useState('');
    const [isPrivateSwitch, setIsPrivateSwitch] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null as File | null);
    const [imageUrl, setImageUrl] = useState(null as string | null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const {enqueueSnackbar} = useSnackbar();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const {
        data: searchUsersData,
        isLoading: isSearchUsersLoading,
        mutate: searchUsersMutation
    } = useMutation(searchUsers, {})

    const {
        mutate: updateChatRoomMutation,
    } = useMutation(updateChatRoom, {
        onSuccess: () => {
            enqueueSnackbar("Chatroom updated", {variant: "success"});
            setOpen(false);
        },
        onError: (error: AxiosError) => {
            // @ts-ignore
            if (error.response?.data.error) {
                // @ts-ignore
                enqueueSnackbar(error.response.data.error, {variant: "error"});
            } else {
                enqueueSnackbar(error.message, {variant: 'error'});
            }
        }
    })
    console.log(errors)
    const {mutate: updateChatRoomUsersMutation} = useMutation(updateChatRoomUsers, {
        onSuccess: () => {
            enqueueSnackbar("Chat Room users Updated Successfully!", {variant: "success"});

        },
        onError: () => {
            enqueueSnackbar("Error updating users Chat Room", {variant: "error"});
        }
    })


    const {mutateAsync: mutateChatRoomUsers,} = useMutation(
        getChatRoomUsers,
    )


    const handleClickOpen = async () => {
        if (chatroom) {
            setValue((await mutateChatRoomUsers(chatroom.id)).data);
        }
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    }


    const generateLabel = (user: UserInterface) => {
        if (user.email) {
            return user.username + " (" + user?.email + ")";
        } else {
            return user.username;
        }
    }

    function getSearchUsersData() {
        return searchUsersData?.data || [];
    }

    const {
        mutateAsync: uploadImageMutation,
    } = useMutation(uploadImage);

    async function onSubmit(data: any) {
        console.log("saving chat room")
        if (chatroom) {
            let newChatRoom: ChatRoomUpdateInterface = {
                isPrivate: isPrivateSwitch || chatroom.is_private || 0,
                ownerId: chatroom.owner_id,
                chatRoomId: chatroom.id,
                name: data.name,
                description: data.description,
                profile_picture: chatroom.profile_picture,
            }
            if (selectedImage) {
                let data = await uploadImageMutation(selectedImage);
                newChatRoom.profile_picture = "https://" + data.data.url;
            }

            let userIds = value.map(user => user.id);
            console.log(userIds)
            let newChatRoomUsers: ChatRoomUserUpdateInterface = {
                chatRoomId: chatroom.id,
                usersId: userIds
            }
            await updateChatRoomUsersMutation({data: newChatRoomUsers});
            await updateChatRoomMutation(newChatRoom);

        }
    }


    const isOwner = chatroom?.owner_id === loggedInUser?.id;

    useEffect(() => {
        return () => {
            if (chatroom) {
                setIsPrivateSwitch(chatroom.is_private);
            }
        };
    }, [chatroom]);


    useEffect(() => {
        return () => {
            register('name')
            register('description')
            register('image')
            register('isPrivate')
        };
    }, [register]);


    return (

        <>
            {isOwner &&

                <>
                    <Dialog open={open} onClose={handleClose}
                            maxWidth={'md'}
                            fullWidth={true}
                    >
                        <DialogTitle>Edit Chatroom</DialogTitle>
                        <DialogContent>
                            <Grid container
                                  direction="row"
                                  alignItems={'flex-start'}
                                  justifyContent={'center'}
                                  spacing={2}
                                  sx={{
                                      padding: '1rem',
                                  }}

                            >


                                <Grid item xs={6}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        error={errors.name !== undefined}
                                        helperText={errors.name?.message}
                                        {...register("name", {
                                            required: true,
                                        })}
                                        defaultValue={chatroom?.name}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                {...register("isPrivate", {
                                                    required: true,
                                                })}
                                                checked={!!isPrivateSwitch}
                                                onChange={async (event) => {
                                                    setIsPrivateSwitch(Number(!isPrivateSwitch));
                                                    await register("isPrivate",).onChange(event);
                                                }}
                                                name="is_private"
                                                color="primary"
                                            />

                                        }
                                        label="Private"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        error={errors.description !== undefined}
                                        helperText={errors.description?.message}
                                        {...register("description")}
                                        defaultValue={chatroom?.description}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container
                                          justifyContent={'center'}
                                          alignItems={'center'}>
                                        <Grid item>
                                            <input
                                                {...register("image",)}
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
                                                defaultValue={chatroom?.profile_picture}

                                            />
                                            <label htmlFor="select-image">
                                                <Button variant="contained" color="secondary" component="span"
                                                >
                                                    Upload Image
                                                </Button>

                                            </label>
                                            {imageUrl && selectedImage && (
                                                <Box mt={2} textAlign="center">
                                                    <div>Image Preview:</div>
                                                    <img src={imageUrl} alt={selectedImage.name} height="100px"/>
                                                </Box>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}
                                      width={'100%'}>
                                    <Autocomplete
                                        id="chatRoomUsers"
                                        sx={
                                            {
                                                width: '100%',
                                            }
                                        }


                                        isOptionEqualToValue={(option: UserInterface, value: UserInterface) => {
                                            return option.username === value.username || option.id === value.id;
                                        }}
                                        fullWidth
                                        getOptionLabel={generateLabel}
                                        options={getSearchUsersData()}
                                        loading={isSearchUsersLoading}
                                        filterSelectedOptions
                                        multiple
                                        value={value}
                                        onChange={(_, newValue) => {
                                            setValue(newValue)
                                        }}
                                        inputValue={inputValue}
                                        onInputChange={(_, newInputValue) => {
                                            searchUsersMutation(newInputValue);
                                            setInputValue(newInputValue)
                                        }}

                                        renderInput={(params) => (
                                            <TextField
                                                // sx={
                                                //     {
                                                //         width: '100%',
                                                //     }
                                                // }
                                                {...params}
                                                label="Add users"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <React.Fragment>
                                                            {isSearchUsersLoading ?
                                                                <CircularProgress color="inherit"
                                                                                  size={20}/> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>


                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmit(onSubmit)}>Save</Button>
                        </DialogActions>
                    </Dialog>
                    <MenuItem onClick={handleClickOpen}>
                        Edit Chatroom
                    </MenuItem>
                </>}
        </>)
}


export default ChatEdit;