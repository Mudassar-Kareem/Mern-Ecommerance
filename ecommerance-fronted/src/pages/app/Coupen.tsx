import { useState,FormEvent, useEffect, FormHTMLAttributes } from "react";
import AdminSlidebar from "../../components/AdminSlidebar"

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";
const Coupen = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");

  const handler = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Select one At least");
    let result : string = prefix || "";
    const loopLenght : number = size - result.length;
    for (let index = 0; index < loopLenght; index++) {
      let entireString: string = "";
      if(includeNumbers) entireString+= allNumbers;
      if(includeSymbols) entireString+= allSymbols;
      if(includeCharacters) entireString+=allLetters;
      const ranNumber :number = ~~(Math.random()* entireString.length);
      result +=entireString[ranNumber];
    }
    setCoupon(result);
  }

  const copyText = async(coupon:string)=>{
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  }

  useEffect(()=>{
    setIsCopied(false)
  },[coupon])
  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main className="appcontainer">
      <h1>Coupon</h1>
      <section>
        <form onSubmit={handler}  className="couponform">
          <input type="text"  placeholder="Text to Include" value={prefix} onChange={(e)=> setPrefix(e.target.value)} maxLength={size}/>
          <input type="number" placeholder="Coupon Lenght" max={25} min={8} value={size} onChange={(e)=> setSize(Number(e.target.value))}/>
          <fieldset>
            <legend>Include</legend>
            <input type="checkbox" checked={includeNumbers} onChange={()=>setIncludeNumbers((prev) =>!prev)} />
            <span>Numbers</span>
            <input type="checkbox" checked={includeSymbols} onChange={()=>setIncludeSymbols((prev) =>!prev)} />
            <span>Symbols</span>
            <input type="checkbox" checked={includeCharacters} onChange={()=>setIncludeCharacters((prev) =>!prev)} />
            <span>Characters</span>
          </fieldset>
          <button type="submit">Generate</button>
        </form>
        {coupon && (
          <code>
            {coupon} <span onClick={()=>copyText(coupon)}> {isCopied ? "Copied" : "Copy"} </span>
          </code>
        )}
      </section>
    </main>
    </div>
  )
}

export default Coupen