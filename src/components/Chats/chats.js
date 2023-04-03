import React, { useState, useEffect, useContext } from 'react'
import { onSnapshot, doc } from "firebase/firestore";
import {db} from "../../firebase"
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';
import Chat from './chat';

const Chats = () => {

    const[chats, setChats] =useState([])

    const {currentUser} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)

    useEffect(() => {
        const getChats = ()=>{
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), doc=>{
                console.log(doc.data())
                setChats(doc.data())
            })
                   
            return ()=>{
                unsub();
            }
        }
        currentUser.uid && getChats()
      
    }, [currentUser.uid])

    const handleSelect = (user)=>{
        dispatch({type:"CHANGE_USER", payload:user})
    } 
    

    return (
        <div>
            Chats
            <div>
                {
                    Object.entries(chats)?.map(chat=>{
                        return <div key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                            <p>{chat[1].userInfo.displayName}</p>
                            <p>{chat[1].userInfo.lastMessage?.text}</p>
                        </div>
                    })
                }
            </div>
            <div>
                <Chat/>
            </div>
        </div>
    )
}

export default Chats