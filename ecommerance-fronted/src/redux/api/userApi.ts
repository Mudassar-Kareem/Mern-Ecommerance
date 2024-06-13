import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseMessage, userMessage } from "../../types/apitypes";
import { User } from "../../types/types";
import axios from "axios";

export const userApi = createApi ({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl : "http://localhost:4000/api/v1/user/"}),
    endpoints : (builder) =>({
        login: builder.mutation<ResponseMessage, User>({
            query: (user) =>({
                url: "new",
                method: "POST",
                body: user
            })
        })
    })
})
export const getUser = async (id: string)  =>{
    try {
        const {data} : {data : userMessage} = await axios.get(`http://localhost:4000/api/v1/user/${id}`);
        return data;
    } catch (error) {
        throw error;
        
    }
}
export const {useLoginMutation} = userApi