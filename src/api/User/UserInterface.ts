interface UserInterface {
    id: number;
    username: string;
    first_name: string;
    surname: string;
    email: string;
    date_joined: Date;
    last_login: Date;
    is_active: boolean;
    profile_picture: string;
}

export default UserInterface;