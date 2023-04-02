import React, {useEffect, useState, useContext} from 'react'
import { collection, getDocs, query, where, doc } from "firebase/firestore";
import {db} from "../firebase"
import { AuthContext } from '../context/authContext';
import Invites from './invites';
import { setDoc } from "firebase/firestore"; 

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

      if(data[0].invited.includes(currentUser.uid)){
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
      
      Dogs
      <hr></hr>
      current user: {currentUser.uid}
      <hr></hr>
      {
        dogs.map((dog) =>{
        return <li key={dog.uid}>
          {dog.dogName}<br/>
          {dog.uid}
          <br/><input type="button" onClick={()=>sendInvite(dog.uid)} value="invite"/>
          <hr/>
         
        </li>
        })}
        {/* {
        invites.map((dog) =>{
        return <li key={dog.uid}>
          {dog.invited}<br/>
          {dog.uid}
          <br/><input type="button" onClick={()=>sendInvite(dog.uid)} value="invite"/>
          <hr/>
         
        </li>
        })} */}
        
        {/* <hr/>
        <hr/>
        <Invites/> */}
    </div>
  )
}

export default Home