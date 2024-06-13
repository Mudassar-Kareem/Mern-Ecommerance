import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";


const Shipping = () => {
    const [shipping,setShipping] = useState({
        address:"", city:"",state:"",country:"",pincode:""
    });
    const handler = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        setShipping((prev)=> ({...prev,[e.target.name]:e.target.value}))
    };
  return (
    <div className="shipping">
        <button className="backbtn">
            <BiArrowBack/>
        </button>
        <form action="">
            <h1>Shipping Addrees</h1>
            <input required type="text"  placeholder="Address" name="address"  value={shipping.address} onChange={handler}/>
            <input required type="text"  placeholder="City" name="city"  value={shipping.city} onChange={handler}/>
            <input required type="text"  placeholder="State" name="state"  value={shipping.state} onChange={handler}/>
            <select required  name="country"  value={shipping.country} onChange={handler} >
                <option value="">Choose country</option>
                <option value="Pakistan">Pakistan</option>
            </select>
            <input required type="number"  placeholder="PinCode" name="pincode"  value={shipping.pincode} onChange={handler}/>
            <button type="submit">Pay Now</button>
        </form>
    </div>
  )
}

export default Shipping;