import React, {useState} from 'react';
import {useQuery} from "react-query";
import {getUsers} from "../../api/user/user";
import UserInterface from '../../api/user/userInterface';
import UserListItem from "./userListItem";
import {Container} from "react-bootstrap";


const UserList = () => {
    let {data, isLoading,} = useQuery('users', getUsers, {
        refetchInterval: 1000,
    });
    let users = data?.data as UserInterface[] | undefined;
    const [selectedUser, setSelectedUser] = useState(users?.[0]);
    return (
        <div>
            {isLoading ? <div>Loading...</div> :
                <Container fluid className='g-0'>
                    {users?.map(user => (
                        <UserListItem user={user}
                                      key={user.id}
                                      selectedUser={selectedUser}
                                      setSelectedUser={setSelectedUser}
                        />

                    ))}
                    {/*<div>{selectedUser?.name}</div>*/}
                </Container>

            }
        </div>
    );
};

export default UserList;
