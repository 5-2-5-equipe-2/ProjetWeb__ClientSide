import api, {ErrorInterface} from "../base";
import UserInterface, {UserPasswordUpdateInterface, UserUpdateInterface} from "./UserInterface";
import {AxiosResponse} from "axios";
import ChatRoomInterface from "../ChatRoom/ChatRoomInterface";


export const getUsers = () => api.get("/user/list");
export const getUserById = (id: number) => api.get<UserInterface[]>(`/user/get?id=${id}`);
export const createUser = (user: UserInterface) => api.post<ErrorInterface>("/user/createUser", user);
export const updateUser = (user: UserUpdateInterface) => api.put<ErrorInterface>(`/user/update/?id=${user.id}`, user);
export const deleteUser = (id: number) => api.delete<ErrorInterface>(`/user/delete/?id=${id}`);
export const getUserByEmail = (email: string) => api.get(`/user/getUserByEmail/?email=${email}`);
export const getUserByUsername = (username: string) => api.get<UserInterface>(`/user/getByUsername/?username=${username}`);
export const getCurrentlyLoggedInUser = () => {
    // Catch 422 error
    return api.get<UserInterface>("/user/getCurrentlyLoggedInUser").catch((error: AxiosResponse) => {
            if (error.request.status === 422) {
                return null;
            }
            throw error;
        }
    );

}

export const searchUsers = (search: string) => {
    return api.get<UserInterface[]>(`/user/search?search=${search}`);
};

export interface LoginParams {
    username: string;
    password: string;
}

export const login = ({username, password}: LoginParams) => {
    return api.post(`/user/login/`, {
        username,
        password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const logout = () => api.post(`/user/logout`);

export const getChatRooms = (id: number) => api.get<ChatRoomInterface[]>(`/user/getChatRooms?id=${id}`);

export const searchUserChatRooms = (id: number, search: string) => {
    // return api.get<ChatRoomInterface[]>(`/user/searchUserChatRooms?id=${id}&search=${search}`);
    return getChatRooms(id);
}

export const changePassword = ({newPassword}: { newPassword:UserPasswordUpdateInterface }) => {
    return api.put<ErrorInterface>(`/user/updatePass/`, newPassword);
}