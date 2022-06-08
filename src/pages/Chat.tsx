import {Box, Button, Grid, IconButton, Paper, TextField, Typography} from "@mui/material";
import ChatRoomList from "../components/chat_room/ChatRoomList";
import ChatRoomMessageBox from "../components/chat_room/ChatRoomMessageBox";
import React, {useContext, useEffect, useState} from "react";
import * as Yup from "yup";
import {useMutation, useQuery} from "react-query";
import {getChatRoomMessages} from "../api/ChatRoom/ChatRoom";
import ChatInput from "../components/chat_room/ChatInput";
import ChatRoomInterface from "../api/ChatRoom/ChatRoomInterface";
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
    } = useQuery(["messages", selectedChatRoom?.id || -1], () => getChatRoomMessages(selectedChatRoom?.id || -1), {
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
            <Paper

                elevation={5}
                sx={
                {padding: "1rem", margin: "1rem"}}>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="space-around"
                      spacing={0}
                      style={{
                          width: "100%",
                      }}
                >
                    <Grid item xs={3}
                          sx={{
                              width: "100%",
                              height: "100%",
                          }}
                    >
                        <Grid container
                              direction="row"
                              justifyContent="center"
                              alignItems="flex-start"
                              width={"100%"}
                              height={"100%"}
                        >
                            <Grid item
                                  width={"100%"}
                                  height={"100%"}
                            >
                                <Paper>
                                    <Grid container
                                          direction="column"
                                          justifyContent="flex-start"
                                          alignItems="flex-start"
                                          spacing={2}
                                          sx={{
                                              width: "100%",
                                              height: "100%",

                                          }}

                                    >

                                        <Grid item xs={12}
                                              sx={{
                                                  width: "100%",
                                                  height: "100%",
                                              }}
                                        >
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
                                                                    messageData={messageData?.data || []}/>
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