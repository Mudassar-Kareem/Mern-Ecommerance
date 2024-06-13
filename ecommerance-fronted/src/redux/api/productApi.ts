import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CatigoryiesResponse,  ResponseMessage,  SearchProductRequest,  SearchProductResponse,  deatailResponse,  deleteProduct,  newProductRequest,  productResponse, updateProduct } from "../../types/apitypes";



export const productApi =createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl : "http://localhost:4000/api/v1/product/"}),
    endpoints : (builder) =>({
        latestProduct : builder.query<productResponse, string>({
            query : () => "latest"
        }),
        allProduct : builder.query<productResponse, string>({
            query : (id) => `admin-product?id=${id}`
        }),
        categories: builder.query<CatigoryiesResponse,string>({
            query: () => "category",
        }),
        searchproduct: builder.query <SearchProductResponse,SearchProductRequest>({
            query: ({page,price,search,sort,category}) => {
                let base = `all?search=${search}&page=${page}`;
                if(price) base+= `&price=${price}`
                if(sort) base += `&sort=${price}`
                if(category) base += `&category=${category}`
                return base; 
            },
        }),
        newProduct : builder.mutation<ResponseMessage, newProductRequest >({
            query : ({formData,id}) => ({
                url: `new?id=${id}`,
                method: "POST",
                body: formData
            })
        }),
        productDetail: builder.query<deatailResponse,string>({
            query: (id) => id,
        }),
        productUpdate : builder.mutation<ResponseMessage,updateProduct>({
            query: ({formData,userId,productId})=>({
                url: `${productId}?id=${userId}`,
                method: "PUT",
                body: formData
            })
        }),
        productDelete : builder.mutation<ResponseMessage,deleteProduct>({
            query: ({userId,productId})=>({
                url: `${productId}?id=${userId}`,
                method: "DELETE",
            })
        }),
      
    })

})

export const {useLatestProductQuery, useAllProductQuery, useCategoriesQuery, useSearchproductQuery, useNewProductMutation,useProductDetailQuery,useProductUpdateMutation, useProductDeleteMutation} = productApi