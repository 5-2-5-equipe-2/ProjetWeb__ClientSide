import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ButtonBase} from "@mui/material";
import ChatRoomInterface from "../../api/ChatRoom/ChatRoomInterface";


interface ChatRoomListItemProps {
    chatRoom: ChatRoomInterface;
    selectedChatRoom: number | undefined;
    setSelectedChatRoom: (chatRoomId: number) => void;
}

export default function ChatRoomListItem({chatRoom, selectedChatRoom, setSelectedChatRoom}: ChatRoomListItemProps) {
    const handleClick = () => {
        setSelectedChatRoom(chatRoom.id);
    };
    const styles = {
        width: "100%", opacity: 0.75, transition: "opacity 0.5s"
    };
    if (selectedChatRoom && selectedChatRoom === chatRoom.id) {
        styles.opacity = 1;
    }
    return (
        <ButtonBase sx={styles} onClick={handleClick}>

            <Card sx={{display: 'flex', width: "100%"}}>

                <CardMedia
                    component="img"
                    sx={{width: "24%"}}
                    image="https://s2.qwant.com/thumbr/0x380/f/0/cfad668057d86db15d1d4694dcbf54204360433eee33986147295c7f768556/stephen-meyers-rLBewYnoi6I-unsplash.jpg?u=http%3A%2F%2Fagingoutsidethelines.com%2Fwp-content%2Fuploads%2F2019%2F07%2Fstephen-meyers-rLBewYnoi6I-unsplash.jpg&q=0&b=1&p=0&a=0"
                    alt="profile picture"
                />
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h6">
                            {chatRoom.name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Last Message: ...
                        </Typography>
                    </CardContent>
                </Box>

            </Card>
        </ButtonBase>

    );
}

