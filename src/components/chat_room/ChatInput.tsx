import {Box, Fade, Grid, IconButton, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "react-query";
import {createMessage, CreateMessageInterface} from "../../api/Message/Message";
import * as Yup from "yup";
import {selectedChatRoomContext} from "../../pages/Chat";
import {loggedInUserContext} from "../../App";
import {useSnackbar} from "notistack";

const validationSchema = Yup.object().shape({
    messageContent: Yup.string().required('Message is required').max(1000, 'Message is too long'),
});

const ChatInput = ({refetchMessages}: { refetchMessages: any }) => {
    const selectedChatRoomId = useContext(selectedChatRoomContext).selectedChatRoom?.id;
    const loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const buttonRef = React.createRef<HTMLButtonElement>();
    const textInputRef = React.createRef<HTMLInputElement>();
    const {enqueueSnackbar, } = useSnackbar();
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const {mutate: sendMessage,} = useMutation(createMessage, {
        onSuccess: async (data, variables,) => {
            setValue('messageContent', '');
            await refetchMessages({throwOnError: true});
            enqueueSnackbar('Message sent', {variant: 'success',autoHideDuration: 1300,
                TransitionComponent:Fade
            });

        }
    });

    React.useEffect(() => {
            register("messageContent",
                {required: true, max: 1000, min: 1});
        }
    );
    const onSubmit = (data: any) => {
        if (selectedChatRoomId) {
            let message: CreateMessageInterface = {
                content: data.messageContent,
                chatRoomId: selectedChatRoomId,
                userId: loggedInUser.id,
            }
            sendMessage(message);
        }

    }


    async function onKeyDown(event: KeyboardEvent) {
        // if the user has pressed enter submit the message
        if (event.key === "Enter") {
            if (event.ctrlKey) {
                if (textInputRef.current) {
                    textInputRef.current.value += "\n";
                    console.log(textInputRef.current);
                }
            } else {
                if (textInputRef.current) {
                    textInputRef.current.value = '';
                }
                buttonRef.current?.click();
            }
        }
    }

    return (
        <Grid container
              direction="row"
              justifyContent="space-around"
              alignItems="space-around"
              spacing={2}
        >
            <Grid item xs={11}>
                <TextField
                    sx={{width: "100%"}}
                    id="textInputChat"
                    label="Send Message"
                    multiline
                    rows={2}
                    {...register("messageContent")}
                    variant="filled"
                    inputRef={textInputRef}
                    onKeyDown={onKeyDown}
                />
            </Grid>
            <Grid item xs={1}>
                <Box sx={{
                    width: "100%"
                    , height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                    <IconButton
                        onClick={handleSubmit(onSubmit)}
                        ref={buttonRef}
                        centerRipple={true}
                    >
                        <SendIcon/>
                    </IconButton>
                </Box>
            </Grid>
        </Grid>
    )

}

export default ChatInput;