import ChatRoomInterface from "../../api/ChatRoom/ChatRoomInterface";
import {Avatar, ListItemAvatar, ListItemText} from "@mui/material";
import * as React from "react";


export default function ChatBubble({
                                       chatRoom,
                                       displayLastMessage = false,
                                       displayDescription = false
                                   }:
                                       {
                                           chatRoom: ChatRoomInterface,
                                           displayLastMessage?: boolean,
                                           displayDescription?: boolean
                                       }) {
    return (
        <>
            <ListItemAvatar>
                <Avatar>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={chatRoom.name}
                secondary={displayDescription ? chatRoom.description : null}

            />
        </>

    )
}