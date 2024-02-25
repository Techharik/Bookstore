import React, { useEffect } from 'react'

import { BrowserRouter , Routes ,Route} from "react-router-dom";
import Home from './router/Home';
import Product from './router/Product';
import Admin from './router/admin/AdminLogin';
import Login from './router/Login';
import SignUp from './router/SignUp';
import { listerauthchange } from './utils/firebase.utils';
import { useDispatch } from 'react-redux';
import { setUserAction } from './store/user/user.action';
import Nav from './component/Nav';
import AdminHome from './router/admin/AdminHome';



const App = () => {
  const dispatch =useDispatch()

function listenAuth (){
  const unsubscribe = listerauthchange(async(u)=>{  
    console.log(u)
      dispatch(setUserAction(u))
  })
 return unsubscribe
}  

  useEffect(()=>{
    listenAuth()
  },[])

  return (
    <>
     <BrowserRouter>
     <Nav />
        <Routes>
           <Route path='/' element={<Home />} />
           <Route path='/home' element={<Home />} />
           <Route path='/product' element={<Product />} />
           {/* <Route path='/admin' element={<Admin />} /> */}
           <Route path='/login' element={<Login />} />
           <Route path='/signUp' element={<SignUp />} />  
           <Route path='/admin' element={<AdminHome />} />
           
        </Routes>
     
     </BrowserRouter>
    </>
  )
}



export default App;