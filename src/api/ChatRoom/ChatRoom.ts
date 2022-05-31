import api from "../base";
import ChatRoomInterface from "./ChatRoomInterface";
import {AxiosResponse} from "axios";
import UserInterface from "../User/UserInterface";


export const getChatRooms = () => api.get("/chatroom/list");
export const getChatRoomById = (id: number) => api.get(`/chatroom/get?id=${id}`);
// export const createChatRoom = (chatRoom: ChatRoomInterface) => api.post("/chat_room/create", chatRoom);
// export const updateChatRoom = (chatRoom: ChatRoomInterface) => api.put(`/chat_room/update/?id=${chatRoom.id}`, chatRoom);
// export const deleteChatRoom = (id: number) => api.delete(`/chat_room/delete/?id=${id}`);
// export const getChatRoomByName = (name: string) => api.get(`/chat_room/getByName/?name=${name}`);
export const getChatRoomByUserId = (userId: number) => api.get(`/chat_room/getByUserId/?userId=${userId}`);
// export const getChatRoomByUserIdAndName = (userId: number, name: string) => api.get(`/chat_room/getByUserIdAndName/?userId=${userId}&name=${name}`);
export const getChatRoomMessages = (chatRoomId: number) => api.get(`/chatroom/getMessages/?id=${chatRoomId}`);