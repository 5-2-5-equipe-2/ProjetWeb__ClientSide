import UserInterface from "../../api/user/userInterface";

import React from 'react';
import {Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../media/css/userListItem.css';

interface UserListItemProps {
    user: UserInterface;
    selectedUser: UserInterface | undefined;
    setSelectedUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>;
}

const UserListItem = ({user, selectedUser, setSelectedUser}: UserListItemProps) => {
    const handleClick = () => {
        setSelectedUser(user);
    };
    const isSelected = selectedUser && selectedUser.id === user.id;
    // return (
    //     <Card role={"button"} aria-pressed={'false'} color={'grey'} onClick={handleClick} className={isSelected ? 'selected' : ''}>
    //         <Card.Body>
    //             <Card.Title>{user.username}</Card.Title>
    //             <Card.Text>{user.email}</Card.Text>
    //         </Card.Body>
    //     </Card>
    // );
    return (
        <Card style={{width: '30rem'}} role={"button"} aria-pressed={'false'} color={'grey'} onClick={handleClick}
              className={isSelected ? 'CustomSelected mb-1' : 'mb-1'}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src="https://s2.qwant.com/thumbr/0x380/f/0/cfad668057d86db15d1d4694dcbf54204360433eee33986147295c7f768556/stephen-meyers-rLBewYnoi6I-unsplash.jpg?u=http%3A%2F%2Fagingoutsidethelines.com%2Fwp-content%2Fuploads%2F2019%2F07%2Fstephen-meyers-rLBewYnoi6I-unsplash.jpg&q=0&b=1&p=0&a=0"
                        className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{user.username}</h5>
                        {/*<p className="card-text">This is a wider card with supporting text below as a natural lead-in to*/}
                        {/*    additional content. This content is a little bit longer.</p>*/}
                        {/*<p className="card-text"><small className="text-muted">Last Message: ...</small></p>*/}
                    </div>
                </div>
            </div>
        </Card>
    )
};

export default UserListItem;
