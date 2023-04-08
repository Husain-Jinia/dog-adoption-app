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
                    // <div key={m.id}>
                    //     <img
                    //         style={{ verticalAlign: "middle",
                    //         width: "25px",
                    //         height: "25px",
                    //         marginInline:"10px",
                    //         borderRadius: "50%"}}
                    //         src={
                    //             m.senderId === currentUser.uid
                    //             ? currentUser.photoURL
                    //             : data.user.photoURL
                    //         }
                    //         alt=""
                    //         />
                    //      {m.text}
                         
                        
                    // </div>    
                    
                   <div class="grid grid-cols-12 gap-y-2"  key={m.id}>
                    {m.senderId !== currentUser.uid?
                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 flex-shrink-0"
                    >
                      <img
                        className="rounded-full"
                        src={
                            m.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                        }
                        alt=""
                        />
                    </div>
                    <div
                      class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div>{m.text}</div>
                    </div>
                  </div>
                </div>:
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 flex-shrink-0"
                    >
                     <img
                        className="rounded-full "
                        src={
                            m.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                        }
                        alt=""
                        />
                    </div>
                    <div
                      class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div>{m.text}</div>
                    </div>
                  </div>
                </div>}
                

              </div>
                )
            }
        </div>
    )
}

export default Messages