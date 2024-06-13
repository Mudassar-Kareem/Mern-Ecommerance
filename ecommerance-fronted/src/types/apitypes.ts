import { Order, Product, User, orderItems, shippingInfo } from "./types";

export type ResponseMessage = {
    success: boolean;
    message: string;
};

export type userMessage = {
    success: boolean;
    user: User;
};

export type productResponse = {
    success: boolean;
    product: Product[];
};
export type deatailResponse = {
    success: boolean;
    product: Product;
};

export type CatigoryiesResponse = {
    success: boolean;
    catogories: string[] ;
}

export type updateProduct={
    formData : FormData,
    userId:string,
    productId: string
}

export type deleteProduct={
    userId:string,
    productId: string
}

export type Customerror = {
    status:number,
    data:{
        success: boolean,
        message: string
    }
}

export type SearchProductResponse = productResponse & {
    totalpage: number
} ;
export type SearchProductRequest={
    price: number,
    page:number,
    category:string,
    sort:string,
    search:string
}

export type newProductRequest = {
    id: string,
    formData : FormData,
}

export type newOrderRequest={
    orderItems: orderItems[],
    subtotal:number,
    tax:number,
    shippingCharges:number,
    discount: number,
    total:number,
    status:string,
    shippingInfo: shippingInfo,
    user:string,
}
export type updateOrderresponse = {
    userId:string, orderId: string
}

export type allOrderResponse = {
    success: boolean;
    orders: Order[];
};
export type singleOrderResponse = {
    success: boolean;
    orders: Order;
};