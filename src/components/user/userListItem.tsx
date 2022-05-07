import UserInterface from "../../api/user/userInterface";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ButtonBase} from "@mui/material";


interface UserListItemProps {
    user: UserInterface;
    selectedUser: number | undefined;
    setSelectedUser: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function UserListItem({user, selectedUser, setSelectedUser}: UserListItemProps) {
    const handleClick = () => {
        setSelectedUser(user.id);
    };
    const styles = {
        width: "100%", opacity: 0.75, transition: "opacity 0.5s"
    };
    if (selectedUser && selectedUser === user.id) {
        styles.opacity = 1;
    }
    return (
        <ButtonBase sx={styles} onClick={handleClick}>

            <Card sx={{display: 'flex', width: "100%"}}>

                <CardMedia
                    component="img"
                    sx={{width: 151}}
                    image="https://s2.qwant.com/thumbr/0x380/f/0/cfad668057d86db15d1d4694dcbf54204360433eee33986147295c7f768556/stephen-meyers-rLBewYnoi6I-unsplash.jpg?u=http%3A%2F%2Fagingoutsidethelines.com%2Fwp-content%2Fuploads%2F2019%2F07%2Fstephen-meyers-rLBewYnoi6I-unsplash.jpg&q=0&b=1&p=0&a=0"
                    alt="profile picture"
                />
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h5">
                            {user.username}
                        </Typography>
                        {/*<Typography variant="subtitle1" color="text.secondary" component="div">*/}
                        {/*    Last Message: ...*/}
                        {/*</Typography>*/}
                    </CardContent>
                </Box>

            </Card>
        </ButtonBase>

    );
}

