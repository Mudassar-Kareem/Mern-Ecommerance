import mongoose from "mongoose";
import { InvalidateCacheProps, orderItemsType } from "../types/types.js";
import { products } from "../models/product.js";
import { nodeCache } from "../app.js";
export const connectDB = (uri:string) => {
    mongoose.connect(uri,{
        dbName: "Ecommerance_24",
    })
    .then((c)=>console.log(`DB Connected to ${c.connection.host}`))
    .catch((e)=>console.log(e))
}


export const reducedStock =async (orderItems:orderItemsType[]) =>{
    for (let index = 0; index < orderItems.length; index++) {
        const order = orderItems[index];
        const product =await products.findById(order.productId)
        if(!product){
            throw new Error("product not found")
        }
        product.stock = order.quantity
        await product.save()
    }
}


export const invalidateCache = ({
    product,
    order,
    admin,
    id,
    user,
    productId,
  }: InvalidateCacheProps) => {
    
    if (order) {
      const ordersKeys: string[] = [
        `all-order`,
        `my-order-${user}`,
        `order-${id}`
      ];
  
      nodeCache.del(ordersKeys);
    }
    
  };


export const percentCalculate  = (thisMonth:number, lastMonth:number)=>{
  if(lastMonth === 0) return thisMonth*100;
  const percent = thisMonth /lastMonth*100;
  return Number(percent.toFixed(0));
}

