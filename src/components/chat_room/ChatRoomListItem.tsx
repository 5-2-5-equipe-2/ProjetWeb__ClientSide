import * as React from 'react';
import {
    ListItemButton,
} from "@mui/material";
import ChatRoomInterface from "../../api/ChatRoom/ChatRoomInterface";
import {
    useContext,
} from "react";
import {selectedChatRoomContext} from "../../pages/Chat";
import ChatBubble from "./ChatBubble";


export default function ChatRoomListItem({chatRoom}: { chatRoom: ChatRoomInterface }) {
    const selectedChatRoom = useContext(selectedChatRoomContext).selectedChatRoom;
    const setSelectedChatRoom = useContext(selectedChatRoomContext).setSelectedChatRoom;
    const handleClick = () => {
        setSelectedChatRoom(chatRoom);
    };
    return (
            <ListItemButton
                selected={(selectedChatRoom && selectedChatRoom.id === chatRoom.id )|| false}
                            onClick={handleClick}

                sx={{
                    width: "100%",
                    // height: "10vh",
                }}
            >

                {/*<Grid container*/}
                {/*      direction="row"*/}
                {/*      justifyContent="flex-start"*/}
                {/*      alignItems="center"*/}
                {/*>*/}

                {/*    <Grid item xs={2}>*/}
                {/*        <Grid container*/}
                {/*              direction="column"*/}
                {/*              justifyContent="center"*/}
                {/*              alignItems="center"*/}
                {/*              spacing={0}*/}

                {/*        >*/}

                {/*            <Grid item>*/}
                {/*                <Avatar*/}
                {/*                    src="https://s2.qwant.com/thumbr/0x380/f/0/cfad668057d86db15d1d4694dcbf54204360433eee33986147295c7f768556/stephen-meyers-rLBewYnoi6I-unsplash.jpg?u=http%3A%2F%2Fagingoutsidethelines.com%2Fwp-content%2Fuploads%2F2019%2F07%2Fstephen-meyers-rLBewYnoi6I-unsplash.jpg&q=0&b=1&p=0&a=0"*/}
                {/*                    alt="profile picture"*/}
                {/*                />*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={8}>*/}
                {/*        <Grid container*/}
                {/*              direction="row"*/}
                {/*              justifyContent="flex-start"*/}
                {/*              alignItems="flex-start"*/}
                {/*              spacing={0}*/}
                {/*        >*/}
                {/*            <Grid item xs={12}>*/}
                {/*                <Typography variant="h6" align={'left'}>*/}
                {/*                    {chatRoom.name}*/}
                {/*                </Typography>*/}
                {/*            </Grid>*/}
                {/*            <Grid item xs={12}>*/}
                {/*                <Typography variant="subtitle2" color="text.secondary" align={'left'}>*/}
                {/*                    Last Message: ...*/}
                {/*                </Typography>*/}
                {/*            </Grid>*/}
                {/*            <Grid item>*/}
                {/*                <Typography variant="body2" color="text.secondary" component="div">*/}
                {/*                    {chatRoom.description}*/}
                {/*                </Typography>*/}
                {/*            </Grid>*/}

                {/*        </Grid>*/}

                {/*    </Grid>*/}

                {/*</Grid>*/}

                <ChatBubble chatRoom={chatRoom}></ChatBubble>
            </ListItemButton>

    );
}

