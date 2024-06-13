import { BrowserRouter, Route,Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Loader";
import Cart from "./pages/EcPages/Cart";
import Search from "./pages/EcPages/Search";
import Header from "./components/EcComponent/Header";
import Order from "./pages/EcPages/Order";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userApi";
import { reducerinitialstate } from "./types/reducertypes";
import ProtectedRoute from "./components/EcComponent/protect-route";
const Login = lazy(()=>import("./pages/EcPages/Login") )
const Shipping = lazy (()=> import("./pages/EcPages/Shipping"))
const Home = lazy(()=>import("./pages/EcPages/Home"))
const StopWatch = lazy(()=>import("./pages/app/StopWatch"))
const Coupen = lazy(()=>import("./pages/app/Coupen"))
const Toss= lazy(()=>import("./pages/app/Toss"))
const LineChart  = lazy(()=>import("./pages/chart/LineChart"))
const Pie = lazy(()=>import("./pages/chart/Pie"))
const Bar = lazy(()=>import("./pages/chart/Bar"))
const NewProduct = lazy(()=>import("./pages/managment/NewProduct"));
const ProductM = lazy(()=>import("./pages/managment/ProductM"));
const TranscationM = lazy(()=>import("./pages/managment/TranscationM"))
const Dashboard =lazy(()=>import("./pages/Dashboard")) ;
const Product =lazy(()=>import("./pages/Product")) ;
const Transcation =lazy(()=>import("./pages/Transcation")) ;
const Customers =lazy(()=>import("./pages/Customers")) ;

// {WEBSITE ROUTE}

const App = () => {
  const {user,loading} = useSelector((state: {userReducer : reducerinitialstate})=> state.userReducer )
  const dispatch = useDispatch()
  useEffect(()=>{
    onAuthStateChanged(auth, async(user) => {
      if(user) {
        const data = await getUser(user.uid)
        dispatch(userExist(data.user))
        console.log("user login")
      } else dispatch(userNotExist())
    })
  })
  return loading ? <Loader/> : (
    <BrowserRouter>
    <Header user={user}/>
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/search" element={<Search/>}/>

      <Route element ={ <ProtectedRoute isAuthenticated={user ? true : false}/> } >
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path="/orders" element={<Order/>}/>
      </Route>
      <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
      

 <Route element ={ <ProtectedRoute isAuthenticated={true} admin={user?.role === "admin" ? true : false} adminOnly={true} /> }>
{/* {Admin} */}
      <Route path="/admin/dashboard" element={<Dashboard/>}/>
      <Route path="/admin/product" element={<Product/>}/>
      <Route path="/admin/transcation" element={<Transcation/>}/>
      <Route path="/admin/customer" element={<Customers/>}/>
        {/* {Chart} */}
      <Route path="/admin/chart/bar" element={<Bar/>}/>
      <Route path="/admin/chart/pie" element={<Pie/>}/>
      <Route path="/admin/chart/line" element={<LineChart/>}/>
       {/* {Apps} */}
       <Route path="/admin/app/stopwatch" element={<StopWatch/>}/>
       <Route path="/admin/app/coupon" element={<Coupen/>}/>
       <Route path="/admin/app/toss" element={<Toss/>}/>

      {/* {Managment} */}
      <Route path="/admin/product/new" element={<NewProduct/>}/>
      <Route path="/admin/product/:id" element={<ProductM/>}/>
      <Route path="/admin/transcation/:id" element={<TranscationM/>}/>

  </Route>
    </Routes>
    </Suspense>
    <Toaster  position="bottom-center"/> 
    </BrowserRouter>
  )
}

export default App