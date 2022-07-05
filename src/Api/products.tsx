import { ProductType } from "../Types/ProductsType";
import instance from "./instance";
 

export const listProducts = () => {
    const url = `products`
    return instance.get(url)
}

export const readProducts = (id: any) => {
    const url = `products/${id}`
    return instance.get(url)
}

export const removeProducts = (id: any) => {
    const url = `products/${id}`
    return instance.delete(url)
}

export const addProducts = (products : ProductType) => {
    const url = `products`
    return instance.post(url, products)
}

export const updateProducts = (products: ProductType) => {
    const url = `products/${products._id}`
    return instance.put(url, products)
}

export const NamePro = (keyword : any) =>{
    const url=`/products?name=${keyword}`;
    return instance.get(url)
};
export const productCate = (id : any) =>{
    const url=`/products/ct=${id}`;
    return instance.get(url)
};

export const likeNamePro = (keyword : any) =>{
    const url=`/products?name=${keyword}`;
    return instance.get(url)
};
