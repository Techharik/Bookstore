// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyCGIwoGlv7UTNrZZhBJKJjFcohXQRFBOAo",
  authDomain: "bookstore-e4dac.firebaseapp.com",
  projectId: "bookstore-e4dac",
  storageBucket: "bookstore-e4dac.appspot.com",
  messagingSenderId: "228880858993",
  appId: "1:228880858993:web:4f42b9b29f1a05e3ea40d0"
};



//imports 

import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut , GoogleAuthProvider,signInWithPopup} from 'firebase/auth';

import { getDoc, getFirestore, setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

//sigin with google:
export const OnAuthSignInwithGoogle =async()=>{
  return signInWithPopup(auth,provider)
}


//sign Up user:
export const signupUserwithEmailandPassword = async (email,password )=>{
  const {user} =await createUserWithEmailAndPassword(auth, email,password)

  return user
}


//firestore add data to firestore:

export const CreateUserData = async (user,...addInfo)=>{
  //check the user already exists means same uid;
  const userCredentials =  doc(db,'users',user?.uid);
  
  const getUserSnapshot  = await getDoc(userCredentials)


  if(!getUserSnapshot.exists()){
   const  createAt = new Date();
   try{
     await setDoc(userCredentials,{
      displayName:user.displayName,
       email:user.email,
       role:'users',
       createAt,
       ...addInfo
     })
   }catch(e){
    return('failed to set',e)
   }
    return true;
  }else{
    return false;
  }
}

export const signInUser = async(email,password)=>{
    const {user} = await signInWithEmailAndPassword(auth,email,password);
    
}

export const signOutUserAuth = async()=>{
   await signOut(auth);
}


//observers:
export const listerauthchange = async(call)=>{
  return onAuthStateChanged(auth,call)
}


//add user to firestore:
//collection: user;
//document :user.uid;
//data:{
  // displayname:
  // email:
  // createdAt
// }