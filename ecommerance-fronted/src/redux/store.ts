import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productApi";
import { orderApi } from "./api/orderApi";
import { cartReducer } from "./reducer/cartReducer";
export const server = "http://localhost:4000"
export const store = configureStore({
    reducer:{
        [userApi.reducerPath]: userApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [userReducer.name]:userReducer.reducer,
        [cartReducer.name]:cartReducer.reducer,
        
    },
    middleware : (mid) => [...mid(),userApi.middleware, productApi.middleware, orderApi.middleware],
    
})