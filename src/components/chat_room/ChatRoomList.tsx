import React, {useContext, useEffect, useState} from 'react';
import {useMutation, useQuery} from "react-query";
import {getChatRooms, searchUserChatRooms} from "../../api/User/User";
import ChatRoomListItem from "./ChatRoomListItem";
import {Box, CircularProgress, Collapse, Grid, IconButton, InputAdornment, List, TextField} from "@mui/material";
import {loggedInUserContext} from "../../App";
import {selectedChatRoomContext} from "../../pages/Chat";
import SearchIcon from '@mui/icons-material/Search';
import ChatRoomAddButton from "./chat_add_button/ChatRoomAddButton";
import {TransitionGroup} from 'react-transition-group';

const ChatRoomList = () => {

    let loggedInUser = useContext(loggedInUserContext)['loggedInUser'];


    const [search, setSearch] = useState('');

    let {data: chatRooms, isLoading, isFetching} = useQuery(["chatRoomList", loggedInUser.id], async () => {
            return (await getChatRooms(loggedInUser.id)).data;
        },
        {
            refetchInterval: 1000,
            refetchOnWindowFocus: false,
        });
    const selectedChatRoom = useContext(selectedChatRoomContext).selectedChatRoom;
    const setSelectedChatRoom = useContext(selectedChatRoomContext).setSelectedChatRoom;


    const {mutate: searchChatRoomMutate, data: searchData} = useMutation(searchUserChatRooms)


    useEffect(() => {
        if (chatRooms && chatRooms.length > 0) {
            if (!selectedChatRoom) {
                setSelectedChatRoom(chatRooms[0]);
            }
        }
        console.log(chatRooms)
    }, [chatRooms, selectedChatRoom, setSelectedChatRoom]);


    return (

        <Grid container direction="column" justifyContent="center" alignItems="center"
              spacing={2}

              sx={
                  {
                      width: "100%",
                      height: "100%"
                  }
              }
        >
            <Grid item xs={2}>
                <TextField
                    label="Search"
                    fullWidth
                    onChange={async (e) => {
                        setSearch(e.target.value);
                        if (e.target.value.length > 2) {
                            await searchChatRoomMutate({id: loggedInUser.id, search: e.target.value});
                        }
                    }
                    }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end">
                                <IconButton>
                                    <SearchIcon/>
                                </IconButton>
                                {(isFetching && search) && <CircularProgress size={20}/>}
                            </InputAdornment>
                        )
                    }}
                />
            </Grid>
            <Grid item xs={7}
                  sx={{
                      width: "100%"
                  }}
            >


                {isLoading &&
                    <CircularProgress/>
                }
                {(((chatRooms && !search) || (searchData && search)) &&
                    <List
                        component="div"
                        aria-label="User List"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            // alignItems: 'center',
                            // justifyContent: 'center',
                            overflowY: 'auto',
                            width: '100%',
                            // height: '60vh',
                            maxHeight: "50vh",
                        }}

                    >
                        <TransitionGroup>

                            {(chatRooms && !search) && chatRooms?.map(chatRoom => (
                                <Collapse key={chatRoom.id}>
                                    <ChatRoomListItem chatRoom={chatRoom}

                                    />
                                </Collapse>
                            ))}
                            {(search) && searchData?.data?.map(chatRoom => (
                                <Collapse key={chatRoom.id}>
                                    <ChatRoomListItem chatRoom={chatRoom}
                                                      key={chatRoom.id}
                                    />
                                </Collapse>
                            ))}
                        </TransitionGroup>
                    </List>) || <Box sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <h1>No ChatRooms</h1>
                    <ChatRoomAddButton/>
                </Box>}


                <Grid item xs={3}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // width: '100%',
                            // height: '100%',
                            // padding: '1rem',

                        }}
                    ><ChatRoomAddButton/></Box>
                </Grid>
            </Grid>
        </Grid>


    );
};

export default ChatRoomList;
