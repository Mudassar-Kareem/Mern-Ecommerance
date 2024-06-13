
import AdminSlidebar from "../../components/AdminSlidebar"
import { OrderItemType} from "../../types"
import { Link, useParams } from "react-router-dom";
import { Order } from "../../types/types";
import { reducerinitialstate } from "../../types/reducertypes";
import { useSelector } from "react-redux";
import { useSingleOrderQuery } from "../../redux/api/orderApi";
import { server } from "../../redux/store";
const DefultData: Order={
  shippingInfo: {
    address: "",
    city: "",
    country:"",
    state:"",
    pinCode: ""
  },
  shippingCharges:0,
  subtotal:0,
  total:0,
  tax:0,
  status:"",
  discount:0,
  ordersItems: [],
  _id: ""
}

const TranscationM = () => {
  const {user} = useSelector((state : { userReducer : reducerinitialstate})=>(state.userReducer ))
  const parms = useParams()
  const {data,isError,error} = useSingleOrderQuery(parms.id!);
  const {
    
      shippingInfo: { address, city, state, country, pinCode },
      ordersItems,
      status,
      tax,
      subtotal,
      total,
      discount,
      shippingCharges,
    
  } = data?.orders || DefultData
  
  // const [order,setOrder] = useState<OrderType>()
  
  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main className="pcontainer">
      <section >
        <h2>order Items</h2>
     {ordersItems.map((i)=>(
      <ProductCard
      key={i._id}
      name={i.name}
      photo={`${server}/${i.photo}`}
      price={i.price}
      quantity={i.quantity}
      _id={i._id}

      
      />
     ))}
      </section>
      <article className="shipping-info-card ">
        <h2>Order Info</h2>
        <h5>User Info</h5>
        <p>Name:</p> 
          <p>
            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>

          <h5>Amount Info</h5>
          <p>Subtotal: {subtotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info</h5>
          <p>
            <span className={ status === "Delivered" ? "purple" : status === "Processing" ? "green" : "red"}> {status} </span>
          </p>
          <button >Process Status</button>
      </article>
    </main>
    </div>
  )
}
const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span>
      ${price} X {quantity} = ${price * quantity}
    </span>
  </div>
);
export default TranscationM