import {Grid, Paper, Typography} from "@mui/material";
import ChatRoomList from "../components/chat_room/ChatRoomList";
import ChatRoomMessageBox from "../components/chat_room/ChatRoomMessageBox";
import React, {useState} from "react";
import ChatInput from "../components/chat_room/ChatInput";
import ChatRoomInterface from "../api/ChatRoom/ChatRoomInterface";
import ChatBubble from "../components/chat_room/ChatBubble";
import ChatEdit from "../components/chat_room/chat_settings_button/ChatEdit";
import ChatEditButton from "../components/chat_room/chat_settings_button/ChatEditButton";

export const selectedChatRoomContext = React.createContext({
    selectedChatRoom: null as ChatRoomInterface | null,
    setSelectedChatRoom: (chatRoom: ChatRoomInterface|null) => {
        console.log(chatRoom);
    }

});
export const infiniteQueryContext = React.createContext({
    refetch: null as any,
    setRefetch: null as any,
});


export default function Chat() {
    const [selectedChatRoom, setSelectedChatRoom] = useState(null as ChatRoomInterface | null);
    const [refetch, setRefetch] = useState(null as any);
    return (
        <selectedChatRoomContext.Provider
            value={{"selectedChatRoom": selectedChatRoom, "setSelectedChatRoom": setSelectedChatRoom}}>
            <infiniteQueryContext.Provider value={{"refetch": refetch, "setRefetch": setRefetch}}>
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
                                            <Grid item><ChatBubble chatRoom={selectedChatRoom}
                                                                   displayDescription/></Grid>
                                            <Grid item><ChatEditButton/></Grid>
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
                                                    <ChatRoomMessageBox/>
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
                                    <ChatInput/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid></Paper>
            </infiniteQueryContext.Provider>
        </selectedChatRoomContext.Provider>
    );
}