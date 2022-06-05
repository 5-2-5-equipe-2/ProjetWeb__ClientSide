import React, {useContext, useEffect} from 'react';
import {useQuery} from "react-query";
import {getChatRooms} from "../../api/User/User";
import ChatRoomListItem from "./ChatRoomListItem";
import {Box, CircularProgress, List, Paper} from "@mui/material";
import {loggedInUserContext} from "../../App";
import ChatRoomInterface from "../../api/ChatRoom/ChatRoomInterface";
import {selectedChatRoomContext} from "../../pages/Chat";


const ChatRoomList = () => {

    let loggedInUser = useContext(loggedInUserContext)['loggedInUser'];

    let {data: chatRooms, isLoading,} = useQuery(["chatRoomList", loggedInUser.id], () => getChatRooms(loggedInUser.id),
        {
            refetchInterval: 1000,
        });
    // console.log(data);
    const selectedChatRoom = useContext(selectedChatRoomContext).selectedChatRoom;
    const setSelectedChatRoom = useContext(selectedChatRoomContext).setSelectedChatRoom;
    useEffect(() => {
        if (chatRooms && chatRooms.data.length > 0) {
            if (!selectedChatRoom) {
                setSelectedChatRoom(chatRooms.data[0]);
            }
        }
    }, [chatRooms, setSelectedChatRoom, selectedChatRoom]);


    return (

        <Paper style={{height: "100%", overflow: 'auto', width: "100%"}}>
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
                    // width: '100%',
                    // height: '100%',
                }}

            >
                {chatRooms?.data?.map(chatRoom => (
                    <ChatRoomListItem chatRoom={chatRoom}
                                      key={chatRoom.id}
                    />
                ))}
            </List>
        </Paper>


    );
};

export default ChatRoomList;
