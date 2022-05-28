import UserInterface from "../../api/User/UserInterface";
import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {Avatar, ButtonBase, Grid, Paper, useTheme} from "@mui/material";


interface UserListItemProps {
    user: UserInterface;
    selectedUser: number | undefined;
    setSelectedUser: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function UserListItem({user, selectedUser, setSelectedUser}: UserListItemProps) {
    const handleClick = () => {
        setSelectedUser(user.id);
    };
    const theme = useTheme()


    let backgroundColor = theme.palette.background.paper;
    if (selectedUser && selectedUser === user.id) {
        backgroundColor = theme.palette.common.black;
    }

    return (
        <Paper sx={{backgroundColor: backgroundColor, width: "100%"}}>
            <ButtonBase onClick={handleClick} sx={{width: "100%"}}>
                <Card sx={{
                    width: "100%",
                    height: "13vh",
                    backgroundColor: backgroundColor,
                    transition: "all 250ms ease",

                }}>
                    <Grid container spacing={0}
                          sx={{
                              height: "100%",
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              // alignItems: "center"
                          }}>

                        <Grid item xs={2}>
                            <Grid container
                                  spacing={0}
                                  direction="column"
                                  alignItems="center"
                                  justifyContent="center"
                                  sx={{height: "100%"}}>
                                <Grid item xs={3}>
                                    <Avatar sx={{width: "10vh", height: "10vh"}}
                                            src="data:image/jpeg;base64,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"/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={10}>
                            <Grid container
                                  spacing={0}
                                  direction="column"
                                  alignItems="flex-start"
                                  justifyContent="center"
                                  sx={{height: "100%"}}>
                                <Typography component="div" variant="h5">
                                    {user.username}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    status: ...
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Card>
            </ButtonBase>
        </Paper>

    );
}

