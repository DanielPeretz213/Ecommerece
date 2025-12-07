export interface user {
    id:string
    name:string,
    password:string,
    email:string,
    conected:boolean,
    cart: cartItem[],
    
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface cartItem{
  id: string,
  name: string,
  price: string,
  image: string,
  quantity: number,
}