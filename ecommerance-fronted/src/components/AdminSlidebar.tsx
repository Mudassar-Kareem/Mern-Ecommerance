
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiFillFileText } from "react-icons/ai";
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { Link, useLocation, Location } from "react-router-dom";
const AdminSlidebar = () => {
  const [show,setShow] = useState<boolean>(false);
  const [active,setActive] =useState<boolean> (window.innerWidth<=1100);
  const resizeHandler = () => {
    setActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  const location = useLocation();
  return (
  <>
  {active && ( <button id="menu" onClick={()=>setShow(true)}> <HiMenuAlt4/> </button> )}
  <aside 
    style={
      active
        ? {
            width: "20rem",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: show ? "0" : "-20rem",
            transition: "all 0.5s",
          }
        : {}
    }
  >
    <h2>logo.</h2>
    <DivOne location={location}/>
    <DivTwo location={location}/>
    <DivThree location={location}/>
    <button id="close-sidebar" onClick={() => setShow(false)}>
            Close
    </button>
  </aside>
  </>
  
  )
};

const DivOne = ({location} : {location:Location}) =>(
  <div>
      <h5>Dashboard</h5>
      <ul>
        <Li url="/admin/dashboard" Icon={RiDashboardFill}  text="Dashboard" location={location}/>
        <Li url="/admin/product" Icon={RiShoppingBag3Fill}  text="Product" location={location}/>
        <Li url="/admin/customer" Icon={IoIosPeople}  text="Customer " location={location}/>
        <Li url="/admin/transcation" Icon={AiFillFileText}  text="Transcation " location={location}/>
      </ul>
  </div>
);

const DivTwo = ({location} : {location:Location}) =>(
  <div>
  <h5>Charts</h5>
  <ul>
    <Li url="/admin/chart/bar" Icon={FaChartBar} text="Bar" location={location}/>
    <Li url="/admin/chart/pie" Icon={FaChartPie}  text="Pie" location={location}/>
    <Li url="/admin/chart/line" Icon={FaChartLine}  text="Line " location={location}/>
  </ul>
</div>
)

const DivThree =({location} : {location:Location}) =>(
  <div>
      <h5>Apps</h5>
      <ul>
        <Li url="/admin/app/stopwatch" Icon={FaStopwatch}  text="Stopwatch" location={location}/>
        <Li url="/admin/app/coupon" Icon={RiCoupon3Fill}  text="Coupon" location={location}/>
        <Li url="/admin/app/toss" Icon={FaGamepad}  text="Toss " location={location}/>
      </ul>
  </div>
)


interface LiProps{url:String, text:String, Icon:IconType, location: Location};
const Li = ({url,text,location,Icon}:LiProps) =>(
  <li style={{ backgroundColor:location.pathname.includes(url) ? "rgba(0,115,225,0.1)" : "white" ,}}>
          <Link style={{ color:location.pathname.includes(url) ? "rgb(0,115,225)" : ""}} to={url}> <Icon/> {text} </Link>
  </li>
)

export default AdminSlidebar