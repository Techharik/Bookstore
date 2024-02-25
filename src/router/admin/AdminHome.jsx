import React, { useEffect, useState } from 'react'
import { addNewProduct, deleteProduct, getAllProducts, getImageURl, updateProduct } from '../../utils/admin.utils'


const AdminHome = () => {
  const [imgurl ,setImgUrl] =useState('')

//   const handleImageUpload =async(e)=>{
//     e.preventDefault();
//     const imageFile = e.target.files[0];

//     if (!imageFile) {
//       console.error('No file selected');
//       return;
//     }

//  await getImageURl(imageFile)
//   }
useEffect(()=>{
  updateProduct("sQgbBW3ga9b2XPUWCgD0" ,{qty:7})
},[])
  return (
    <form>
      {/* <input type="file" name="productImage" id="productImage" onChange={handleImageUpload} /> */}

    </form>
  )
}

export default AdminHome