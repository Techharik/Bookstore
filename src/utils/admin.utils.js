import { collection, deleteDoc,updateDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "./firebase.utils";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//find admin authentication with email and role multiple docs

export const adminSignInauth =async (email)=>{
    try{
    const q = query(collection(db, "users")
    ,where('email' , '==' , email))

    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty){
        alert('Email not found');
    }else{
        let adminData;
        querySnapshot.forEach((doc)=>{
            const userData = doc.data();
            if(userData.role != 'admin'){
                alert('You dont have Permission')
            }else{
                adminData={
                    name:userData.displayName,
                    email:userData.email
                };
            }
        })
        return adminData;
    }


}catch(e){
        alert(e)
    }
}

//

// finding the loggedIn user Role

export const findLoggedInUser = async (uid)=>{
    const docRef = doc(db, "users", uid);
    const userSnapshot =await getDoc(docRef)

    if(!userSnapshot.exists()){
        alert('User is not found in db')
    }else{
      const {email,displayName} = userSnapshot.data();
      return {
        email,displayName
      }
    }
}


//add Image to storage and get the url

export const getImageURl = async(file)=>{
    const storage = getStorage();
    
    const metadata = {
      contentType: 'image/jpeg'
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
      }
    );
}


//add Product in category:
export const addNewProduct = async (data)=>{
    const docRef = doc(collection(db,'products'))
    const {productImg ,name ,price , descrip, qty ,category} = data;
    const  createAt = new Date();
    try{
        const newProduct =await setDoc(docRef,{
            productImg ,name ,price , descrip, qty ,category,createAt
        })

        alert('Product successfully added')
    }catch(e){
        alert('Product failed to added')
    }
    
}


//get all Product 

export const getAllProducts = async ()=>{
    const docRef = query(collection(db,'products'))
    const productList  = await getDocs(docRef)

    if(!productList.empty){
        productList.forEach((prod)=>{
            console.log(prod.id , prod.data())
        })
    }
}

//delete a product from db;

export const deleteProduct = async(uid)=>{
    try{
        await deleteDoc(doc(db,'products',uid))
    }catch(e){

    }
}

//update a product in db
export const updateProduct = async(uid,data)=>{
    console.log(uid,data)
    try{
        const productRef = doc(db, "products", uid);
        await updateDoc(productRef, data);
    }catch(e){
       console.log(e) 
    }
}
