import api from "../base";
import MessageInterface from "./MessageInterface";


export const getMessage = (messageId: Number) => {
    return api.get<MessageInterface>(`/message/getById?id=${messageId}`);
};

export const modifyMessage = (message: MessageInterface) => {
    return api.put<MessageInterface>(`/message/modifyMessage`, message);
}

export interface CreateMessageInterface {
    content: string;
    chatRoomId: number;
    userId: number;
}


export const createMessage = (message: CreateMessageInterface) => {
    message.content = message.content.replace(/\n/g, "\n\n");
    return api.post<CreateMessageInterface>(`/message/createMessage`, message);
}

export const nullMessage: MessageInterface = {
    id: -1,
    content: "",
    sent_date: new Date(),
    chat_room_id: 0,
    user_id: 0
}