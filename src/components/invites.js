import React,{useEffect, useState} from 'react'
import { collection, getDoc, getDocs, query, where, doc, setDoc, updateDoc, serverTimestamp, } from "firebase/firestore";
import {db} from "../firebase"

const Invites = (props) => {
  const [currentUser, setCurrentUser] = useState()
  const [invite, setInvites] = useState([])
  const [userData, setUserData] = useState([])
  const[data, setData] = useState()
  const [uid, setUid] = useState(localStorage.getItem("userUid") || undefined)
  const [err, setErr] = useState()
  
  

  const fetchInvites = async () =>{
    let querySnapshot = []
    let Udata = []
    if(props.current.uid===undefined){
      querySnapshot = await getDocs(query(collection(db, "userInvites"), where("uid", "==", uid)));
      Udata = querySnapshot.docs.map(doc=>doc.data())
    }else{
      querySnapshot = await getDocs(query(collection(db, "userInvites"), where("uid", "==", props.current.uid)));
      Udata = querySnapshot.docs.map(doc=>doc.data())
    }
    console.log(querySnapshot.docs)
    console.log(Udata)
    if(props.current.uid!==undefined){
      localStorage.setItem("userUid", props.current.uid );
    }
    console.log(Udata[0].invited)
    setUserData(Udata[0].invited)
    setData(Udata)
  }
    useEffect(() => {
      fetchInvites()
    }, [])
    
  const acceptInvite = async (user) =>{
    setCurrentUser(data)
    const combinedId = props.current.uid>user.userUID?props.current.uid+user.userUID:user.userUID+props.current.uid
    try {
      if(user.accepted===true){
        console.log("already accepted")
      }else{
        const res = await getDoc(doc(db, "chats", combinedId))
        console.log(res)
        try {
          if(!res.exists()){
            console.log(data[0].uid)
            console.log(user.userUID)
            await setDoc(doc(db, "chats", combinedId), { messages: [] })
            console.log("chat set")
            await updateDoc(doc(db, "userChats", data[0].uid), {
              [combinedId + ".userInfo"]: {
                uid: user.userUID,
                displayName: user.name,
                photoURL: user.photo,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
  
            await updateDoc(doc(db, "userChats", user.userUID), {
              [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
            const user_index = data[0].invited.findIndex( (obj=>obj.userUID===user.userUID))
            setData(data[0].invited[user_index].accepted = true)
            await setDoc(doc(db,"userInvites", data[0].uid),data[0]) 
          }
        } catch (error) {
          console.log(error)
        }
        
      }
      
    } 
    catch (error) {
      setErr(error)
    }
  }

  return (
    <div>Invites
      <div>
        {
        userData.filter(user=> {
          return user.accepted===false
        }).map((d) =>{
        return <div key={d.userUID}>
            <li >
              {d.name}<br/>
              {<input type="button" disabled value="Accepted"/>}
              <br/>
            </li>
          </div>
        })
      }
      </div>
      <hr/>
      <div >
      {
      userData.filter(user=> {
        return user.accepted===true
      }).map((d) =>{
      return <div key={d.userUID} style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        {d.name}
        {<input type="button" disabled value="Accepted"/>}
      </div>
      
      })
    }
      
      </div>
      <hr/>
    </div>
    
  )
}

export default Invites