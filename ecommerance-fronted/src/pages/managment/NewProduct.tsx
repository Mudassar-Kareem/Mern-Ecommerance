import { useSelector } from "react-redux";
import AdminSlidebar from "../../components/AdminSlidebar"
import { ChangeEvent, FormEvent, useState } from "react"
import { reducerinitialstate } from "../../types/reducertypes";
import { useNewProductMutation } from "../../redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../../utils/features";

const NewProduct = () => {
  const {user} = useSelector((state: {userReducer : reducerinitialstate})=> state.userReducer )
  const [name,setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price,setPrice]=useState<number>();
  const [stock,setStock]=useState<number>(1);
  const [photo,setPhoto]=useState<File>();
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const changeImageHandle = (e: ChangeEvent<HTMLInputElement>) =>{
    const file:File| undefined = e.target.files?.[0];
    const reader:FileReader = new FileReader();
    if(file){
        reader.readAsDataURL(file);
        reader.onloadend =() =>{
            if(typeof reader.result === "string") setPhotoPrev(reader.result); setPhoto(file);
        }
    }
  };
  const [newProduct] =useNewProductMutation()
  const navigate = useNavigate()
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || stock < 0 || !category || !photo) return;
    const formData = new FormData();
    formData.set("name", name)
    formData.set("price", price.toString())
    formData.set("stock", stock.toString())
    formData.set("photo", photo)
    formData.set("category", category)

    const res = await newProduct({ id: user?._id!, formData })
    responseToast(res,navigate, "/admin/product")
    
  }
  
    

  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main className="pcontainer">
      <article>
        <form  onSubmit={submitHandler}>
          <h2>New Product</h2>
          <div>
            <label >Name</label>
            <input required type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div>
            <label >Price</label>
            <input required type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(Number(e.target.value))} />
          </div>
          <div>
            <label >Stock</label>
            <input required type="number" placeholder="Stock" value={stock} onChange={(e)=>setStock(Number(e.target.value))} />
          </div>
          <div>
            <label >Category</label>
            <input required type="text" placeholder="e.g laptop camera etc" value={category} onChange={(e)=>setCategory(e.target.value)} />
          </div>
          <div>
            <label >Photo</label>
            <input type="file" required   onChange={changeImageHandle}/>
          </div>
          {photoPrev && <img src={photoPrev} alt="New image"/>}
          <button type="submit"> Create </button>
        </form>
      </article>
    </main>
    </div>
  )
}


export default NewProduct