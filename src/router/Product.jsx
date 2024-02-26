import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewProducts } from '../store/product/product.action'

const Product = () => {
  const state = useSelector((state)=>state.products)
  const {isLoading, isError, productsData} = state
  const dispatch = useDispatch()

  
 useEffect(()=>{
      dispatch(viewProducts())
   },[])

  return (
<>
<div>Product</div>
{
  isLoading ? 
  <h2>Loading</h2> 
  :
  (<>
  {productsData.length > 0 
  ?
   productsData.map((prod)=><h1 key={prod.name}>{prod.name}</h1>)
   :
   <h1>No products</h1>}
  </>)
}
</>


  )
}

export default Product