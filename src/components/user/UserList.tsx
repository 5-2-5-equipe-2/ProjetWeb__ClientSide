import React, {useState} from 'react';
import {useQuery} from "react-query";
import {getUsers} from "../../api/user/user";
import UserInterface from '../../api/user/userInterface';
import UserListItem from "./userListItem";
import {Box, CircularProgress, List} from "@mui/material";


const UserList = () => {
    let {data, isLoading,} = useQuery('users', getUsers, {
        refetchInterval: 1000,
    });
    console.log(data);
    let users = data?.data as UserInterface[] | undefined;
    const [selectedUserId, setSelectedUserId] = useState(users?.[0].id);
    return (
        <Box sx={{width: "100%"}}>
            {isLoading &&
                <CircularProgress/>
            }
            <List
                component="nav"
                aria-label="User List"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                }}

            >
                {users?.map(user => (
                    <UserListItem user={user}
                                  key={user.id}
                                  selectedUser={selectedUserId}
                                  setSelectedUser={setSelectedUserId}
                    />
                ))}
            </List>
        </Box>


    );
};

export default UserList;
