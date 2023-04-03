import React from 'react'
import { ChatContext } from "../../context/chatContext";
import { useContext } from "react";
import Input from './Input';
import Messages from './message';

const Chat = () => {

    const {data} = useContext(ChatContext) 
    console.log(data)

    return (
        <div>
            <hr/>
            <div>
               {data.user?.displayName} 
            </div>
            <hr/>
            <div>
                <Messages/>
            </div>
            <div>
                <Input/>
            </div>
        </div>
        
    )
}

export default Chat