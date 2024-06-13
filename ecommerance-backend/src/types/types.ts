import { NextFunction, Request, Response } from "express"

export interface newUserRequest {
  name: string;
  email: string;
  photo: string;
  gender: string;
  _id: string;
  dob: Date;
}

export interface newProductRequest {
  name: string;
  category: string;
  price: number;
  stock: number;
  photo: string;
}
export interface BaseQuerry {
  name?:{
    $regex:string;
    $options:string
  },
  price?:{$lte:number}, 
  category?:string
}
export type searchQuery ={
  search?:string, price?:number, category?:string, sort?:string,page?:number
}

export type orderItemsType={
  name:string, photo:string, quantity:number,price:number,productId:string
}

export type shippingInfoType={
  address:string, city:string, state:string,country:string,pinCode:number
}

export interface newOrderRequest {
  shippingInfo:shippingInfoType,
  user:string,
  subtotal:number,
  tax:number,
  shippingCharges:number,
  discount:number,
  total:number,
  orderItems:orderItemsType[]
}

export type InvalidateCacheProps = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
  id?: string;
  user?: string;
  productId?: string | string[];
};

export type controller = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>

