import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import ChatRoomList from "../components/chat_room/ChatRoomList";
import ChatRoomMessageBox from "../components/chat_room/ChatRoomMessageBox";
import React, {useContext, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {loggedInUserContext} from "../App";
import {createMessage, CreateMessageInterface} from "../api/Message/Message";
import {useMutation, useQuery} from "react-query";
import {getChatRoomMessages} from "../api/ChatRoom/ChatRoom";

export const selectedChatRoomContext = React.createContext({
    selectedChatRoom: -1,
    setSelectedChatRoom: (chatRoomId: number) => {
        // console.log(chatRoomId);
    }

});


const validationSchema = Yup.object().shape({
    messageContent: Yup.string().required('Message is required'),
});


export default function Chat() {
    const [selectedChatRoomId, setSelectedChatRoomId] = useState(-1);
    let loggedInUser = useContext(loggedInUserContext).loggedInUser;

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const {mutate: sendMessage,} = useMutation(createMessage, {
        onSuccess: (data, variables,) => {
            // refectchMessages().then(r => {
            //     console.log(r);
            // });
            // console.log(data);
            // console.log(variables);
            setValue('messageContent', '');

        }
    });

    React.useEffect(() => {
            register("messageContent");
        }
    );
    const onSubmit = (data: any) => {
        let message: CreateMessageInterface = {
            content: data.messageContent,
            chatRoomId: selectedChatRoomId,
            userId: loggedInUser.id,
        }
        sendMessage(message);

    }

    return (
        <selectedChatRoomContext.Provider
            value={{"selectedChatRoom": selectedChatRoomId, "setSelectedChatRoom": setSelectedChatRoomId}}>
            <Paper sx={
                {padding: "1rem", margin: "1rem"}}>

                <Grid container
                     direction="row"
                     justifyContent="center"
                     alignItems="space-around"
                     spacing={0}
                     style={{
                         width: "100%",
                         height: "80vh",
                         // height: "100%"
                         // border: "4px solid"
                     }}
            >
                <Grid item xs={3}
                      style={{
                          width: "100%",
                          height: "100%",
                      }}
                >
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="flex-start"
                          style={{
                              // border: "4px solid",
                              // padding: "10px",
                              height: "100%",
                              width: "100%",

                          }}
                    >
                        <Grid item
                              style={{
                                  height: "100%",
                                  width: "100%",
                              }}
                        >
                            <Paper style={
                                {
                                    height: "100%",
                                }
                            }>
                                <Grid container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="flex-start"
                                      style={{
                                          height: "100%",
                                          width: "100%",
                                      }}
                                >
                                    <Grid item>
                                        <Typography variant="h4" align={'center'}>
                                            Chat Rooms
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}>
                                        <ChatRoomList/>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={9}
                      style={{
                          height: "100%",
                      }}
                >
                    <Grid container
                          style={{
                              height: "100%",
                              width: "100%",
                          }}

                    >
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                Chat Room Messages
                            </Typography>
                        </Grid>
                        <Grid item xs={12}
                              style={{
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
                                      height: "100%",
                                  }}
                            >
                                <Grid item xs={12}>
                                    <Grid container
                                          direction="row"
                                          justifyContent="space-around"
                                          alignItems="space-around"
                                          spacing={2}
                                    >
                                        <Grid item xs={12}><ChatRoomMessageBox/></Grid>
                                        <Grid item xs={11}>
                                            <TextField
                                                sx={{width: "100%"}}
                                                id="filled-multiline-flexible"
                                                label="Send Message"
                                                multiline
                                                maxRows={4}
                                                {...register("messageContent")}
                                                variant="filled"
                                            />


                                        </Grid>
                                        <Grid item xs={1} height={"100%"}>
                                            <Button
                                                sx={{height: "100%"}}
                                                onClick={handleSubmit(onSubmit)}>
                                                <SendIcon sx={{width: "70%", height: "70%", margin: "auto"}}/>
                                            </Button>

                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid></Paper>
        </selectedChatRoomContext.Provider>
    );
}