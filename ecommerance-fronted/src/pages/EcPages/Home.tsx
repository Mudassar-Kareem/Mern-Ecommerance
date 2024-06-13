import { Link } from "react-router-dom";
import ProductCart from "../../components/EcComponent/ProductCart";
import { useLatestProductQuery } from "../../redux/api/productApi";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { orderItems } from "../../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducer/cartReducer";

const Home = () => {
  const dispatch = useDispatch()
  const {data,isError,isLoading} = useLatestProductQuery("");
  const addToCardHandler=(orderItems: orderItems)=> {
    if(orderItems.stock < 1) return toast.error("Product out of stock");
    dispatch(addToCart(orderItems))
    if(orderItems.stock >1) return toast.success("Product add to cart")
  
  };
 
  if(isError) toast.error("cannot fetching product")
  return (
    <div className="home">
      <section></section>
      <img src="" alt="" />
      <h1>Latest Product
      <Link to="search" style={{fontSize:"1.2rem"}}>More</Link>
      </h1>
      <main>
        
        
        {isLoading ? <Loader/> :   data?.product.map((i)=>(
          <ProductCart
          key={i._id}
          productId= {i._id}
          name = {i.name}
          price={ i.price}
          stock={i.stock}
          handler={addToCardHandler}
          photo={i.photo}
          />
        ))}
       </main>
    </div>
  )
}

export default Home