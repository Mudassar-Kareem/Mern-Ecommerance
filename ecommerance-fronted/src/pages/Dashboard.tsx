import { BsSearch } from "react-icons/bs"
import AdminSlidebar from "../components/AdminSlidebar"
import { FaRegBell } from "react-icons/fa";
import userImg from "../assets/userpic.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { ChatBar, DoughnutChart } from "../components/Chart";
import data from "../assets/data.json";
import { BiMaleFemale } from "react-icons/bi";
import DashboardTable from "../components/DashboardTable";
const Dashboard = () => {
  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main className="dashboard">
      <div className="bar">
        <BsSearch/>
        <input type="text"  placeholder="search for data, user,docs"/>
        <FaRegBell/>
        <img src={userImg} alt="user" />
      </div>
      <section className="wedgetcontainer">
        <WidgetItem heading="Revenue" value={3400}  amount={true} percent={30} color="rgb(0,115,255)"/>
        <WidgetItem heading="Users" value={400}  amount={false} percent={-12} color="rgb(0 198 202)"/>
        <WidgetItem heading="Transaction" value={23000}  amount={false} percent={80} color="rgb(255 196 0)"/>
        <WidgetItem heading="Products" value={1200}  amount={true} percent={50} color="rgb(76 0 255)"/>
      </section>
      <section className="graphcontainer">
        <div className="revenuechart">
          <h2>Revenue & Transcation</h2>
          <ChatBar data_1={[200,300,400,500,600,700,800]} data_2={[800,700,600,500,400,300,200]} title_1="Revenue" title_2="Transcation" bgColor_1="rgb(0,115,255)" bgColor_2="rgba(53,162,235,0.8)"/>
        </div>
        <div className="dashcat">
          <h2>Inventory</h2>
          <div>
            {data.categerios.map((i)=>(
              <CatItem key={i.heading} heading={i.heading} value={i.value} color={`hsl(${i.value * 5}, ${i.value}%, 50%)`}/>
            ))}
          </div>
        </div>
      </section>

      <section className="tcontainer">
        <div className="tchart">
          <h2>Gender Ratio</h2>
          <DoughnutChart labels={["Male","Female"]} data={[20,25]} cutout={90} backgroundColor={['hsl(340,100%,56%)', 'rgba(53,162,235,0.8)']} />
          <p><BiMaleFemale/></p>
        </div>
        
          <DashboardTable data={data.transaction}/>
        
      </section>
    </main>
    </div>
  )
};

interface WidgetItemProps { heading: String, color: String, value:number, percent: number , amount? : boolean};
const WidgetItem=({heading,color,value,percent,amount}: WidgetItemProps) =>(
  <article className="widgetitem">
    <div className="witgetinfo">
      <p> {heading} </p>
      <h4> {amount ? `$${value}` : value} </h4>
      {percent>0 ? <span className="green"> <HiTrendingUp/> +{percent}% </span> : <span className="red"> <HiTrendingDown/> {percent}% </span>}
    </div>
    <div className="widgetcircle" style={{ 
      background: `conic-gradient(
        ${color} ${(Math.abs(percent)/100*360)}deg, rgb(255,255,255) 0
      )`
    }}>
      <span style={{ color}}> {percent}% </span>
    </div>
  </article>
);
interface CartItemProps{heading: string; value:number; color:string};
const CatItem = ({heading,value,color}: CartItemProps)=>(
  <div className="cartitem">
    <h4>{heading}</h4>
    <div>
      <div style={{backgroundColor: color , width: `${value}%`}}></div>
    </div>
    <span>{value}%</span>
  </div>
)
export default Dashboard