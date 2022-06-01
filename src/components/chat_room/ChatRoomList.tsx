import React, {useContext, useState} from 'react';
import {useQuery} from "react-query";
import {getChatRooms, getUsers} from "../../api/User/User";
import UserInterface from '../../api/User/UserInterface';
import ChatRoomListItem from "./ChatRoomListItem";
import {Box, CircularProgress, List} from "@mui/material";
import {getChatRoomByUserId} from "../../api/ChatRoom/ChatRoom";
import {getMessage} from "../../api/Message/Message";
import {loggedInUserContext} from "../../App";
import ChatRoomInterface from "../../api/ChatRoom/ChatRoomInterface";


const ChatRoomList = () => {

    let loggedInUser = useContext(loggedInUserContext)['loggedInUser'];

    let {data, isLoading,} = useQuery(["chatRoomList", loggedInUser.id], () => getChatRooms(loggedInUser.id),
        {
        refetchInterval: 1000,
    });
    // console.log(data);
    let chatRooms = data?.data as ChatRoomInterface[] | undefined;
    const [selectedChatRoomId, setSelectedChatRoomId] = useState(chatRooms?.[0].id);
    return (
        <Box sx={{width: "100%"}}>
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
        </Box>


    );
};

export default ChatRoomList;
