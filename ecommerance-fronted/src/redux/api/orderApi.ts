import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseMessage, allOrderResponse, newOrderRequest, singleOrderResponse, updateOrderresponse } from "../../types/apitypes";


export const orderApi =createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({baseUrl : "http://localhost:4000/api/v1/order/"}),
    endpoints: (builder) =>({
        newOrder : builder.mutation<ResponseMessage,newOrderRequest>({
            query: (order) =>({
                url: "/new",
                method: "POST",
                body: order
            })
        }),
        myOrder:builder.query<allOrderResponse,string>({
            query: (id) =>({ url: `my?id=${id}`})
        }),
        allOrder:builder.query<allOrderResponse,string>({
            query: (id) =>({ url: `all?id=${id}`})
        }),
        SingleOrder:builder.query<singleOrderResponse,string>({
            query: (id) => id,
        }),
        updateOrder : builder.mutation<ResponseMessage,updateOrderresponse>({
            query: ({userId,orderId}) =>({
                url: `${orderId}?id=${userId}`,
                method: "PUT",
            })
        }),
        deleteOrder : builder.mutation<ResponseMessage,updateOrderresponse>({
            query: ({userId,orderId}) =>({
                url: `${orderId}?id=${userId}`,
                method: "DELETE",
            })
        }),
    })
})

export const {useNewOrderMutation, useMyOrderQuery,useSingleOrderQuery,useUpdateOrderMutation,useDeleteOrderMutation,useAllOrderQuery} = orderApi