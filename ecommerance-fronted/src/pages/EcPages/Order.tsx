import { ReactElement, useCallback, useEffect, useState } from "react";
import TableHOC from "../../components/TableHOC"
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { reducerinitialstate } from "../../types/reducertypes";
import { useSelector } from "react-redux";
import { useMyOrderQuery } from "../../redux/api/orderApi";
import { Customerror } from "../../types/apitypes";
import toast from "react-hot-toast";
interface DataType{id:string;quantity:number; discount : number; status: ReactElement;action: ReactElement}
const column:Column<DataType>[] =[
    {
        Header:"ID", accessor:"id"
    },
    {
        Header:"Quantity", accessor:"quantity"
    },
    {
        Header:"Discount", accessor:"discount"
    },
    {
        Header:"Status", accessor:"status"
    },
    {
        Header:"Action", accessor:"action"
    },
]

const Order = () => {
    const [row, setRow] =useState<DataType[]>([]);
    const {user} = useSelector((state : { userReducer : reducerinitialstate})=>(state.userReducer ))
    const {data,isError,error,isLoading} =useMyOrderQuery(user?._id!)
    if(isError){
        toast.error((error as Customerror).data.message)
    }
    useEffect(()=>{
        if(data)
            setRow(
        data.orders.map((i)=>({
            id: i._id,
            quantity: i.ordersItems.length,
            discount: i.discount,
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
              action:  <Link to={`/admin/transaction/${i._id}`}>View</Link>,

        }))
        
            )
    })
    const Table = useCallback(TableHOC<DataType>(column,row,"Orders", "ordertable",row.length > 6),[])
  return (
    <div className="container">
        <h1>My Orders</h1>
        {Table()}
    </div>
  )
}

export default Order