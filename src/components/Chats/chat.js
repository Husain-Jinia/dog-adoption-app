import React from 'react'
import { ChatContext } from "../../context/chatContext";
import { useContext } from "react";
import Input from './Input';
import Messages from './message';

const Chat = () => {

    const {data} = useContext(ChatContext) 
    console.log(data)

    return (
        
        <div className="flex flex-col flex-auto h-full pt-2 mb-4 pb-12 px-4">
          <div className='text-xl font-bold text-slate-500 pb-2 ml-1'>
          {data.user&&data.user.displayName}
          </div>
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
        >
          
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            
            <div className="flex flex-col h-full">
              <Messages/>
            </div>
          </div>
          <div>
           
            <Input/>
          </div>
        </div>
      </div>
        
    )
}

export default Chat