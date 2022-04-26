import api from "../base";
import UserInterface from "./userInterface";
export const getUsers = () => api.get("/users/list");
export const getUserById = (id: number) => api.get(`/users/${id}`);
export const createUser = (user: UserInterface) => api.post("/users", user);
export const updateUser = (user: UserInterface) => api.put(`/users/${user.id}`, user);
export const deleteUser = (id: number) => api.delete(`/users/${id}`);
export const getUserByEmail = (email: string) => api.get(`/users/email/${email}`);
export const getUserByUsername = (username: string) => api.get(`/users/username/${username}`);
