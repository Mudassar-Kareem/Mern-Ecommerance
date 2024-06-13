import { User, orderItems, shippingInfo } from "./types";

export type reducerinitialstate = {
    user: User |null,
    loading: boolean
}

export type cartinitialstate = {
    loading: boolean,
    orderItems: orderItems[],
    subtotal:number,
    tax:number,
    shippingCharges:number,
    discount: number,
    total:number,
    status:string,
    shippingInfo: shippingInfo
};

