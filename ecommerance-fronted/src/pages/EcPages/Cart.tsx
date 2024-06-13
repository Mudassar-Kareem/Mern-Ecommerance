import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import CartItem from "../../components/EcComponent/CartItem";
import { cartinitialstate } from "../../types/reducertypes";
import {  useDispatch, useSelector } from "react-redux";
import { orderItems } from "../../types/types";
import { addToCart, appliedDiscount, calculatePercent, removeToCart } from "../../redux/reducer/cartReducer";
import axios from "axios";
import { server } from "../../redux/store";



const Cart = () => {
  const {shippingCharges,shippingInfo,subtotal,total,tax,discount,orderItems} = useSelector((state: { cartReducer : cartinitialstate})=> state.cartReducer )
  const [coupon , setCoupon] = useState<string>("");
  const [valid,setValid] = useState<boolean>(false);
  const dispatch = useDispatch()
  const incrementHandler = (orderItems: orderItems) =>{
    if (orderItems.quantity >= orderItems.stock) return;
    dispatch(addToCart({... orderItems, quantity: orderItems.quantity + 1}))
  }
  const decrementHandler = (orderItems: orderItems) =>{
    if(orderItems.quantity <= 1) return
    dispatch(addToCart({... orderItems, quantity: orderItems.quantity - 1}))
  }
 const deleteHandler = (productId: string) =>{
  dispatch(removeToCart(productId))
 }
 
  useEffect(()=>{
    const timeoutId = setTimeout(()=>{
      axios.get(`${server}/api/v1/payment/discount?coupon${coupon}`)
      .then((res)=>{
        dispatch(appliedDiscount(res.data.discount))
        setValid(true)
        dispatch(calculatePercent())
      })
      .catch(()=>{
        dispatch(appliedDiscount(0))
        setValid(false)
        dispatch(calculatePercent())
      })
    },1000)
  return()=>{
    clearTimeout(timeoutId);
    setValid(false)
  }
  },[coupon]);
  useEffect(()=>{
    dispatch(calculatePercent())
  }, [orderItems])
  return(
    <div className="cart">
    <main>
     {orderItems.length > 0 ? orderItems.map((i,ind)=>(
      <CartItem key={ind} cartItems={i}  removeHandler={deleteHandler}  incrementHandler={incrementHandler} decrementHandler={decrementHandler}/>
     )): <h1> No Items Added </h1>}
    </main>
    <aside>
      <p> SubTotal : PKR {subtotal} </p>
      <p> Shipping : PKR {shippingCharges} </p>
      <p> Tax : PKR{tax} </p>
      <p> Discount  - <em className="red"> PKR {discount} </em> </p>
      <p> <b> Total : PKR {total} </b> </p>
      <input type="text" placeholder=" Coupon Code" value={coupon}  onChange={(e)=> setCoupon(e.target.value)} />
      {coupon && (valid ? (<span className="green"> PkR {discount} discount using this<code>   {coupon} </code> </span>): (<span className="red"> Invalid Coupon <VscError/></span>))}
      {orderItems.length> 0 && (<Link to="/shipping">CheckOut</Link>)}
    </aside>
    </div>
  )
}

export default Cart