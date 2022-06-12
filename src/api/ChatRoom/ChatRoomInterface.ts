interface ChatRoomInterface {
    id: number;
    name: string;
    description: string;
    is_private: number;
    created_at?: Date;
    owner_id: Number;
    profile_picture?: string;
}

export interface ChatRoomUpdateInterface {
    chatRoomId: number;
    name: string;
    description: string;
    isPrivate: number;
    profile_picture?: string;
    ownerId: Number;
}

export interface ChatRoomCreateInterface {
    name: string;
    description: string;
    isPrivate: number;
    profile_picture: string;
    ownerId: Number;
}


export interface ChatRoomUserUpdateInterface {
    chatRoomId: number;
    usersId: number[];
}

export default ChatRoomInterface;