import AdminSlidebar from "../../components/AdminSlidebar"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useProductDeleteMutation, useProductDetailQuery, useProductUpdateMutation } from "../../redux/api/productApi";
import { useSelector } from "react-redux";
import { reducerinitialstate } from "../../types/reducertypes";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../redux/store";
import { responseToast } from "../../utils/features";
import { FaTrash } from "react-icons/fa";
const ProductM = () => {
  const {user} = useSelector((state: {userReducer : reducerinitialstate})=> state.userReducer )
  const parms = useParams()
  const {data} =useProductDetailQuery(parms.id!)

  const [product,setProduct] = useState({
    name: "", price: 0, stock:0, photo: "", category: "", _id: ""
  })
  const [updateName,setUpdateName] =useState<string>(product.name)
  const [updatePrice,setUpdatePrice] =useState<number>(product.price)
  const [updateStock,setUpdateStock] =useState<number>(product.stock)
  const [updatePhoto,setUpdatephoto] =useState<string>(product.photo)
  const [photoFile, setPhotoFile] = useState<File>();
  const navigate = useNavigate()
  const [updateCategory,setUpdateCategory] =useState<string>(product.category)
  const changeImageHandle = (e: ChangeEvent<HTMLInputElement>) =>{
    const file:File|undefined = e.target.files?.[0];
    const reader:FileReader= new FileReader();
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
        if(typeof reader.result === "string") setUpdatephoto(reader.result); setPhotoFile(file)
      }
    }
  };
  const [productUpdate] =  useProductUpdateMutation();
  const [productDelete] = useProductDeleteMutation()

  useEffect(()=>{
    if(data){
      setProduct(data.product),
      setUpdateName(data.product.name)
      setUpdatePrice(data.product.price)
      setUpdateStock(data.product.stock)
      setUpdateCategory(data.product.category)
      
    }
  },[data])

  const submit = async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData =  new FormData;
    if(updateName) formData.set("name", updateName)
    if(updatePrice) formData.set("price", updatePrice.toString())
    if(updateStock  !==undefined) formData.set("stock", updateStock.toString())
    if(photoFile) formData.set("photo", photoFile)
    if(updateCategory) formData.set("category", updateCategory)

      const res = await productUpdate({
        formData,
        userId: user?._id!,
        productId: product._id!
      })
      responseToast(res,navigate,"/admin/product")
  }
  const deleteHandler = async () =>{
    const res = await  productDelete({
      userId : user?._id!,
      productId: product._id!
    })
    responseToast(res,navigate,"/admin/product")
  }
  return (
    <div className="AdminContainer">
    <AdminSlidebar/>
    <main className="pcontainer">
      <section>
        <strong>ID_{product._id}</strong>
        <img src={`${server}/${product.photo}`} alt="img" />
        <p> {product.name} </p>
        {product.stock > 0 ? (
            <span className="green">{product.stock} Available</span>
          ) : (
            <span className="red">Not Available</span>
          )}
          <h3> ${product.price} </h3>
      </section>
      <article>
      <button onClick={deleteHandler} style={{backgroundColor: "transparent" , color: "black" , marginLeft:"200px", paddingTop:"-3rem"  }} >
                <FaTrash />
              </button>
        <form onSubmit={submit}>
          <h2>Manage</h2>
          <div>
            <label >Name</label>
            <input required type="text" placeholder="name" value={updateName} onChange={(e)=>setUpdateName(e.target.value)} />
          </div>
          <div>
            <label >Price</label>
            <input required type="number" placeholder="Price" value={updatePrice} onChange={(e)=>setUpdatePrice(Number(e.target.value))} />
          </div>
          <div>
            <label >Stock</label>
            <input required type="number" placeholder="Stock" value={updateStock} onChange={(e)=>setUpdateStock(Number(e.target.value))} />
          </div>
          <div>
            <label >Category</label>
            <input required type="text" placeholder="e.g laptop camera" value={updateCategory} onChange={(e)=>setUpdateCategory(e.target.value)} />
          </div>
          <div>
            <label >Photo</label>
            <input type="file" required   onChange={changeImageHandle}/>
          </div>
          {updatePhoto && <img src={updatePhoto} alt="New image"/>}
          <button type="submit"> update </button>
        </form>
      </article>
    </main>
    </div>
  )
}


export default ProductM