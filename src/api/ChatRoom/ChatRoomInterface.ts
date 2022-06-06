interface ChatRoomInterface {
    id: number;
    name: string;
    description: string;
    is_private: boolean;
    created_at?: Date;
    owner_id: Number;
    image?: string;
}

export default ChatRoomInterface;