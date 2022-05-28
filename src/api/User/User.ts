import api from "../base";
import UserInterface from "./UserInterface";
import {AxiosResponse} from "axios";


export const getUsers = () => api.get<UserInterface[]>("/user/list");
export const getUserById = (id: number) => api.get<UserInterface>(`/user/?id=${id}`);
export const createUser = (user: UserInterface) => api.post("/user/create", user);
export const updateUser = (user: UserInterface) => api.put(`/user/update/?id=${user.id}`, user);
export const deleteUser = (id: number) => api.delete(`/user/delete/?id=${id}`);
export const getUserByEmail = (email: string) => api.get(`/user/getUserByEmail/?email=${email}`);
export const getUserByUsername = (username: string) => api.get(`/user/getByUsername/?username=${username}`);

export interface LoginParams {
    username: string;
    password: string;
}

export const login = ({username, password}: LoginParams) => {
    const apiRequest: Promise<AxiosResponse<any>> = api.post(`/user/login/`, {
        username,
        password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(apiRequest);

    return apiRequest
}

export const logout = () => api.post(`/user/logout`);
