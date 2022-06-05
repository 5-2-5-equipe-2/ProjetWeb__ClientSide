import {Box, Grid, IconButton, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "react-query";
import {createMessage, CreateMessageInterface} from "../../api/Message/Message";
import * as Yup from "yup";
import {selectedChatRoomContext} from "../../pages/Chat";
import {loggedInUserContext} from "../../App";

const validationSchema = Yup.object().shape({
    messageContent: Yup.string().required('Message is required'),
});

const ChatInput = ({refetchMessages}: { refetchMessages: any }) => {
    const selectedChatRoomId = useContext(selectedChatRoomContext).selectedChatRoom?.id;
    const loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const buttonRef = React.createRef<HTMLButtonElement>();
    const textInputRef = React.createRef<HTMLInputElement>();
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const {mutate: sendMessage,} = useMutation(createMessage, {
        onSuccess: (data, variables,) => {
            setValue('messageContent', '');

        }
    });

    React.useEffect(() => {
            register("messageContent");
            const listener = (event: KeyboardEvent) => {
                // click button when cntrl+enter is pressed
                if (event.key === "Enter") {
                    if (event.ctrlKey) {
                        if (textInputRef.current) {
                            textInputRef.current.value += "\n";
                            console.log(textInputRef.current);
                        }
                    } else {
                        buttonRef.current?.click();
                    }

                }

            };
            document.addEventListener("keydown", listener);
            return () => {
                document.removeEventListener("keydown", listener);
            };
        }
    );
    const onSubmit = async (data: any) => {
        if (selectedChatRoomId) {
            let message: CreateMessageInterface = {
                content: data.messageContent,
                chatRoomId: selectedChatRoomId,
                userId: loggedInUser.id,
            }
            sendMessage(message);
            await refetchMessages({throwOnError: true});
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
                    maxRows={10}
                    {...register("messageContent")}
                    variant="filled"
                    inputRef={textInputRef}
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