import AdminSlidebar from "../../components/AdminSlidebar";
import { LineChar } from "../../components/Chart";
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
const LineChart = () => {
  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main className="barcontainer">
        <h1>Line Chart</h1>
        <section> 
            <LineChar label="User" labels={months} data={[21, 321,543,567,542,789,754,234,64,43,908,675]} borderColor="rgb(53, 162, 255)" backgroundColor="rgba(53, 162, 255,0.5)"/>
            <h2>Active User</h2>
        </section>
        <section>
            <LineChar backgroundColor={"hsla(269,80%,40%,0.4)"} borderColor={"hsl(269,80%,40%)"} label="Products" labels={months} data={[123,456,789,980,765,432,111,998,887,776,665,554]}  />
        <h2>Total Products(SKU)</h2>
        </section>
        <section>
            <LineChar backgroundColor={"hsla(129,80%,40%,0.4)"} borderColor={"hsl(129,80%,40%)"} label="Revenue" labels={months} data={[1122,3344,5566,7788,9900,9900,8877,6655,4433,2211,1234,5678]}/>
         <h2>Total Revenue</h2>
        </section>
        <section>
            <LineChar borderColor={"hsl(29,80%,40%)"}  backgroundColor={"hsla(29,80%,40%,0.4)"} labels={months} label="Discount" data={[112,332,4566,6678,865,908,321,564,864,754,346,456]}/>
        <h2>Discount Allotted</h2>
        </section>
        
    </main>
    </div>
  )
}

export default LineChart