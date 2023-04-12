import React, { useState, } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage, db} from "../../firebase"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {useNavigate, Link} from "react-router-dom"

const RegisterPage = () => {

    const [err, setErr] = useState(false)
    // const [dog, setDog] = useState(true)
    const navigate  =useNavigate()
    const [active, setActive] = useState(false)
    // const [dogImage, setDogImage] = useState()
    const [selectedFile, setSelectedFile] = useState(null);

    // const handleChange = (event) =>{
    //     setDog(false)
    // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value
    const email = event.target[1].value
    const password = event.target[2].value
    const country = event.target[3].value
    const state = event.target[4].value
    const city = event.target[5].value
    const dogName = event.target[7].value
    const dogBreed = event.target[8].value
    const dogGender = event.target[9].value
    const dogNature = event.target[10].value
    const dogAge = event.target[11].value
    const dogDescription = event.target[12].value

    try {

        const res= await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, dogName+displayName);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        // console.log(selectedFile)
        console.log(selectedFile)


        
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
        (error) => {
            setErr(true)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user,{
                displayName,
                photoURL: null,
            })
            await setDoc(doc(db, "Dogs",res.user.uid),{
                uid:res.user.uid,
                dogName,
                dogBreed,
                dogGender,
                dogNature,
                dogAge,
                dogDescription,
                country,
                state,
                city,
                dogPhotoURL:downloadURL
            })
            console.log(res.user)
            await setDoc(doc(db, "users", res.user.uid), {
                uid:res.user.uid,
                displayName,
                email,
                photoURL: null
            });
            await setDoc(doc(db,"userInvites", res.user.uid),{
                uid:res.user.uid,
                invited:[]
            })
            await setDoc(doc(db, "userChats", res.user.uid),{})
            navigate("/")
            });
            
        }
        )
        // const dogStorageRef = ref(storage, dogName);
        // console.log(file)
        // const dogUploadTask = uploadBytesResumable(dogStorageRef, selectedFile);
        // dogUploadTask.on(
        //     (error) => {
        //         setErr(true)
        //     }, 
        //     () => {
        //         getDownloadURL(dogUploadTask.snapshot.ref).then(async (downloadURL) => {
        //         await updateProfile(res.user,{
        //             dogName,
        //             dogPhotoURL: downloadURL,
        //         })
        //         await setDoc(doc(db, "Dogs",res.user.uid),{
        //             uid:res.user.uid,
        //             dogName,
        //             dogBreed,
        //             dogGender,
        //             dogNature,
        //             dogAge,
        //             dogDescription,
        //             dogPhotoURL:downloadURL
        //         })
        //         navigate("/login")
        //         });
        //     }
        // );
        
        
        

    } catch (error) {
        setErr(true) 
    }

    console.log('Email:', email);
    console.log('Username:', displayName);
    console.log('Password:', password);
    // console.log('dog:', name);
  }


  const nextPage = () =>{
    setActive(true)
  }

  const previousPage = () =>{
    setActive(false)
  }

  return (

    <>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center bg-gradient-to-r from-slate-500 to-slate-50">
        <div className='max-w-md w-full px-6 py-12 bg-white shadow-md overflow-hidden sm:rounded-lg'>
        <div className="mb-8">
        <h2 className="text-center text-2xl font-bold text-gray-800">
            Register
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="ml-2 font-medium text-blue-600 hover:text-blue-500">
            Login
            </Link>
        </p>
        </div>
        <Form   onSubmit={handleSubmit}> 
            <div className={active===false?'page-1 ':'page-1  hidden' } id="page1">
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="username">username</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" id="username" placeholder="Enter your username"   />
                </div>
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="email">Email</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Enter your email"   />
                </div>
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="password">Password</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Enter your password"  />
                </div>
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="Country">Country</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="Country" id="country" placeholder="Enter your country"  />
                </div>
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="state">State</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="state" id="state" placeholder="Enter your state"  />
                </div>
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="city">City</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="city" id="city" placeholder="Enter your city"  />
                </div>
                <button type="button" className="py-1 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600" onClick={nextPage}>Next</button>
            </div>
            <div className={active===true?'page-2':'page-2  hidden'} id="page2">
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="dogName">dog name</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="dogName" id="dogName" placeholder="Enter your dogName"   />
                </div>
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="dogBreed">dog breed</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="dogBreed" id="dogBreed" placeholder="Enter your dogBreed"   />
                </div>
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="dogGender">dog gender</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="dogGender" id="dogGender" placeholder="Enter your dogGender"  />
                </div>
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="dogNature">dog nature</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="dogNature" id="dogNature" placeholder="Enter your dogNature"  />
                </div>
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="dogAge">dog age</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="dogAge" id="dogAge" placeholder="Enter your dogAge"   />
                </div>
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="dogDescription">dog description</Label>
                    <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="dogDescription" id="dogDescription" placeholder="Enter your dogDescription"   />
                </div>
                <div className="mb-4">
                    <Label className="block text-gray-700 font-bold mb-2" for="dogImage">dog image</Label>
                    <Input 
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" name="dogImage" id="dogImage" placeholder="Enter your dogImage"  />         
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={previousPage} type="button">
                    Previous
                    </button>
                    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Submit
                    </button>
                </div>
            </div>
          
        
       
      </Form>
        </div>
      
    </div>
    </>
  );
};

export default RegisterPage;
