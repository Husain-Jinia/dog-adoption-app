import React, { useState, useEffect, useContext } from 'react'
import { onSnapshot, doc } from "firebase/firestore";
import {db} from "../../firebase"
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../../context/chatContext';

const Chats = () => {

    const[chats, setChats] =useState([])

    const {currentUser} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)

    useEffect(() => {
        const getChats = ()=>{
            const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), doc=>{
                setChats(doc.data())
            })
                   
            return ()=>{
                unsub();
            }
        }
        currentUser.uid && getChats()
      
    }, [currentUser.uid])
    

    return (
        <div>
            Chats
            <div>
                {
                    Object.entries(chats)?.map(chat=>{
                        return <div key={chat[0]}>
                            <p>{chat[1].userInfo.displayName}</p>
                            <p>{chat[1].userInfo.lastMessage?.text}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Chats