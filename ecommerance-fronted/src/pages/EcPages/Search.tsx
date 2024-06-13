import { useState } from "react"
import ProductCart from "../../components/EcComponent/ProductCart";
import CartItem from "../../components/EcComponent/CartItem";
import { useCategoriesQuery, useSearchproductQuery } from "../../redux/api/productApi";
import toast from "react-hot-toast";
import { Customerror } from "../../types/apitypes";
import Loader from "../../components/Loader";
import { orderItems } from "../../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducer/cartReducer";


const Search = () => {
  const dispatch = useDispatch()
  const {data: categoryD, isLoading: categoryL, isError,error} =useCategoriesQuery("");
  const [sort,setSort] =useState("");
  const [price,setPrice] = useState(100000);
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("");
  const [page,setPage] = useState(1);
  const addToCard= (orderItems : orderItems) =>{
    if(orderItems.stock < 1) return toast.error("Product out of stock");
    dispatch(addToCart(orderItems))
    if(orderItems.stock >1) return toast.success("Product add to cart")

  }
  const isNextPage = page < 3;
  const isPrevPage= page > 1;
  const {data,isLoading,isError: pisError,error: perror} = useSearchproductQuery({search,sort,category,page,price: price})
  if(isError){
    toast.error((error as Customerror).data.message)
  }
  if(pisError){
    toast.error((perror as Customerror).data.message)
  }
  return (
    <div className="search">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="">none</option>
            <option value="asc">(High to Low)</option>
            <option value="des">(Low to High)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {price || ""}</h4>
          <input type="range" max={100000} min={100} value={price} onChange={(e)=>setPrice(Number(e.target.value))}/>
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">All</option>
            {!categoryL && categoryD?.catogories.map((i)=>(
              <option key={i} value={i}>
                {i.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text"  placeholder="Search by name..." value={search} onChange={(e)=> setSearch(e.target.value)}/>
        {isLoading ? <Loader/> :(
          <div className="productitem">
            {data?.product.map((i)=>(
              <ProductCart
              key={i._id}
              name={i.name}
              photo={i.photo}
              price={i.price}
              stock={i.stock}
              productId={i._id}
              handler={addToCard}
              />
            ))}

          </div>
          
        )}
        {data && data.totalpage>1 && (
          <article>
          <button disabled={!isPrevPage} onClick={()=>setPage((prev)=> prev - 1)}>Prev</button>
          <span> {page} of 3 </span>
          <button disabled={!isNextPage} onClick={()=> setPage((prev)=> prev + 1)}> Next </button>
        </article>
        )}
        
      </main>
    </div>
  )
}

export default Search