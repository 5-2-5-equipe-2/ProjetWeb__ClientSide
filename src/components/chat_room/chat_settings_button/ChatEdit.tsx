import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField, Autocomplete, CircularProgress
} from "@mui/material";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {useContext, useState} from "react";
import {loggedInUserContext} from "../../../App";
import * as Yup from 'yup';
import {selectedChatRoomContext} from "../../../pages/Chat";
import {useMutation} from "react-query";
import {searchUsers} from "../../../api/User/User";
import UserInterface from "../../../api/User/UserInterface";
import {getChatRoomUsers, updateChatRoom} from "../../../api/ChatRoom/ChatRoom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {mixed} from "yup";


// Yup form to edit the chatroom
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .max(50, 'Name must be less than 50 characters')
        .min(3, 'Name must be at least 3 characters'),

    description: Yup.string()
        .max(200, 'Description must be less than 200 characters'),

    image: mixed().test("fileSize", "The file is too large", (value: any) => {
        if (!value.length) return true // attachment is optional
        return value[0].size <= 2000000
    })
});


function processQueryString(queryString
                                :
                                string | undefined
) {
    if (queryString === null || queryString === undefined) {
        return "";
    } else {
        return queryString;
    }
}

const ChatEdit = () => {
    const loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const chatroom = useContext(selectedChatRoomContext).selectedChatRoom;
    const [open, setOpen] = React.useState(false);
    const userSearchInputRef = React.useRef<HTMLInputElement>(null);
    const [value, setValue] = useState([] as UserInterface[]);
    const [inputValue, setInputValue] = useState('');
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
        isLoading: isUpdateChatRoomLoading,
        isError: isUpdateChatRoomError,
        error: updateChatRoomError
    } = useMutation(updateChatRoom, {
        onSuccess: () => {
            setOpen(false);
        }
    })


    const {data: chatRoomUsers, isLoading: isLoadingChatRoomUsers, mutateAsync: mutateChatRoomUsers,} = useMutation(
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

    function handleSaveChatRoom() {
        setOpen(false);

    }

    const isOwner = chatroom?.owner_id === loggedInUser?.id;

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
                                  direction="column"
                                  alignItems={'flex-start'}
                                  justifyContent={'center'}
                                  spacing={2}
                                  sx={{
                                      padding: '1rem',
                                  }}

                            >


                                <Grid item xs={2} sx={{
                                    // width: '100%',
                                }}>
                                    <TextField fullWidth
                                               {...register("ChatName", {
                                                   required: true,
                                               })}
                                               label="Chatroom Name"
                                               error={!!errors.name}
                                               autoComplete="name"
                                               helperText={errors.name && errors.name.message}
                                               defaultValue={chatroom?.name}
                                    />
                                </Grid>
                                <Grid item xs={2}
                                      sx={{
                                          // width: '100%',
                                      }}>
                                    <TextField fullWidth
                                               {...register("Description", {
                                                   required: true,
                                               })}
                                               label="Description"
                                               error={!!errors.description}
                                               autoComplete="name"
                                               helperText={errors.description && errors.description.message}
                                               defaultValue={chatroom?.description}
                                    />
                                </Grid>

                                <Grid item xs={3}
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
                                                                <CircularProgress color="inherit" size={20}/> : null}
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
                            <Button onClick={handleSaveChatRoom}>Save</Button>
                        </DialogActions>
                    </Dialog>
                    <Button onClick={handleClickOpen}>
                        <EditIcon/>
                    </Button>
                </>}
        </>)
}


export default ChatEdit;