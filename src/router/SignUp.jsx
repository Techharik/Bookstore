import React, { useState } from 'react'
import {
  signupUserwithEmailandPassword,
  CreateUserData } from '../utils/firebase.utils';
  import { useNavigate } from "react-router-dom";



const defaultUserData = {
  displayName:'',
  email:'',
  password:'',
  confirmPassword:''
}


const SignUp = () => {
   const [formfield , setFormfield] = useState(defaultUserData)
   const {displayName,email,password,confirmPassword}= formfield;
   let navigate = useNavigate();

   
   const resetFormfield = ()=>{
    setFormfield({...defaultUserData})
   }


   const onSubmitHandler = async ()=>{
    //login user session:
    if ( password != confirmPassword) return alert('missmatch password')
    try{
      const user  = await signupUserwithEmailandPassword(email,password)
 
      //add user details in db;
     const addedSuccess = await CreateUserData(user,displayName)
   
      resetFormfield();
  
       if(addedSuccess){
        return navigate('/home')
       }
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
            <h1>SignUp with UserName</h1>
            <div className='flex flex-col w-[300px] '>
                <label htmlFor="email">Email</label>
                <input type="text"
                 name='email' 
                 className='border-2 ml-2 border-cyan-400'
                 value={email}
                 onChange={changesHandler}
                  />

                <label htmlFor="displayName">UserName</label>
                <input type="text"
                 name='displayName' 
                 className='border-2 ml-2 border-cyan-400'
                 value={displayName}
                 onChange={changesHandler}
                 
                  />
                <label htmlFor="password">Password</label>
                <input type="text" name='password' className='border-2 ml-2 border-cyan-400'
                  value={password}
                  onChange={changesHandler}
                />


                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="text" name='confirmPassword'    className='border-2 ml-2 border-cyan-400'
                value={confirmPassword}
                onChange={changesHandler}
                />



                <button onClick={onSubmitHandler}>Sign Up</button>
            </div>
        </div>
    </div>
  )
}

export default SignUp