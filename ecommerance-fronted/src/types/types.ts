export type User ={
    name: string,
    email: string,
    photo: string,
    gender: string,
    role: string,
    dob: string,
    _id:string
}

export type Product = {
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
    _id: string;
  };
  export type shippingInfo ={
    address: string,
    city: string,
    state: string,
    country: string,
    pinCode: string
};

export type orderItems={
    name: string,
    photo:string,
    quantity:number,
    price:number,
    productId:string,
    stock:number
}

export type cartItem = Omit<orderItems,"stock"> &{_id: string}

export type Order = {
    ordersItems: cartItem[],
    subtotal:number,
    tax:number,
    shippingCharges:number,
    discount: number,
    total:number,
    status:string,
    shippingInfo: shippingInfo,
    _id: string
}