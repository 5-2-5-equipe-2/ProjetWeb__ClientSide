import {Box, Button, Grid, IconButton, Paper, TextField, Typography} from "@mui/material";
import ChatRoomList from "../components/chat_room/ChatRoomList";
import ChatRoomMessageBox from "../components/chat_room/ChatRoomMessageBox";
import React, {useContext, useEffect, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {loggedInUserContext} from "../App";
import {createMessage, CreateMessageInterface} from "../api/Message/Message";
import {useMutation, useQuery} from "react-query";
import {getChatRoomMessages} from "../api/ChatRoom/ChatRoom";
import MessageInterface from "../api/Message/MessageInterface";
import ChatInput from "../components/chat_room/ChatInput";
import ChatRoomInterface from "../api/ChatRoom/ChatRoomInterface";
import ChatRoomListItem from "../components/chat_room/ChatRoomListItem";
import ChatBubble from "../components/chat_room/ChatBubble";
import ChatEdit from "../components/chat_room/ChatEdit";

export const selectedChatRoomContext = React.createContext({
    selectedChatRoom: null as ChatRoomInterface | null,
    setSelectedChatRoom: (chatRoom: ChatRoomInterface) => {
        // console.log(chatRoomId);
    }

});


const validationSchema = Yup.object().shape({
    messageContent: Yup.string().required('Message is required'),
});


export default function Chat() {
    const [selectedChatRoom, setSelectedChatRoom] = useState(null as ChatRoomInterface | null);

    // const [messageData, setMessageData] = useState([] as MessageInterface[]);
    let {
        data: messageData,
        isLoading: isMessagesLoading,
        refetch: refetchMessages,
    } = useQuery(["messages", selectedChatRoom?.id||-1], () => getChatRoomMessages(selectedChatRoom?.id || -1), {
        refetchInterval: 1000,
    });


    // useEffect(() => {
    //     if (messagesQuery && messagesQuery.data !== messageData) {
    //         setMessageData(messagesQuery.data);
    //     }
    // }, [messageData, messagesQuery]);
    return (
        <selectedChatRoomContext.Provider
            value={{"selectedChatRoom": selectedChatRoom, "setSelectedChatRoom": setSelectedChatRoom}}>
            <Paper sx={
                {padding: "1rem", margin: "1rem"}}>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="space-around"
                      spacing={0}
                      style={{
                          width: "100%",
                          // height: "80vh",
                          // height: "100%"
                          // border: "4px solid"
                      }}
                >
                    <Grid item xs={3}>
                        <Grid container
                              direction="row"
                              justifyContent="center"
                              alignItems="flex-start">
                            <Grid item>
                                <Paper>
                                    <Grid container
                                          direction="column"
                                          justifyContent="flex-start"
                                          alignItems="flex-start"

                                    >
                                        <Grid item xs={1}>
                                            <Typography variant="h4" align={'center'}>
                                                Chat Rooms
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ChatRoomList/>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={9}>
                        <Grid container
                              direction="column"
                              justifyContent="space-around"
                              alignItems="flex-start"
                            // sx={{
                            //     height: "100%",
                            // }}
                        >
                            <Grid item xs={1}
                                  sx={{
                                      width: "100%",
                                  }}
                            >
                                {selectedChatRoom &&
                                    <Paper
                                        elevation={0}
                                    ><Grid container
                                           direction="row"
                                           justifyContent="space-between"
                                           alignItems="flex-start"
                                           spacing={0}
                                           sx={{
                                               padding: "1rem",
                                           }}
                                    >
                                        <Grid item><ChatBubble chatRoom={selectedChatRoom} displayDescription/></Grid>
                                        <Grid item><ChatEdit/></Grid>
                                    </Grid></Paper>

                                }
                                {!selectedChatRoom &&
                                    <Typography variant="h4" align={'center'}>
                                        Select a chat room
                                    </Typography>
                                }

                            </Grid>
                            <Grid item xs={10}
                                  sx={{
                                      width: "100%",
                                      height: "100%",
                                  }}

                            >
                                <Grid container
                                      direction="row"
                                      justifyContent="space-around"
                                      alignItems="space-around"
                                      spacing={0}
                                      style={{
                                          width: "100%",
                                          height: "55vh",
                                      }}

                                >
                                    <Grid item xs={12}
                                          sx={{
                                              width: "100%",
                                              height: "100%",
                                          }}
                                    >
                                        <Grid container
                                              direction="row"
                                              justifyContent="space-around"
                                              alignItems="space-around"
                                              spacing={2}
                                              sx={{
                                                  width: "100%",
                                                  height: "100%",
                                              }}
                                        >
                                            <Grid item xs={12}
                                                  sx={{
                                                      height: "100%",
                                                  }}
                                            >
                                                <ChatRoomMessageBox isMessagesLoading={isMessagesLoading}
                                                                    messageData={messageData?.data||[]}/>
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={1}
                                  sx={{
                                      width: "100%",
                                  }}
                            >
                                <ChatInput refetchMessages={refetchMessages}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid></Paper>
        </selectedChatRoomContext.Provider>
    );
}