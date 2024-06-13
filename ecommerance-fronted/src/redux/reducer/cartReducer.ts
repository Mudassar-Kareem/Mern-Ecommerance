import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartinitialstate } from "../../types/reducertypes";
import { orderItems } from "../../types/types";

const initialState: cartinitialstate = {
    loading: false,
    shippingCharges:0,
    discount:0,
    tax:0,
    total:0,
    subtotal:0,
    orderItems:[],
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
    },
    status: "processing"
}
export const cartReducer =createSlice({
    name: "cartReducer",
    initialState,
    reducers:{
        addToCart: (state,action: PayloadAction<orderItems>) =>{
            state.loading = true;
            const index = state.orderItems.findIndex((i) => i.productId === action.payload.productId)
            if(index !== -1){
                state.orderItems[index]=action.payload
            }
            else state.orderItems.push(action.payload),
            state.loading = false
        },
        removeToCart: (state,action: PayloadAction<string>) =>{
            state.loading = true,
            state.orderItems=   state.orderItems.filter((i)=> i.productId !== action.payload),
            state.loading = false
        },
        calculatePercent : (state) =>{
            const subtotal = state.orderItems.reduce((total,item)=> (total + item.price * item.quantity), 0)
            state.subtotal=subtotal;
            state.shippingCharges= state.subtotal > 1000 ? 200 : 0;
            state.tax = Math.round(state.subtotal * 0.20)
            state.total = state.subtotal + state.shippingCharges + state.tax - state.discount
        },
        appliedDiscount : (state,action: PayloadAction<number>) =>{
            state.loading=true,
            state.discount=action.payload
        }
    }
})

export const {addToCart,removeToCart, calculatePercent,appliedDiscount} = cartReducer.actions