import api, {ErrorInterface} from "../base";
import MessageInterface from "../Message/MessageInterface";
import UserInterface from "../User/UserInterface";
import ChatRoomInterface, {
    ChatRoomCreateInterface,
    ChatRoomUpdateInterface,
    ChatRoomUserUpdateInterface
} from "./ChatRoomInterface";


// export const getChatRooms = () => api.get<ChatRoomInterface[]>("/chatroom/list");
// export const getChatRoomById = (id: number) => api.get<ChatRoomInterface>(`/chatroom/get?id=${id}`);
// export const createChatRoom = (chatRoom: ChatRoomInterface) => api.post("/chat_room/create", chatRoom);
export const updateChatRoom = (chatRoom: ChatRoomUpdateInterface) => api.put<ChatRoomInterface>(`/chatroom/updateChatRoom/`, chatRoom);
// export const deleteChatRoom = (id: number) => api.delete(`/chat_room/delete/?id=${id}`);
// export const getChatRoomByName = (name: string) => api.get(`/chat_room/getByName/?name=${name}`);
export const getChatRoomByUserId = (userId: number) => api.get<ChatRoomInterface[]>(`/chatroom/getByUserId/?userId=${userId}`);
// export const getChatRoomByUserIdAndName = (userId: number, name: string) => api.get(`/chat_room/getByUserIdAndName/?userId=${userId}&name=${name}`);
export const getChatRoomMessages = (chatRoomId: number, page = 0) => {
    return api.get<MessageInterface[]>(`/chatroom/getMessages?&chatRoomId=${chatRoomId}&limit=50&offset=${page * 50}`);
};

export const getChatRoomUsers = (chatRoomId: number) => {
    return api.get<UserInterface[]>(`/chatroom/getUsers?chatRoomId=${chatRoomId}`);
}

export interface ChatRoomUrlResponse {
    failed: boolean,
    error: string,
}

export const joinChatRoomByUrl = (chatRoomInviteUrl: string) => {
    return api.get<ChatRoomUrlResponse>(`/chatroom/addUserByUrl/?&${chatRoomInviteUrl}`)
}

export const addUserToChatRoom = ({chatRoomId, userId}:{chatRoomId: number, userId: number}) => {
    return api.put<ChatRoomUrlResponse>(`/chatroom/addUserToChatRoom/`, {chatRoomId, userId})
}

export const searchPublicChatRooms = (search: string) => {
    return api.get<ChatRoomInterface[]>(`/chatroom/searchPublicChatRoom/?&query=${search}`)
}

export const leaveChatRoom = ({chatRoomId, userId}: { chatRoomId: number, userId: number }) => {
    return api.put<ChatRoomUrlResponse>(`/chatroom/deleteUserFromChatRoom`, {chatRoomId, userId})
}

export const createChatRoom = (chatRoom: ChatRoomCreateInterface) => {
    return api.post<ErrorInterface>(`/chatroom/createChatRoom`, chatRoom)
}

export const updateChatRoomUsers = ({data}: { data: ChatRoomUserUpdateInterface }) => {
    return api.put<ErrorInterface>(`/chatroom/updateUsers`, data)
}