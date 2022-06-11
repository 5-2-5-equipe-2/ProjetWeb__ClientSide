interface ChatRoomInterface {
    id: number;
    name: string;
    description: string;
    is_private: boolean;
    created_at?: Date;
    owner_id: Number;
    image?: string;
}

export interface ChatRoomUpdateInterface {
    id: number;
    name: string;
    description: string;
    is_private: boolean;
    image?: string;
    owner_id: Number;
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
    userId: number[];
}

export default ChatRoomInterface;