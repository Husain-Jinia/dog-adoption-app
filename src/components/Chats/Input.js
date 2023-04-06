import React,{useContext, useState} from 'react'
import { AuthContext } from '../../context/authContext'
import { ChatContext } from '../../context/chatContext'
import {
arrayUnion,
doc,
serverTimestamp,
Timestamp,
updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {

    const [text, setText] = useState("")
    const [img, setImg] = useState(null);

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const handleSend = async () =>{
        if (img) {
            const storageRef = ref(storage, uuid());
      
            const uploadTask = uploadBytesResumable(storageRef, img);
      
            uploadTask.on(
              (error) => {
                //TODO:Handle Error
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                  await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                      id: uuid(),
                      text,
                      senderId: currentUser.uid,
                      date: Timestamp.now(),
                      img: downloadURL,
                    }),
                  });
                });
              }
            );
          } else {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              }),
            });
          }
      
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
      
          await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
      
          setText("");
          setImg(null);
    }

    return (
        // <div>
        //     <input type="text" onChange={(e) => setText(e.target.value)}
        //         value={text} placeholder="type your message here" />
        //      <input
        //   type="file"
        //   style={{ display: "none" }}
        //   id="file"
        //   onChange={(e) => setImg(e.target.files[0])}
        // />
        //     <input type="button"  value="Submit" onClick={handleSend}/>
        // </div>
        <div className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'
        
      >
        <div>
          
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
        </div>
        <div class="flex-grow ml-4">
          <div class="relative w-full">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            />
            <button
              class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="ml-4">
          <button
            class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
            value="Submit" onClick={handleSend}
          >
            <span>Send</span>
            <span class="ml-2">
              <svg
                class="w-4 h-4 transform rotate-45 -mt-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    )
}

export default Input