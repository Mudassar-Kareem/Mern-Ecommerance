import { NextFunction,Request,Response } from "express"
import Errorhandler from "../utils/utility-class.js"
import { controller } from "../types/types.js"


export const errorMiddleware=((err:Errorhandler, req:Request,res:Response, next:NextFunction)=>{
    err.message ||= ""
    err.statusCode ||= 500
    if(err.name === "CastError") err.message= "saly ID galat likh raha ha"
    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
})

export const TryCatch = (func:controller) => (req:Request, res:Response, next:NextFunction) => {
    return Promise.resolve(func(req,res,next)).catch(next)
}