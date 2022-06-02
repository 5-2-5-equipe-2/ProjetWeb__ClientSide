import Box from "@mui/material/Box";
import {useQuery} from "react-query";
import {getChatRoomMessages} from "../../api/ChatRoom/ChatRoom";
import MessageBubble from "../MessageBubble";
import {CircularProgress, Paper} from "@mui/material";
import {selectedChatRoomContext} from "../../pages/Chat";
import {useContext} from "react";

export default function ChatRoomMessageBox() {
    let chatRoomId = useContext(selectedChatRoomContext).selectedChatRoom;
    const messages = useQuery(["messages", chatRoomId], () => getChatRoomMessages(chatRoomId), {
        refetchInterval: 1000,
    });

    return (
        <Box sx={{width: "99%", height: "70vh"}}>
            <Paper style={{maxHeight: "100%", overflow: 'auto'}}>
                <Box sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {messages.isLoading &&
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
                    {messages.data &&
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {messages.data.data.map((message) => (
                                <MessageBubble message={message} key={message.id}/>
                            ), [])}
                        </Box>}

                </Box>
            </Paper>
        </Box>
    );

}