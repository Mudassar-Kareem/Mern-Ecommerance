import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../../redux/store";
import { orderItems } from "../../types/types";


interface CartItemProps {
    cartItems:any
    incrementHandler: (orderItems: orderItems) => void;
  decrementHandler: (orderItems: orderItems) => void;
  removeHandler: (id: string) => void;
    
}


const CartItem = ({cartItems,incrementHandler,decrementHandler,removeHandler}:CartItemProps) => {
    const {photo,productId,name,price,quantity} = cartItems;
  return (
    <div className="cartitem">
        <img src={`${server}/${photo}`} alt="" />
        <article>
            <Link to={`/product/${productId}`}> {name} </Link>
            <span> {price} </span>
        </article>
        <div>
            <button onClick={() => incrementHandler(cartItems)}>+</button>
             <p> {quantity} </p>
             <button onClick={() => decrementHandler(cartItems)}> - </button>
        </div>
        <button onClick={() =>removeHandler(productId)}> <FaTrash/> </button>
    </div>
  )
}

export default CartItem