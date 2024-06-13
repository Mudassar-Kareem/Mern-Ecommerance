import AdminSlidebar from "../../components/AdminSlidebar"

import { useState } from "react"
const Toss = () => {
  const [angle,setAngle] =useState<number>(0);
  const filpcoin = ()=>{
    if(Math.random() > 0.5) setAngle ((prev) => prev +180);
    else setAngle ((prev) => prev + 360);
  }
  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main className="appcontainer">
      <h1>Toss</h1>
      <section>
        <article className="tosscoin" onClick={filpcoin} style={{transform: `rotateY(${angle}deg)`}}>
          <div></div>
          <div></div>
        </article>
      </section>
    </main>
    </div>
  )
}

export default Toss