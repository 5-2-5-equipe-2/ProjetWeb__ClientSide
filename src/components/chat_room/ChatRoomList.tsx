import React, {useContext, useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {getChatRooms, searchUserChatRooms} from "../../api/User/User";
import ChatRoomListItem from "./ChatRoomListItem";
import {Box, CircularProgress, Grid, IconButton, InputAdornment, List, TextField} from "@mui/material";
import {loggedInUserContext} from "../../App";
import {selectedChatRoomContext} from "../../pages/Chat";
import SearchIcon from '@mui/icons-material/Search';
import ChatRoomAddButton from "./chat_add_button/ChatRoomAddButton";

const ChatRoomList = () => {

    let loggedInUser = useContext(loggedInUserContext)['loggedInUser'];


    const [search, setSearch] = useState('');

    let {data: chatRooms, isLoading, refetch,isFetching} = useQuery(["chatRoomList", loggedInUser.id], async () => {
            if (search) {
                return (await searchUserChatRooms(loggedInUser.id, search)).data;
            }
            return (await getChatRooms(loggedInUser.id)).data;
        },
        {
            refetchInterval: 1000,
        });
    const selectedChatRoom = useContext(selectedChatRoomContext).selectedChatRoom;
    const setSelectedChatRoom = useContext(selectedChatRoomContext).setSelectedChatRoom;
    useEffect(() => {
        if (chatRooms && chatRooms.length > 0) {
            if (!selectedChatRoom) {
                setSelectedChatRoom(chatRooms[0]);
            }
        }
    }, [chatRooms]);


    return (

        <Grid container direction="column" justifyContent="center" alignItems="center"
              spacing={2}
              sx={{
                  width: "100%",
                  height: "100%",
              }}
        >
            {/*search bar*/}
            <Grid item xs={2}>
                <Box sx={{}}>
                    <TextField
                        label="Search"
                        fullWidth
                        onChange={async (e) => {
                            setSearch(e.target.value);
                            if (e.target.value.length > 2) {
                                await refetch();
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
                </Box>
            </Grid>

            <Grid item xs={10}>


                    {isLoading &&
                        <CircularProgress/>
                    }

                    <List
                        component="nav"
                        aria-label="User List"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflowY: 'auto',
                            // width: '100%',
                            // height: '100%',
                        }}

                    >
                        {chatRooms?.map(chatRoom => (
                            <ChatRoomListItem chatRoom={chatRoom}
                                              key={chatRoom.id}
                            />
                        ))}
                    </List>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            position: 'relative',
                            height: '100%',
                            zIndex: 123,
                        }}
                    ><ChatRoomAddButton/></Box>
            </Grid>
        </Grid>


    );
};

export default ChatRoomList;
