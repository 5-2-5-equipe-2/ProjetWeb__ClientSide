import React, {useContext} from 'react';
import {useQuery} from "react-query";
import {getChatRooms} from "../../api/User/User";
import ChatRoomListItem from "./ChatRoomListItem";
import {Box, CircularProgress, List, Paper} from "@mui/material";
import {loggedInUserContext} from "../../App";
import ChatRoomInterface from "../../api/ChatRoom/ChatRoomInterface";
import {selectedChatRoomContext} from "../../pages/Chat";


const ChatRoomList = () => {

    let loggedInUser = useContext(loggedInUserContext)['loggedInUser'];

    let {data, isLoading,} = useQuery(["chatRoomList", loggedInUser.id], () => getChatRooms(loggedInUser.id),
        {
            refetchInterval: 1000,
        });
    // console.log(data);
    let chatRooms = data?.data as ChatRoomInterface[] | undefined;
    const selectedChatRoomId = useContext(selectedChatRoomContext).selectedChatRoom;
    const setSelectedChatRoomId = useContext(selectedChatRoomContext).setSelectedChatRoom;
    if (selectedChatRoomId === -1 && chatRooms && chatRooms.length > 0) {
        setSelectedChatRoomId(chatRooms[0].id);
    }

    return (
        <Box sx={{width: "100%", height: "100%"}}>
            {isLoading &&
                <CircularProgress/>
            }
            <Paper style={{maxHeight: "100%", overflow: 'auto', width: "100%"}}>

                <List
                    component="nav"
                    aria-label="User List"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                    }}

                >
                    {chatRooms?.map(chatRoom => (
                        <ChatRoomListItem chatRoom={chatRoom}
                                          key={chatRoom.id}
                                          selectedChatRoom={selectedChatRoomId}
                                          setSelectedChatRoom={setSelectedChatRoomId}
                        />
                    ))}
                </List>
            </Paper>
        </Box>


    );
};

export default ChatRoomList;
