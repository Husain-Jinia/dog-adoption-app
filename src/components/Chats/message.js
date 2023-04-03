import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/chatContext";
import { db } from "../../firebase";


const Messages = () => {

    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext)

    useEffect(() => {
      const unsub = onSnapshot(doc(db,"chats",data.chatId), doc=>{
        doc.exists()  && setMessages(doc.data().messages)
      })
    
      return () => {
        unsub()
      }
    }, [data.chatId])
    

    return (
        <div>
            {
                messages.map(m=>
                    <div key={m.id}>
                        <p>m.text</p>
                    </div>    
                )
            }
        </div>
    )
}

export default Messages