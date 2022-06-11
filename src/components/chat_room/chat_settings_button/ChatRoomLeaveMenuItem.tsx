import {Fade, MenuItem} from "@mui/material";
import {useSnackbar} from "notistack";
import {useMutation} from "react-query";
import {selectedChatRoomContext} from "../../../pages/Chat";
import {useContext} from "react";
import {leaveChatRoom} from "../../../api/ChatRoom/ChatRoom";
import {loggedInUserContext} from "../../../App";

function ChatRoomLeaveMenuItem() {

    const selectedChatRoom = useContext(selectedChatRoomContext).selectedChatRoom;
    const setSelectedChatRoom = useContext(selectedChatRoomContext).setSelectedChatRoom;
    const loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const {enqueueSnackbar} = useSnackbar();

    const {mutate: leaveChatRoomMutation} = useMutation(leaveChatRoom, {
            onSuccess: async () => {
                enqueueSnackbar('Chat room left', {
                    variant: 'success', autoHideDuration: 1300,
                    TransitionComponent: Fade
                });
                setSelectedChatRoom(null);
            },
            onError: async (error) => {
                // @ts-ignore
                enqueueSnackbar(error.data.error, {
                    variant: 'error', autoHideDuration: 1300,
                    TransitionComponent: Fade
                });
            }
        }
    );
    function handleClick() {
        if (selectedChatRoom && loggedInUser) {
            leaveChatRoomMutation({chatRoomId: selectedChatRoom?.id, userId: loggedInUser?.id});
        }
        else{
            enqueueSnackbar('You have not selected a chat room', {
                variant: 'error', autoHideDuration: 1300,
                TransitionComponent: Fade
            });
        }
    }


    return <MenuItem onClick={handleClick}>Leave Chat Room</MenuItem>;
}

export default ChatRoomLeaveMenuItem;