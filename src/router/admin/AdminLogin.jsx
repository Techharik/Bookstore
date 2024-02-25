import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminSignInauth } from '../../utils/admin.utils'


const defaultUserData = {
  email:'',
}

const Admin = () => {
  const [formfield , setFormfield] = useState(defaultUserData)
  const LoggedInUser = useSelector((state)=>state.user.userDetails)
  const {email}= formfield;
  const dispatch =useDispatch() 
 const navigator = useNavigate()



   const onSubmitHandler = async ()=>{
    //login user session:
    try{
      const adminData=   await adminSignInauth(email)
      adminData && navigator('/admin/Home')
    }catch(e){
      alert(e)
    }
   }
 
   const changesHandler = (event)=>{
    const {name,value} = event.target
    setFormfield({...formfield,[name]:value})
    }


  return (
    <div>
        <div className='flex flex-col items-center justify-center h-[100vh]'>
            <h1>Admin login Portal</h1>
            <div className='flex flex-col w-[300px] '>
                <label htmlFor="email">Email</label>
                <input type="text"
                 name='email' 
                 className='border-2 ml-2 border-cyan-400'
                 value={email}
                 onChange={changesHandler}
                  />
                <button onClick={onSubmitHandler}>Sign In</button>
               
            </div>
             
        </div>
    </div>
  )
} 
export default Admin