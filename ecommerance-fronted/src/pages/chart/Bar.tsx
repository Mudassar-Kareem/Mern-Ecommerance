import AdminSlidebar from "../../components/AdminSlidebar"
import {  ChatBar } from "../../components/Chart";
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  
const Bar = () => {
  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main className="barcontainer">
        <h1>Bar Charts</h1>
        <section>
            <ChatBar  data_1={[120,300,400,700,800,400,999]} data_2={[411,334,776,345,987,456,199]} 
             title_1="Users" title_2="Products" bgColor_1={`hsl(260,50%,30%)`} bgColor_2={`hsl(360,90%,90%)`}/>
             <h2>Top Selling Products & Top Customers</h2>
        </section>
        <section>
            <ChatBar  data_1={[200,300,344,455,566,788,900,900,988,675,453,321]} data_2={[]}
            title_1="products" title_2="" bgColor_1={`hsl(180, 40%, 50%)`} bgColor_2="" horizontal={true} labels={months}/>
            <h2>Orders throughout the year</h2>
        </section>
    </main>
    </div>
  )
}

export default Bar