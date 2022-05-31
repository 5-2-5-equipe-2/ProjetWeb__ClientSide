import api from "../base";
import MessageInterface from "./MessageInterface";


export const getMessage = (messageId: Number) => {
    return api.get<MessageInterface>(`/message/getById?id=${messageId}`);
};

export const modifyMessage = (message: MessageInterface) => {
    return api.put<MessageInterface>(`/message/update`, message);
}

export const nullMessage: MessageInterface = {
    id: -1,
    content: "",
    sent_date: new Date(),
    chat_room_id: 0,
    user_id: 0
}