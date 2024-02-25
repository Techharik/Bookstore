import React, { useEffect, useState } from 'react'
import { CreateUserData, OnAuthSignInwithGoogle, listerauthchange, signInUser } from '../utils/firebase.utils'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAction } from '../store/user/user.action';
import { useNavigate } from 'react-router-dom';


const defaultUserData = {
  email:'',
  password:'',
}

const Login = () => {
  const [formfield , setFormfield] = useState(defaultUserData)
  const LoggedInUser = useSelector((state)=>state.user.userDetails)
  const {email,password}= formfield;
  const dispatch =useDispatch() 
 const navigator = useNavigate()


 
   const resetFormfield = ()=>{
    setFormfield({...defaultUserData})
   }

   const onSubmitHandler = async ()=>{
    //login user session:
    try{
      const user  = await signInUser(email,password)
    }catch(e){
      alert(e)
    }
   }
   
   const changesHandler = (event)=>{
    const {name,value} = event.target
    setFormfield({...formfield,[name]:value})
    }

    const onGoogleSignIn = async()=>{
      try{
        const {user} = await OnAuthSignInwithGoogle()
        const msg=  await CreateUserData(user)
        
        navigator('/')
      }catch(e){
        alert(e)
      }
      
     
    }




  return (
    <div>
        <div className='flex flex-col items-center justify-center h-[100vh]'>
            <h1>Login With</h1>
            <div className='flex flex-col w-[300px] '>
                <label htmlFor="email">Email</label>
                <input type="text"
                 name='email' 
                 className='border-2 ml-2 border-cyan-400'
                 value={email}
                 onChange={changesHandler}
                  />
                <label htmlFor="password">Password</label>
                <input type="text" name='password' className='border-2 ml-2 border-cyan-400'
                  value={password}
                  onChange={changesHandler}
                />

                <button onClick={onSubmitHandler}>Sign In</button>
               
            </div>
                <button onClick={onGoogleSignIn}>Sign In with Google</button>
        </div>
    </div>
  )
}

export default Login