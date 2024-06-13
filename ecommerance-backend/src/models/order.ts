import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:[true,"plz enter address"]
        },
        city:{
            type:String,
            required:[true,"plz enter city"]
        },
        state:{
            type:String,
            required:[true,"plz enter state"]
        },
        country:{
            type:String,
            required:[true,"plz enter country "]
        },
        pinCode:{
            type:Number,
            required:[true,"plz enter pincode"]
        },
    },
    user: {
        type: String,
        ref: "User",
        required: true,
      },
    subtotal:{
        type:Number, required:true
    },
    tax:{
        type:Number, required:true
    },
    shippingCharges:{
        type:Number, required:true
    },
    discount:{
        type:Number, required:true
    },
    total:{
        type:Number, required:true
    },
    status:{
        type:String, enum:["processing", "shipping", "deliverd"], default:"processing"
    },
    orderItems:[{
        name:String,
        photo:String,
        quantity:Number,
        price:Number,
        productId:{
            type: mongoose.Types.ObjectId,
            rfc:"Product"
        }
    }]
},{timestamps:true})

export const Order =mongoose.model("Order", orderSchema)