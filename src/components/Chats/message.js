import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/chatContext";
import { db } from "../../firebase";


const Messages = () => {

    const [messages, setMessages] = useState([])
    const { currentUser } = useContext(AuthContext);
    const {data} = useContext(ChatContext)

    useEffect(() => {
      const unsub = onSnapshot(doc(db,"chats",data.chatId), doc=>{
        doc.exists()  && setMessages(doc.data().messages)
        console.log(doc.data())
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
                        <img
                            style={{ verticalAlign: "middle",
                            width: "25px",
                            height: "25px",
                            marginInline:"10px",
                            borderRadius: "50%"}}
                            src={
                                m.senderId === currentUser.uid
                                ? currentUser.photoURL
                                : data.user.photoURL
                            }
                            alt=""
                            />
                         {m.text}
                        
                    </div>    
                )
            }
        </div>
    )
}

export default Messages