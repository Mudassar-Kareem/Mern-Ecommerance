import { useState } from "react"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { User } from "../../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

interface propsType{
  user:User | null,
};
// const user = { _id : "" , role: "admin"};
const Header = ({user} : propsType) => {
  const [isOpen,setIsOpen] = useState<boolean>(false);
  const logoutHandler = async () =>{
    try {
      await signOut(auth);
      toast.success("Sign out successfully");
      setIsOpen(false)
    } catch (error) {
      toast.error("Sign out failed")
      
    }
  }
  return (
    <nav className="navbar">
        <Link to="/" onClick={()=>setIsOpen(false)}>Home </Link>
        <Link to="/search" onClick={()=>setIsOpen(false)}> <FaSearch/> </Link>
        <Link to="/cart" onClick={()=>setIsOpen(false)}> <FaShoppingBag/> </Link>
        {user?._id ? ( <>
          <button onClick={()=> setIsOpen((prev) => !prev)}> <FaUser/></button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={()=>setIsOpen(false)} to="/admin/dashboard"> Admin</Link>
              ) }
              <Link onClick={()=>setIsOpen(false)} to="/orders">Orders</Link>
              <button onClick={logoutHandler}> <FaSignOutAlt/> </button>
            </div>
          </dialog>
        </> ): ( <Link to="login"><FaSignInAlt/></Link> )}
    </nav>
  )
}

export default Header