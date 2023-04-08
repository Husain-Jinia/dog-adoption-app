import React,{useEffect, useState, useContext} from 'react'
import { collection, getDoc, getDocs, query, where, doc, setDoc, updateDoc, serverTimestamp, } from "firebase/firestore";
import {db} from "../firebase"
import { AuthContext } from '../context/authContext';

const Invites = (props) => {
  // const [currentUser, setCurrentUser] = useState()
  const {currentUser} = useContext(AuthContext)

  const [invite, setInvites] = useState([])
  const [userData, setUserData] = useState([])
  const[data, setData] = useState()
  const [uid, setUid] = useState(localStorage.getItem("userUid") || undefined)
  const [err, setErr] = useState()
  
  

  const fetchInvites = async () =>{
    let querySnapshot = []
    let Udata = []
    console.log("adankfka"+currentUser)
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
      currentUser && fetchInvites()
    }, [])
    
  const acceptInvite = async (user) =>{
    // setCurrentUser(data)
    const combinedId = props.current.uid>user.userUID?props.current.uid+user.userUID:user.userUID+props.current.uid
    try {
      if(user.accepted===true){
        console.log("already accepted")
      }else{
        const res = await getDoc(doc(db, "chats", combinedId))
        console.log(res)
        console.log(props.current)
        try {
          if(!res.exists()){
            await 
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
            console.log("done")
            
            await updateDoc(doc(db, "userChats", user.userUID), {
              [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
            console.log("yay")
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
    <div>
      <div className=' flex flex-col mt-4'>
        {
        userData.filter(user=> {
          return user.accepted===false
        }).map((d) =>{
        return <div className='rounded bg-slate-500 border-2 border-slate-500 mx-4 flex py-2 flex-row justify-between mb-4' key={d.userUID}>
            <div>
            <div className='text-center text-white text-lg uppercase font-medium'>{d.name}</div>
              {<input className='rounded bg-slate-300  px-2 py-1' type="button" onClick={()=>acceptInvite(d)} value="Accept"/>}

            </div>
          </div>
        })
      }
      </div>
      <div >
      {
      userData.filter(user=> {
        return user.accepted===true
      }).map((d) =>{
      return <div key={d.userUID} className='rounded border-2 border-slate-500  bg-slate-500 mx-4 py-2 px-2 py-1 mx-4 mb-4' style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <div className='text-center  text-white uppercase font-medium text-lg'>{d.name}</div>
        <input className='rounded bg-slate-300  px-2 py-1' type="button" disabled value="Accepted"/>
      </div>
      
      })
    }
      
      </div>
    </div>
    
  )
}

export default Invites