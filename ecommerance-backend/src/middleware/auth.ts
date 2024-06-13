import { User } from "../models/User.js";
import Errorhandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const adminOnly = TryCatch(async(req,res,next)=>{
    const {id} = req.query;
    if(!id){
        return next(new Errorhandler("Bc chutiya login kr phly", 401))
    }
    const user = await User.findById(id);
    if(!user){
        return next(new Errorhandler("Bc Chutiya fake ID deta ha", 401))
    }
    if(user.role !== "admin"){
        return next(new Errorhandler("salee aukat me rahy",401))
    }
    next();
})