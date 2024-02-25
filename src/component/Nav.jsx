import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listerauthchange, signOutUserAuth } from '../utils/firebase.utils'
import { setUserAction } from '../store/user/user.action'

const Nav = () => {
  const isLoggedInUser = useSelector((state)=>state.user.userDetails)
  const navItems = ['Home', 'Product', 'Cart' , 'Contact Us']
  console.log(isLoggedInUser)
  
 const OnsignOutHandler =async()=>{
  await signOutUserAuth()
 }


  return (
   <div className='bg-violet-400'>
     <div className='flex justify-between mx-56 h-12 items-center '>
        logo    
        <div>
           {
            navItems.map((navItem,index) => {
                return <Link key={index} to={navItem} className='mr-2'>{navItem}</Link> 
            })
           }
        </div>
        <div>
          {
            Object.keys(isLoggedInUser).length === 0 ? (<>
              <Link to='/signup'>SignUp</Link>
              <Link to='/login'>Login</Link>
            </>)
            :
           <button onClick={OnsignOutHandler}>SignOut</button>
          }
            
        </div>
     </div>
   </div>
  )
}

export default Nav