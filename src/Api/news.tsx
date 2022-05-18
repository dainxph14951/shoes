import { NewType } from "../Types/newType";
import instance from "./instance";

export const listNews = () => {
    const url = `news`
    return instance.get(url)
}
export const readNews = (id: any) => {
    const url = `news/${id}`
    return instance.get(url)
}
export const removeNews = (id: any) => {
    const url = `news/${id}`
    return instance.delete(url)
}
export const addNews = (news : NewType) => {
    const url = `news`
    return instance.post(url, news)
}
export const updateNews = (news : NewType) => {
    const url = `news`
    return instance.put(url, news)
}