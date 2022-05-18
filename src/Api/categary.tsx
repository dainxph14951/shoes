import { CategoryType } from "../Types/CategoryType";
import instance from "./instance";

export const listCate = () => {
    const url = `categorys`
    return instance.get(url)
}
export const readCate = (id: any) => {
    const url = `categorys/${id}`
    return instance.get(url)
}
export const removeCate = (id : any) => {
    const url = `categorys/${id}`
    return instance.delete(url)
}
export const addCate = (category : CategoryType) => {
    const url = `categorys`
    return instance.post(url, category)
}

export const updateCate = (category: CategoryType) => {
    const url = `categorys/${category._id}`
    return instance.put(url, category)
}