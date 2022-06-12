interface MessageInterface {
    id: number;
    content: string;
    sent_date: Date;
    chat_room_id: number;
    user_id: number;

}

export default MessageInterface;

