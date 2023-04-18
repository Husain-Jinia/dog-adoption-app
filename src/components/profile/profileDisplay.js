import { AuthContext } from '../../context/authContext';
import React, {useEffect, useState, useContext} from 'react'
import { collection, getDocs, query, where, doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore"; 
import {db} from "../../firebase"
import { Card, Badge } from "@windmill/react-ui";


const ProfileDisplay = () => {

  const {currentUser} = useContext(AuthContext)
  const [userDogs, setUserDogs] = useState([])
  const [user, setUser] = useState([])
  const [totalInvites, setTotalInvites] = useState(0)
  const [totalChats, setTotalChats] = useState(0)


  const userDetails = async () =>{
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log(querySnapshot.docs.map(doc=>doc.data()).filter(dog=>dog.uid===currentUser.uid))
    const userDetails= querySnapshot.docs.map(doc=>doc.data()).filter(dog=>dog.uid===currentUser.uid)
    setUser(userDetails)
    console.log(userDetails)
    const invitesSnapshot = await getDocs(query(collection(db, "userInvites"), where("uid", "==", currentUser.uid)));
    const chatCount = invitesSnapshot.docs.map(doc=>doc.data().invited)[0].filter(invite=>invite.accepted === true).length
    setTotalChats(chatCount)
    const inviteCount = invitesSnapshot.docs.map(doc=>doc.data().invited)[0].length
    setTotalInvites(inviteCount)
    
  }

  const fetchUserDogs = async () =>{
    const querySnapshot = await getDocs(collection(db, "Dogs"));
    // setDogs(querySnapshot.docs.map(doc=>doc.data()))
    console.log(currentUser)
    console.log(currentUser.uid)
    // console.log(querySnapshot.docs.map(doc=>doc.data()).filter(dog=>dog.uid===currentUser.uid))
    const filteredDogs = querySnapshot.docs.map(doc=>doc.data()).filter(dog=>dog.uid===currentUser.uid)
    setUserDogs(filteredDogs)
    console.log(userDogs)
  }

  useEffect(() => {
    
    currentUser && fetchUserDogs()
    currentUser && userDetails()
  }, [])
  

  return (
    <section className="pt-10  flex flex-col  bg-gradient-to-r from-slate-500 to-slate-50">
      <div className="px-4 mx-12">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className='flex justify-center pt-10'>
            <div className=" h-20 w-20 rounded-full bg-slate-500 flex-shrink-0">
              <img className="rounded-full" src={user.photoURL} alt=""/>
            </div>
          </div>
        
          <div className="px-6">
            <div className="">
           
              <div className="w-full px-4 text-center mt-10">
                <div className='flex flex-col justify-center md:flex-row md:justify-between lg:flex-row lg:justify-center'>
                <div className="flex justify-center py-2 lg:pt-2 pt-4">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {userDogs.length}
                    </span>
                    <span className="text-sm text-blueGray-400">Dogs</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {totalChats}
                    </span>
                    <span className="text-sm text-blueGray-400">Friends</span>
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {totalInvites}
                    </span>
                    <span className="text-sm text-blueGray-400">Invited</span>
                  </div>
                </div>
                {/* <div className='center '>  
                  <input type="button" className='bg-slate-400 px-3 py-1 rounded ' value="Edit"/>
                </div> */}
          </div>
          
        </div>
      </div>
      <div className="text-center mt-10 mb-10">
        <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 uppercase">
          {currentUser&& currentUser.displayName}
        </h3>
        {/* <div className="mb-2 text-blueGray-600 mt-10">
          <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
          {currentUser&& currentUser.location}
        </div> */}
        <div className="mb-2 text-blueGray-600 mt-5">
          <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
          {currentUser&& currentUser.email}
        </div>
      </div>
      {/* <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-9/12 px-4">
            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
              An artist of considerable range, Jenna the name taken
              by Melbourne-raised, Brooklyn-based Nick Murphy
              writes, performs and records all of his own music,
              giving it a warm, intimate feel with a solid groove
              structure. An artist of considerable range.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  </div>
      </div>
      <div className='flex flex-wrap mx-12 pt-4'>
        { userDogs!==[]?
          userDogs.map((dog) =>{
          return <Card key={dog.uid} className="flex flex-col border border-sky-950 text-capitalize bg-slate-100 p-2 mx-2 my-4 max-w-sm rounded-lg shadow-md">
          <div className=''>
            <img src={dog.dogPhotoURL} alt=""  className="h-60 w-full object-cover rounded-lg mb-4" />
          </div>
          
          <div className='flex flex-row justify-between bg-slate-200 rounded'>
          <h2 className="uppercase text-lg font-medium text-gray-800 mb-1 mt-1 ml-2 ">{dog.dogName}</h2>
          {dog.dogGender==="female"?<h2 className="text-lg font-medium text-gray-800 mb-1 mt-1 mr-2">👩</h2>:<h2 className="text-lg font-medium text-gray-800 mb-1 mt-1 mr-2">👨</h2>}
          <h2 className="text-sm mt-2 font-medium text-gray-800 mb-1 mt-1 mr-2">{dog.country}, {dog.state}, {dog.city}</h2>
          </div>
          
          <div className="flex flex-row justify-between mt-3 ">
              <Badge className="antialiased mb-2 bg-slate-200 rounded-lg px-2 py-1">
                {dog.dogAge} m/o
              </Badge>
              <Badge className="uppercase antialiased mb-2 rounded-lg bg-slate-300 px-2 py-1">
                {dog.dogNature}
              </Badge>
              <Badge className='antialiased bg-slate-200 mb-2 rounded-lg px-2 py-1'>
                {dog.dogBreed}
              </Badge>
          </div>
          <div className='whitespace-normal mt-3 mb-3 bg-white border h-full border-sky-950 rounded-lg py-2 px-2'>
            <p className=' antialiased font-medium text-gray-600 tracking-wide '>{dog.dogDescription}</p>
          </div>
          <div className="flex flex-row justify-between mt-2 bottom-0">
              <button value="Invite" className='w-full mx-1 p-1 px-3 rounded-lg font-bold text-slate-500 bg-slate-200'>Edit</button>
          </div>
          
        </Card>
          }):<div className=''>
              Nothing to display
            </div>}
        </div>
    </section>
  )
}

export default ProfileDisplay