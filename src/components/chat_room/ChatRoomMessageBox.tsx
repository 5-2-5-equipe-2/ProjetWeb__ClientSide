import Box from "@mui/material/Box";
import {useQuery} from "react-query";
import {getChatRoomMessages} from "../../api/ChatRoom/ChatRoom";
import MessageBubble from "../MessageBubble";
import {CircularProgress, Grid, Paper} from "@mui/material";
import {selectedChatRoomContext} from "../../pages/Chat";
import React, {useContext, useEffect, useState} from "react";
import MessageInterface from "../../api/Message/MessageInterface";

export default function ChatRoomMessageBox() {

    let chatRoomId = useContext(selectedChatRoomContext).selectedChatRoom;
    let {
        data: messagesQuery,
        isLoading,
    } = useQuery(["messages", chatRoomId], () => getChatRoomMessages(chatRoomId), {
        refetchInterval: 1000,
    });

    const [messageData, setMessageData] = useState([] as MessageInterface[]);
    let scrollDiv = React.useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (scrollDiv.current) {
            scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight;
        }

    }, [chatRoomId]);

    useEffect(() => {
        if (messagesQuery && messagesQuery.data.length > 0 && messagesQuery.data !== messageData) {
            setMessageData(messagesQuery.data);
            console.log('updated');
        }
    }, [messageData, messagesQuery]);


    return (
        <Paper style={{overflow: 'auto', maxHeight: "65vh"}} ref={scrollDiv}>
            <Box sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center"
            }}>
                {isLoading &&
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <CircularProgress/>
                    </Box>
                }
                {messageData.length > 0 &&
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems: "flex-start",
                        justifyContent: "center"
                    }}>
                        {messageData.map((message) => (
                            <MessageBubble message={message} key={message.id}/>
                        ), [messageData])}
                    </Box>}

            </Box>
        </Paper>
    );

}