import ChatRoomInterface from "../../api/ChatRoom/ChatRoomInterface";
import {Avatar, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";


export default function ChatBubble({
                                       chatRoom,
                                       displayLastMessage = false,
                                       displayDescription = false
                                   }:
                                       {
                                           chatRoom: ChatRoomInterface,
                                           displayLastMessage?: boolean,
                                           displayDescription?: boolean
                                       }) {
    return (
        <Grid container
              direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              spacing={5}

        >
            <Grid item xs={4}

            >
                <Grid container
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                >
                    <Grid item
                    ><Avatar
                        sx={{width: 32, height: 32}}
                        src="https://s2.qwant.com/thumbr/0x380/f/0/cfad668057d86db15d1d4694dcbf54204360433eee33986147295c7f768556/stephen-meyers-rLBewYnoi6I-unsplash.jpg?u=http%3A%2F%2Fagingoutsidethelines.com%2Fwp-content%2Fuploads%2F2019%2F07%2Fstephen-meyers-rLBewYnoi6I-unsplash.jpg&q=0&b=1&p=0&a=0"
                        alt="profile picture"
                    /></Grid>
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <Grid container
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={0}
                      sx={{
                            width: "30vw",
                      }}


                >
                    <Grid item xs={10}>
                        <Typography variant="h6" align={'left'}>
                            {chatRoom.name}
                        </Typography>
                    </Grid>
                    {displayLastMessage && (
                        <Grid item xs={1}>
                            <Typography variant="subtitle2" color="text.secondary" align={'left'}>
                                Last Message: ...
                            </Typography>
                        </Grid>)}
                    {displayDescription && (
                        <Grid item xs={1}>
                            <Typography variant="body2" color="text.secondary" component="div">
                                Description: {chatRoom.description}
                            </Typography>
                        </Grid>)}

                </Grid>

            </Grid>

        </Grid>
    )
}