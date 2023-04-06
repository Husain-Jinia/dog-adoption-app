import React, {useEffect, useState, useContext} from 'react'
import { collection, getDocs, query, where, doc } from "firebase/firestore";
import {db} from "../firebase"
import { AuthContext } from '../context/authContext';
import Invites from './invites';
import { setDoc } from "firebase/firestore"; 
import { Card, Badge } from "@windmill/react-ui";

const Home = () => {
  const [dogs, setDogs] = useState([])
  const [err,setErr] = useState()
  const [invites,setInvites] = useState([])
  const checkInvites= []
  const {currentUser} = useContext(AuthContext)

  const fetchPost = async () => {
    console.log("okay")
    const querySnapshot = await getDocs(collection(db, "Dogs"));
    setDogs(querySnapshot.docs.map(doc=>doc.data()))
    console.log(querySnapshot.docs.map(doc=>doc.data()))
    console.log(dogs)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const sendInvite = async(uid) =>{
    console.log("received user uid :", uid)
    try {
      const querySnapshot = await getDocs(query(collection(db, "userInvites"), where("uid", "==", uid)));
      console.log(querySnapshot.docs)
      const data = querySnapshot.docs.map(doc=>doc.data())
      console.log(data)

      if(data[0].invited.includes(uid)){
        console.log("already exists")
      }else{
        console.log("does not exist")
        console.log(data[0].invited)
        try {
          await setDoc(doc(db,"userInvites", uid),{
            uid:uid,
            invited:data[0].invited.concat([
              {
                userUID:currentUser.uid,
                photo:currentUser.photoURL,
                name:currentUser.displayName,  
                accepted:false             
              }
            ])
          })
        } catch (error) {
          setErr(err)
        }
        
      }      
    } catch (error) {
      setErr(err)
    }
    console.log("invite sent")
  }
  

  return (
    <div className=" h-screen bg-gradient-to-r from-slate-500 to-slate-50">
      
      <div className='flex flex-wrap justify-center pt-4'>
      { 
        dogs.map((dog) =>{
        return <Card className="flex flex-col  border border-sky-950 text-capitalize bg-slate-100 p-2 mx-2 my-4 max-w-sm rounded-lg shadow-md">
        <img src={dog.dogPhotoURL} alt=""  className="h-60 w-full object-cover rounded-lg mb-4" />
        <div className='flex flex-row justify-between bg-slate-200 rounded'>
        <h2 className="uppercase text-lg font-medium text-gray-800 mb-1 mt-1 ml-2 ">{dog.dogName}</h2>
        <h2 className="text-lg font-medium text-gray-800 mb-1 mt-1 mr-2">{dog.dogGender}</h2>
        </div>
        
        <div className="flex flex-row justify-between mt-3 ">
            <Badge className="antialiased mb-2 bg-slate-200 rounded-lg px-2 py-1">
              {dog.dogAge} y/o
            </Badge>
            <Badge className="uppercase antialiased mb-2 rounded-lg bg-slate-300 px-2 py-1">
              {dog.dogNature}
            </Badge>
            <Badge className='antialiased bg-slate-200 mb-2 rounded-lg px-2 py-1'>
              {dog.dogBreed}
            </Badge>
        </div>
        <div className='whitespace-normal mt-3 mb-3 bg-white border border-sky-950 rounded-lg py-2 px-2'>
          <p className=' antialiased font-medium text-gray-600 tracking-wide '>{dog.dogDescription}</p>
        </div>
        <div className="flex flex-row justify-between mt-2 bottom-0">
            <input type="button" value="Invite" className='mx-1 p-1 px-3 rounded-lg font-bold text-slate-500 bg-slate-200' onClick={()=>sendInvite(dog.uid)}/>
            <input type="button" value="Read more" className='mx-1 p-1 px-3 rounded-lg font-bold text-slate-500 bg-slate-200'/>
        </div>
        
      </Card>
        })}
        </div>
    </div>
  )
}

export default Home