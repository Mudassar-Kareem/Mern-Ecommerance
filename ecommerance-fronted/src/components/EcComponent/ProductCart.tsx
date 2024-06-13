import { FaPlus } from "react-icons/fa";
import { server } from "../../redux/store";
import { orderItems } from "../../types/types";

interface ProductCartProps {
  name: string,
  photo:string,
  quantity:number,
  price:number,
  productId:string,
  stock:number
  handler: (orderItems: orderItems) => string | undefined;
}

const ProductCart = ({
  productId,
  name,
  photo,
  price,
  stock,
  handler,
  
}: ProductCartProps) => {
  return (
    <div className="productcard">
      <img src={` ${server}/${photo}`} alt="" />
      <p>{name}</p>
      <span>PKR{price}</span>
      <div>
        <button onClick={()=> handler({ productId,
  name,
  photo,
  price,
  stock,quantity: 1})}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
