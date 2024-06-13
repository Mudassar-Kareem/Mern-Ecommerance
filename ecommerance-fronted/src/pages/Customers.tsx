import { ReactElement, useCallback, useState } from "react"
import AdminSlidebar from "../components/AdminSlidebar"
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import { FaTrash } from "react-icons/fa";

interface DataType{role:string;action:ReactElement;avatar:ReactElement;name:string;gender:string; email:string;}
const columns:Column<DataType>[] =[
  {
    Header:"Avatar", accessor:"avatar",
  },
  {
    Header:"Name", accessor:"name",
  },
  {
    Header:"Gender", accessor:"gender",
  },
  {
    Header:"Email", accessor:"email",
  },
  {
    Header:"Role", accessor:"role",
  },
  {
    Header:"Action", accessor:"action",
  }
];
const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";
const arr:DataType[] = [
  {
    avatar: <img style={{borderRadius:"50%"}} src={img} alt="user"/>,
    name: "Emily Plamer",
    gender: "Female",
    email:"plamer@gmail.com",
    role:"User",
    action: ( <button style={{color:"red", outline:"none", border:"none", fontSize:"1.2rem", backgroundColor:"transparent"}}> <FaTrash/> </button>)
  },
  {
    avatar: <img style={{borderRadius:"50%"}} src={img2} alt="user"/>,
    name: "May Scoot",
    gender: "Female",
    email:"may@gmail.com",
    role:"User",
    action:  ( <button style={{color:"red", outline:"none", border:"none", fontSize:"1.2rem", backgroundColor:"transparent"}}> <FaTrash/> </button>)
  }
]
const Customers = () => {
   const [data]= useState<DataType[]>(arr);
    const Table = useCallback(TableHOC<DataType>(columns,data,"Customers", "customerstable", true),[])
  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main>
      {Table()}
    </main>
    </div>
  )
}

export default Customers