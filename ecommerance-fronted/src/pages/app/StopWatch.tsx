import { useState,useEffect } from "react";
import AdminSlidebar from "../../components/AdminSlidebar"

const formatTime = (timeInSecond: number) =>{
  const hour = Math.floor(timeInSecond / 3600);
  const min= Math.floor((timeInSecond % 3600)/60);
  const sec= timeInSecond % 60;

  const hourString = hour.toString().padStart(2,"0");
  const secString= sec.toString().padStart(2,"0");
  const minString = min.toString().padStart(2,"0");
  return `${hourString}:${minString}:${secString}`;
};
const StopWatch = () =>{
  const [time,setTime] = useState<number>(0);
  const [isActive,setIsActive] = useState<boolean>(false);
  useEffect(()=>{
    let intervalID : number;
    if(isActive){
      intervalID=setInterval(()=>{
        setTime((prev)=> prev + 1)
      },1000)
    }
  
    return ()=>{
      clearInterval(intervalID);
    }
  },[isActive]);
  const resetHandle = () =>{
    setTime(0);
    setIsActive(false)
  }
  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main className="appcontainer">
        <h1>Stop Watch</h1>
        <section>
            <div className="stopwatch">
                <h2>{formatTime(time)}</h2>
                <button onClick={()=> setIsActive((prev)=> !prev)}>{isActive ? "Stop" : "Start"}</button>
                <button onClick={resetHandle}>Restart</button>
            </div>
        </section>
    </main>
    </div>
  )
}

export default StopWatch