import React, { useState, useEffect, useContext } from 'react'
import { onSnapshot, doc } from "firebase/firestore";
import { Transition } from '@headlessui/react';
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
        // <div>
        //     Chats
        //     <div>
        //         {
        //             Object.entries(chats)?.map(chat=>{
        //                 return <div key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        //                     <p>{chat[1].userInfo.displayName}</p>
        //                     <p>{chat[1].userInfo.lastMessage?.text}</p>
        //                 </div>
        //             })
        //         }
        //     </div>
        //     <div>
        //         <Chat/>
        //     </div>
        // </div>
      <div className='h-screen bg-gradient-to-r from-slate-500 to-slate-50 p-10'>
        <div className="flex h-full border border-slate-200 border-4 rounded-lg  flex-col md:flex-row  lg:flex-row xl:flex-row 2xl:flex-row"> 
      <div className="w-1/3 bg-gray-50 h-full border-r border-gray-200">
        {/* Sidebar goes here */}
      <header className="border-b border-gray-200">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-bold">All Chats</h1>
          </div>
        </header>
        <div className='m-4'>
        {
            Object.entries(chats)?.map(chat=>{
                return <div key={chat[0]} className='pl-1 py-4 border bg-slate-200 border-2 rounded'  onClick={()=>handleSelect(chat[1].userInfo)}>
                    <div className='flex flex-row'>
                        {<img className=''
                            style={{ verticalAlign:"middle",
                            width: "50px",
                            height: "50px",
                            marginInline:"10px",
                            marginRight:"20px",
                            borderRadius: "50%"}}
                            src={
                                chat[1].userInfo.photoURL
                            }
                            alt=""
                            />
                            }
                          <div className='flex flex-col w-full'>
                              <p className='text-lg antialiased font-medium text-slate-700'>{chat[1].userInfo.displayName}</p>
                              <p className='text-sm antialiased font-medium text-slate-500'>{chat[1].lastMessage?.text}</p>
                          </div>
                    </div>
                </div>
            })
        }
        </div>
        
      </div>

      <div className="w-2/3 bg-white">
        

        <div className="flex h-full ">
          <Chat/> 
          
      </div>
      </div>
      </div>
      </div>

    
    )
}

export default Chats