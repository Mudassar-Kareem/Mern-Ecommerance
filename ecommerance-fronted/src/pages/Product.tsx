import { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSlidebar from "../components/AdminSlidebar"
import TableHOC from "../components/TableHOC"
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAllProductQuery } from "../redux/api/productApi";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { Customerror } from "../types/apitypes";
import { useSelector } from "react-redux";
import { reducerinitialstate } from "../types/reducertypes";

interface DataType {name: string; price:number; stock:number;action:ReactElement;photo:ReactElement};
const columns:Column<DataType>[] = [
  {
    Header:"Photo", accessor:"photo"
  },
  {
    Header:"Name", accessor:"name"
  },
  {
    Header:"Price", accessor:"price"
  },
  {
    Header:"Stock", accessor:"stock"
  },
  {
    Header:"Action", accessor:"action"
  }
];

const Product = () => {
  const {user} = useSelector((state : { userReducer : reducerinitialstate})=>(state.userReducer ))
  const {data,isError,error} = useAllProductQuery(user?._id!)
  const [row,setRow] = useState<DataType[]>([]);
  if(isError){
    toast.error((error as Customerror).data.message)
  }
  useEffect(() => {
    if (data)
      setRow(
        data.product.map((i) => ({
          photo: <img src={`${server}/${i.photo}`} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);
  

  const Table = useCallback(TableHOC<DataType>(columns,row,"Products", "productbox", row.length> 6  ),[]);
  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main>
    {Table()}
    </main>
    <Link to="/admin/product/new" className="createpro"> <FaPlus/> </Link>
    </div>
    
  )
}

export default Product