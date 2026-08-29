import axios from "axios";

const api = axios.create({
    baseURL: "https://dummyjson.com",
})

export const getCategories = async() => {
    const response = await api.get("/products/categories")
    return response.data 
}

export const getProducts = async(skip) => {
    const response = await api.get(`/products?limit=10&skip=${skip}`);
    return response.data;
}

export const getProduct = async(id) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
}

export const getCategory = async(slug) => {
    const response = await api.get(`/products/category/${slug}`);
    return response.data;
}

