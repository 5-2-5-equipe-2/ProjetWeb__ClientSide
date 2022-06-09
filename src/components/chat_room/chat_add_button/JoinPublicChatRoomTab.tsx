// Yup form to create the chatroom
import * as Yup from "yup";
import {useContext, useState} from "react";
import {loggedInUserContext} from "../../../App";
import {selectedChatRoomContext} from "../../../pages/Chat";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useMutation} from "react-query";
import {
    joinPublicChatRoom,
    searchPublicChatRooms
} from "../../../api/ChatRoom/ChatRoom";
import {Autocomplete, Button, CircularProgress, Grid, TextField} from "@mui/material";
import * as React from "react";
import ChatRoomInterface from "../../../api/ChatRoom/ChatRoomInterface";
import {useSnackbar} from "notistack";
import {AxiosError} from "axios";

const validationSchema = Yup.object().shape({
    id: Yup.string()
        .required('Url is required')
        .min(3, 'Name must be at least 3 characters'),


});


export default function JoinPublicChatRoomTab() {
    const loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const chatroom = useContext(selectedChatRoomContext).selectedChatRoom;
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const {enqueueSnackbar} = useSnackbar();

    const [value, setValue] = useState(null as null | ChatRoomInterface);
    const [inputValue, setInputValue] = useState('');

    const {mutate: mutateJoinPublicChatRoom, data: queryResponseData} = useMutation(
        joinPublicChatRoom,
        {
            onSuccess: data => {
                enqueueSnackbar('Chat room joined', {
                    variant: 'success',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
            },
            onError: (error: AxiosError) => {
                enqueueSnackbar(error.message, {
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',

                    },
                });

            }

        }
    )


    const {mutate: mutateSearchChatRooms, data: searchChatRoomsData, isLoading: isSearchLoading} = useMutation(
        searchPublicChatRooms,
        {
            onSuccess: data => {
                console.log(data)

            }
        }
    )
    const generateLabel = (chatRoom: ChatRoomInterface) => {
        if (chatRoom.description) {
            return chatRoom.name + " (" + chatRoom?.description + ")";
        } else {
            return chatRoom.name;
        }
    }

    function getSearchUsersData() {
        return searchChatRoomsData?.data || [];
    }


    const onSubmit = async () => {
        if (value) {
            await mutateJoinPublicChatRoom(value.id)
        } else {
            enqueueSnackbar('Please select a chat room', {
                variant: 'error',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',

                },
            });
        }

    }

    return (<form>
            <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
            >

                <Grid item sx={
                    {
                        width: '100%',
                    }
                }>
                    <Autocomplete
                        id="chatRoomUsers"
                        sx={
                            {
                                width: '100%',
                            }
                        }


                        isOptionEqualToValue={(option: ChatRoomInterface, value: ChatRoomInterface) => {
                            return option.name === value.name || option.id === value.id;
                        }}
                        fullWidth
                        getOptionLabel={generateLabel}
                        options={getSearchUsersData()}
                        loading={isSearchLoading}
                        filterSelectedOptions
                        value={value}
                        onChange={(_, newValue) => {
                            setValue(newValue)
                        }}
                        inputValue={inputValue}
                        onInputChange={(_, newInputValue) => {
                            mutateSearchChatRooms(newInputValue);
                            setInputValue(newInputValue)
                        }}

                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Public Chat Room"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {isSearchLoading ?
                                                <CircularProgress color="inherit" size={20}/> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid item sx={
                    {
                        width: '100%',
                    }
                }>
                    <Button
                        variant="contained"
                        sx={{
                            width: "100%"
                        }}

                        onClick={onSubmit}
                    >Join</Button>

                </Grid>
            </Grid>


        </form>


    )

}