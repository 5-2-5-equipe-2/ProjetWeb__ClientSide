import {Button, Grid, TextField} from "@mui/material";
import ChatRoomList from "../components/chat_room/ChatRoomList";
import ChatRoomMessageBox from "../components/chat_room/ChatRoomMessageBox";
import React, {useContext, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {loggedInUserContext} from "../App";

export const selectedChatRoomContext = React.createContext({
    selectedChatRoom: -1,
    setSelectedChatRoom: (chatRoomId: number) => {
        console.log(chatRoomId);
    }

});


const validationSchema = Yup.object().shape({
    message: Yup.string().required('Message is required'),
});


export default function Chat() {
    const [selectedChatRoomId, setSelectedChatRoomId] = useState(-1);
    let loggedInUser = useContext(loggedInUserContext).loggedInUser;

    const {
        register,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    // const {mutate: sendMessage,} = useMutation();

    React.useEffect(() => {
            register("message");
        }
    );
    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <selectedChatRoomContext.Provider
            value={{"selectedChatRoom": selectedChatRoomId, "setSelectedChatRoom": setSelectedChatRoomId}}>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="space-around"
                  spacing={0}
                  style={{
                      width: "100%",
                      height: "100%",
                      // border: "4px solid"
                  }}
            >
                <Grid item xs={3}
                      sx={{height: "100%"}}
                >
                    <ChatRoomList/>
                </Grid>
                <Grid item xs={7}
                      sx={{height: "100%",}}
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
                        <Grid item
                              xs={12}
                              sx={{height: "100%"}}
                        >
                            <ChatRoomMessageBox/>
                        </Grid>
                        <Grid item
                              xs={11}
                        >
                            <TextField
                                sx={{width: "100%"}}
                                id="filled-multiline-flexible"
                                label="Send Message"
                                multiline
                                maxRows={4}
                                {...register("message")}

                                variant="filled"
                            />


                        </Grid>
                        <Grid item xs={1} sx={{height:"100%"}}>
                            <Button
                                sx={{height:"100%"}}
                                onClick={handleSubmit(onSubmit)}>
                                <SendIcon sx={{width: "100%", height: "100%", margin: "auto"}}/>
                            </Button>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </selectedChatRoomContext.Provider>
    );
}