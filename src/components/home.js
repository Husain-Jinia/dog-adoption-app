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
    <div>
      
      <div className='flex flex-wrap justify-center m-4'>
      { 
        dogs.map((dog) =>{
        return <Card className="flex flex-col bg-zinc-100 p-2 mx-2 my-4 max-w-sm rounded-lg shadow-md">
        <img src={dog.dogPhotoURL} alt=""  className="h-60 w-full object-cover rounded-lg mb-4" />
        <div className='flex flex-row justify-between bg-neutral-200 rounded'>
        <h2 className="text-lg font-medium text-gray-800 mb-1 mt-1 ml-2">{dog.dogName}</h2>
        <h2 className="text-lg font-medium text-gray-800 mb-1 mt-1 mr-2">{dog.dogGender}</h2>
        </div>
        
        <div className="flex flex-row justify-between mt-3">
            <Badge className="antialiased mb-2">
              {dog.dogAge} y/o
            </Badge>
            <Badge className=" antialiased mb-2 rounded-lg bg-green-200 px-2 py-1">
              {dog.dogNature}
            </Badge>
            <Badge className='antialiased'>
              {dog.dogBreed}
            </Badge>
        </div>
        <div className="flex flex-row justify-between mt-2">
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