interface UserInterface {
    id: number;
    username: string;
    firstname: string;
    surname: string;
    email: string;
    dateJoined: Date;
    lastLogin: Date;
    isActive: boolean;
    profilePicture: string;
}

export default UserInterface;