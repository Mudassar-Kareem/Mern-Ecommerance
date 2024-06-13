
import { useState } from "react"
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useLoginMutation } from "../../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ResponseMessage } from "../../types/apitypes";




const Login = () => {
    const [gender,setGender] = useState("");
    const [date,setDate]= useState("");
    const [login] = useLoginMutation();
    const loginHandler =async () =>{
        try {
            const provider = new GoogleAuthProvider();
            const {user } = await signInWithPopup(auth, provider);
            console.log ({
                name: user.displayName!,
                email: user.email!,
                photo: user.photoURL!,
                gender,
                role: "user",
                _id:user.uid,
                dob:date,
            })
         const res=   await login({
                name: user.displayName!,
                email: user.email!,
                photo: user.photoURL!,
                gender,
                role: "user",
                _id:user.uid,
                dob:date,
            })
            if("data" in res){
                toast.success(res.data.message);
            }
            else{
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as ResponseMessage).message;
                toast.error(message)
            }
            
            
        } catch (error) {
            toast.error("Sign In failed")
            console.log(error)
        }
    }
  return (
    <div className="login">
    <main>
        <h1 className="heading">Login</h1>
        <div>
            <label > Gender</label>
            <select value={gender} onChange={(e) =>setGender(e.target.value)}>
                <option value="select gender">Select Gender</option>
                <option value="male"> Male</option>
                <option value="female"> Female</option>
            </select>
        </div>
        <div>
           <label > Date of Birth </label>
            <input type="date" value={date}  onChange={(e)=>setDate(e.target.value)}/>
        </div>
        <div>
            <p>Already Sign In once</p>
            <button onClick={loginHandler}> <FcGoogle/> <span> Sign In with Google</span> </button>
        </div>
    </main>
    
    </div>
  )
}

export default Login