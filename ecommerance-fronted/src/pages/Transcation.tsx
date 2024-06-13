import { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSlidebar from "../components/AdminSlidebar"
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { reducerinitialstate } from "../types/reducertypes";
import { useAllOrderQuery } from "../redux/api/orderApi";
import toast from "react-hot-toast";
import { Customerror } from "../types/apitypes";

interface DataType{user:string; amount:number; discount:number; quantity:number; status: ReactElement; action:ReactElement};
const columns:Column<DataType>[]=[
  {
    Header:"User", accessor:"user"
  },
  {
    Header:"Amount", accessor:"amount"
  },
  {
    Header:"Discount", accessor:"discount"
  },
  {
    Header:"Quantity", accessor:"quantity"
  },
  {
    Header:"Status", accessor:"status"
  },
  {
    Header:"Action", accessor:"action"
  }
];


const Transcation = () => {
  const [row,setRow] =useState<DataType[]>([])
  const {user} = useSelector((state : { userReducer : reducerinitialstate})=>(state.userReducer ))
  const {isError,error,data} = useAllOrderQuery(user?._id!);
  if(isError){
    toast.error((error as Customerror).data.message)
  };
  useEffect(() => {
    if (data)
      setRow(
        data.orders.map((i) => ({
          user:i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.ordersItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transcation/${i._id}`}>Manage</Link>,
        }))
      );
      
  }, [data]);

  const Table = useCallback(TableHOC<DataType>(columns,row,"Transcation","transcationtable", row.length > 6),[])
  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main>
      {Table()}
    </main>
    </div>
  )
}

export default Transcation