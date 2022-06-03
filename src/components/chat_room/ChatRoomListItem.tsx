import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
    Avatar,
    Button,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid,
    TextField
} from "@mui/material";
import ChatRoomInterface from "../../api/ChatRoom/ChatRoomInterface";
import {loggedInUserContext} from "../../App";
import {useContext, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';

interface ChatRoomListItemProps {
    chatRoom: ChatRoomInterface;
    selectedChatRoom: number | undefined;
    setSelectedChatRoom: (chatRoomId: number) => void;
}

export default function ChatRoomListItem({chatRoom, selectedChatRoom, setSelectedChatRoom}: ChatRoomListItemProps) {
    const loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const [open, setOpen] = React.useState(false);
    const [styles, setStyles] = useState({
        width: "100%", opacity: 0.75, transition: "opacity 0.5s"
    });
    const [isOwner, setIsOwner] = useState(false);


    React.useEffect(() => {
        if (selectedChatRoom && selectedChatRoom === chatRoom.id) {
           setStyles({
                width: "100%", opacity: 1, transition: "opacity 0.5s"
           })
        }
        
        setIsOwner(chatRoom.owner_id === loggedInUser.id);
    }, [chatRoom.id, chatRoom.owner_id, loggedInUser.id, selectedChatRoom]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = () => {
        setSelectedChatRoom(chatRoom.id);
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Chatroom</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
            <ButtonBase sx={styles} onClick={handleClick}>

                <Grid container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={0}
                      sx={{
                          width: "100%",
                          height: "100%",
                      }}
                >

                    <Grid item xs={2}>
                        <Grid container
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              spacing={0}

                        >

                            <Grid item><Avatar
                                src="https://s2.qwant.com/thumbr/0x380/f/0/cfad668057d86db15d1d4694dcbf54204360433eee33986147295c7f768556/stephen-meyers-rLBewYnoi6I-unsplash.jpg?u=http%3A%2F%2Fagingoutsidethelines.com%2Fwp-content%2Fuploads%2F2019%2F07%2Fstephen-meyers-rLBewYnoi6I-unsplash.jpg&q=0&b=1&p=0&a=0"
                                alt="profile picture"
                            /></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                              spacing={0}


                        >
                            <Grid item xs={12}>
                                <Typography variant="h6" align={'left'}>
                                    {chatRoom.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="text.secondary" align={'left'}>
                                    Last Message: ...
                                </Typography>
                            </Grid>
                            {/*<Grid item >*/}
                            {/*    <Typography variant="body2" color="text.secondary" component="div">*/}
                            {/*        {chatRoom.description}*/}
                            {/*    </Typography>*/}
                            {/*</Grid>*/}

                        </Grid>

                    </Grid>
                    <Grid item xs={2}>{isOwner &&
                        <Button onClick={handleClickOpen}>
                            <EditIcon/>
                        </Button>
                    }</Grid>

                </Grid>
            </ButtonBase>
        </>

    );
}

