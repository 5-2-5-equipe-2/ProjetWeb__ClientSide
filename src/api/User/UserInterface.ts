interface UserInterface {
    id: number;
    username: string;
    first_name: string;
    surname: string;
    email: string;
    date_joined?: Date;
    last_login?: Date;
    is_superuser?: boolean;
    profile_picture?: string;
    pixel_placed?: number;
    next_time_pixel?: Date;
}

export interface UserUpdateInterface {
    id: number;
    username: string;
    firstname?: string;
    surname?: string;
    email?: string;
    profilePicture?: string;
}

export interface UserCreateInterface {
    username: string;
    first_name: string;
    surname: string;
    email: string;
    password: string;
}


export interface UserPasswordUpdateInterface {
    old_password: string;
    new_password: string;
}


export default UserInterface;