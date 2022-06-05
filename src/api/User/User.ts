import api from "../base";
import UserInterface from "./UserInterface";
import {AxiosResponse} from "axios";
import ChatRoomInterface from "../ChatRoom/ChatRoomInterface";


export const getUsers = () => api.get("/user/list");
export const getUserById = (id: number) => api.get<UserInterface>(`/user/get?id=${id}`);
export const createUser = (user: UserInterface) => api.post("/user/createUser", user);
export const updateUser = (user: UserInterface) => api.put(`/user/update/?id=${user.id}`, user);
export const deleteUser = (id: number) => api.delete(`/user/delete/?id=${id}`);
export const getUserByEmail = (email: string) => api.get(`/user/getUserByEmail/?email=${email}`);
export const getUserByUsername = (username: string) => api.get(`/user/getByUsername/?username=${username}`);
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

export const searchUsers = (search:string) => {
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

export const getChatRooms = (id: Number) => api.get<ChatRoomInterface[]>(`/user/getChatRooms?id=${id}`);