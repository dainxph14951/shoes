import { UserType } from "../Types/UserType";
import instance from "./instance";

export const listUser = () => {
    const url = `users` 
    return instance.get(url)
}
export const readUser = (id: any) => {
    const url = `users/${id}` 
    return instance.get(url)
}

export const removeUser = (id: any) => {
    const url = `users/${id}` 
    return instance.delete(url)
}

export const addUser = (users: UserType) => {
    const url = `users` 
    return instance.post(url,users)
}

export const updateUser = (users: UserType) => {
    const url = `users/${users._id}` 
    return instance.put(url,users)
}