import { Product } from "../types/types";

export const fetchListItemAPI = async ():Promise<Product[]> =>{
    const response = await fetch("https://fakestoreapi.com/products?limit=30");

    if(!response.ok){
        throw new Error("server returned an error")
    }

    const conversion:Product[] = await response.json();
    if(!Array.isArray(conversion)){
        throw new Error("invalid data format");
    }
    return conversion;
}