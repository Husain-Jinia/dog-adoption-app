import React, { useEffect, useState, useContext } from 'react'
import { collection, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "../firebase"
import { AuthContext } from '../context/authContext';
import Invites from './invites';
import { setDoc } from "firebase/firestore";
import { Card, Badge } from "@windmill/react-ui";
import Pagination from "./paginate";

const Home = () => {

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };


  const [dogs, setDogs] = useState([])
  const [err, setErr] = useState()
  const [temp, setTemp] = useState([])
  const [gender, setGender] = useState("all")
  const [breed, setBreed] = useState("all")
  const [countries, setCountries] = useState([])
  const [toggle, setToggle] = useState(false)
  const [cities, setCities] = useState([])
  const [minAge, setMinAge] = useState(0)
  const [maxAge, setMaxAge] = useState(1000000)
  const [city, setCity] = useState("all")
  const [state, setState] = useState("all")
  const [country, setCountry] = useState("all")

  const PER_PAGE = 8;
  const pageCount = Math.ceil(temp.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;
  const currentPageData = temp.slice(offset, offset + PER_PAGE);

  const breeds = ['affenpinscher', 'african', 'airedale', 'akita', 'appenzeller', 'australian',
    'basenji', 'beagle', 'bluetick', 'borzoi', 'bouvier', 'boxer', 'brabancon', 'briard', 'buhund', 'bulldog',
    'bullterrier', 'cattledog', 'chihuahua', 'chow', 'clumber', 'cockapoo', 'collie', 'coonhound', 'corgi',
    'cotondetulear', 'dachshund', 'dalmatian', 'dane', 'deerhound', 'dhole', 'dingo', 'doberman',
    'elkhound', 'entlebucher', 'eskimo', 'finnish', 'frise', 'german shepherd', 'greyhound',
    'groenendael', 'havanese', 'hound', 'husky', 'keeshond', 'kelpie', 'komondor', 'kuvasz', 'labradoodle',
    'labrador', 'leonberg', 'lhasa', 'malamute', 'malinois', 'maltese', 'mastiff', 'mexicanhairless', 'mix',
    'mountain', 'newfoundland', 'otterhound', 'ovcharka', 'papillon', 'pekinese', 'pembroke', 'pinscher', 'pitbull',
    'pointer', 'pomeranian', 'poodle', 'pug', 'puggle', 'pyrenees', 'redbone', 'retriever', 'ridgeback', 'rottweiler',
    'saluki', 'samoyed', 'schipperke', 'schnauzer', 'segugio', 'setter', 'sharpei', 'sheepdog', 'shiba', 'shihtzu',
    'spaniel', 'spitz', 'springer', 'stbernard', 'terrier', 'tervuren', 'vizsla', 'waterdog', 'weimaraner', 'whippet', 'wolfhound']

  const { currentUser } = useContext(AuthContext)

  const fetchPost = async () => {
    console.log("okay")
    const querySnapshot = await getDocs(collection(db, "Dogs"));
    setDogs(querySnapshot.docs.map(doc => doc.data()))
    setTemp(querySnapshot.docs.map(doc => doc.data()))
    console.log(querySnapshot.docs.map(doc => doc.data()))
    console.log(dogs)
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "aXhJeTVwOFFVM0VoRXhob0NjbWFNUWhUMU5ZQzc0Q2NXVGFEV2s0Zw==");

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };
    fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
      .then(response => response.json())
      .then(result => setCountries(result))
      .catch(error => console.log('error', error));

    console.log(countries)
  }


  useEffect(() => {
    fetchPost()
  }, [])

  const sendInvite = async (uid) => {
    console.log("received user uid :", uid)
    try {
      const querySnapshot = await getDocs(query(collection(db, "userInvites"), where("uid", "==", uid)));
      // console.log(querySnapshot.docs)
      const data = querySnapshot.docs.map(doc => doc.data())
      console.log(currentUser)
      console.log(data[0].invited.some(invite => invite.userUID === uid))
      console.log("asdad" + data[0].invited[0].name)
      if (data[0].invited.some(invite => invite.userUID === uid)) {
        console.log("already exists")
      } else {
        console.log("does not exist")
        console.log(data[0].invited)
        try {
          await setDoc(doc(db, "userInvites", uid), {
            uid: uid,
            invited: data[0].invited.concat([
              {
                userUID: currentUser.uid,
                photo: currentUser.photoURL,
                name: currentUser.displayName,
                accepted: false
              }
            ])
          })
          console.log("invite sent")
        } catch (error) {
          setErr(err)
        }
      }
    } catch (error) {
      setErr(err)
    }
  }

  const changeBreed = (e) => {
    if (e.target.value === "all" && gender === "all" && state === "all") {
      setTemp(dogs)
      setBreed("all")
      console.log(temp)
    } else if (temp.isEmpty()) {

    } else if (e.target.value !== "all") {

      let filteredDogs = []
      if (gender !== "all" || state !== "all") {
        filteredDogs = dogs
        if (state !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.state === state
          })
        }
        if (gender !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogGender === gender
          })
        }
        if (state !== "all" && city !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.city === city
          })
        }


      } else {
        filteredDogs = dogs
      }

      filteredDogs = filteredDogs.filter(dog => {
        return dog.dogBreed === e.target.value
      })
      console.log(filteredDogs)
      setBreed(e.target.value)
      setTemp(filteredDogs)
    } else if (e.target.value === "all") {
      let filteredDogs = []
      if (gender !== "all" || state !== "all") {
        filteredDogs = dogs
        if (state !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.state === state
          })
        }
        if (gender !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogGender === gender
          })
        }
        if (state !== "all" && city !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.city === city
          })
        }


      } else {
        filteredDogs = dogs
      }
      setTemp(filteredDogs)
      setBreed("all")
    }
  }

  const changeGender = (e) => {
    if (e.target.value === "all" && breed === "all" && state === "all") {
      setTemp(dogs)
      setGender("all")
    } else if (e.target.value !== "all") {

      let filteredDogs = []
      if (breed !== "all" || state !== "all") {
        filteredDogs = dogs
        if (state !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.state === state
          })
        }
        if (breed !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogBreed === breed
          })
        }
        if (state !== "all" && city !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.city === city
          })
        }

      } else {
        filteredDogs = dogs
      }
      filteredDogs = filteredDogs.filter(dog => {
        return dog.dogGender === e.target.value
      })
      console.log(filteredDogs)
      setGender(e.target.value)
      setTemp(filteredDogs)
    } else if (e.target.value === "all") {
      let filteredDogs = []
      if (breed !== "all" || state !== "all") {
        filteredDogs = dogs
        if (state !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.state === state
          })
        }
        if (breed !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogBreed === breed
          })
        }
        if (state !== "all" && city !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.city === city
          })
        }

      }
      setTemp(filteredDogs)
      setGender("all")
    }
  }

  const changeState = async (e) => {
    if (e.target.value === "all" && breed === "all" && gender === "all") {
      setTemp(dogs)
      setState("all")
      setToggle(false)
      setCities([])
      setCity("all")
    } else if (e.target.value !== "all") {

      let filteredDogs = []
      let c = countries.filter(co => {
        return co.name === e.target.value
      })
      c = c[0].iso2
      console.log(c[0].iso2)
      var headers = new Headers();
      headers.append("X-CSCAPI-KEY", "aXhJeTVwOFFVM0VoRXhob0NjbWFNUWhUMU5ZQzc0Q2NXVGFEV2s0Zw==");

      var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      };
      fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${c}/cities`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setCities(result)
          setToggle(true)
        })
        .catch(error => console.log('error', error));

      if (breed !== "all" || gender !== "all") {
        filteredDogs = dogs
        if (gender !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogGender === gender
          })
        }
        if (breed !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogBreed === breed
          })
        }

      } else {
        filteredDogs = dogs

      }
      filteredDogs = filteredDogs.filter(dog => {
        return dog.state === e.target.value
      })
      console.log(filteredDogs)
      setState(e.target.value)
      setTemp(filteredDogs)
    } else if (e.target.value === "all") {
      setToggle(false)
      setCities([])
      setCity("all")
      let filteredDogs = []
      if (breed !== "all" || gender !== "all") {
        filteredDogs = dogs
        if (gender !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogGender === gender
          })
        }
        if (breed !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogBreed === breed
          })
        }

      }
      setTemp(filteredDogs)
      setState("all")
      setCity("all")

    }

  }


  const changeCity = (e) => {
    if (e.target.value === "all" && breed === "all" && gender === "all") {
      setTemp(dogs)
      setCity("all")
    } else if (e.target.value !== "all") {

      let filteredDogs = []
      if (breed !== "all" || gender !== "all") {
        filteredDogs = dogs
        if (state !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.state === state
          })
        }
        if (gender !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogGender === gender
          })
        }
        if (breed !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogBreed === breed
          })
        }

      } else {
        filteredDogs = dogs
      }
      filteredDogs = filteredDogs.filter(dog => {
        return dog.city === e.target.value
      })
      console.log(filteredDogs)
      setCity(e.target.value)
      setTemp(filteredDogs)
    } else if (e.target.value === "all") {
      let filteredDogs = []
      if (breed !== "all" || gender !== "all" || state !== "all") {
        filteredDogs = dogs
        if (state !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.state === state
          })
        }
        if (gender !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogGender === gender
          })
        }
        if (breed !== "all") {
          filteredDogs = filteredDogs.filter(dog => {
            return dog.dogBreed === breed
          })
        }

      }
      setTemp(filteredDogs)
      setCity("all")
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-slate-500 to-slate-50'>
      <div className="flex flex-col  ">
        <div className='my-3  flex-col flex lg:flex-row justify-center'>
          <div className='ml-4'>
            <label for="breeds_multiple" className="block mb-2 text-lg font-medium text-gray-900 dark:text-slate">Filter for breed</label>
            <select className='-gray-50  border border-gray-300 text-gray-900 text-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' defaultValue="all" onChange={changeBreed}>
              <option name="all">all</option>
              {
                breeds.map((x, y) =>
                  <option className='p-1 bg-slate-600' key={y}>{x}</option>)
              }
            </select>
          </div>
          <div className='ml-4'>
            <label for="breeds_multiple" className="block mb-2 text-lg font-medium text-gray-900 dark:text-slate">Filter for State</label>
            <select className='-gray-50 w-30  border border-gray-300 text-gray-900 text-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' defaultValue="all" onChange={changeState}>
              <option name="all">all</option>
              {
                countries.map((x) =>
                  <option className='p-1 bg-slate-600' >{x.name}</option>)
              }
            </select>
          </div>
          <div className='ml-4'>
            <label for="breeds_multiple" className="block mb-2 text-lg font-medium text-gray-900 dark:text-slate">Filter for City</label>
            <select className='-gray-50 w-40  border min-w-20 border-gray-300 text-gray-900 text-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' defaultValue="all" onChange={changeCity}>
              <option name="all">all</option>
              {toggle === true ?
                cities.map((x) =>
                  <option className='p-1 bg-slate-600' >{x.name}</option>) : <option></option>
              }
            </select>
          </div>
          <div className='mx-4'>
            <label for="breeds_multiple" className="block mb-2 text-lg font-medium text-gray-900 dark:text-slate">Filter for Gender</label>
            <select className='-gray-50 w-full  border border-gray-300 text-gray-900 text-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' defaultValue="all" onChange={changeGender}>
              <option className='p-1 bg-slate-600' name="all">all</option>
              <option className='p-1 bg-slate-600' name='male' >male</option>
              <option className='p-1 bg-slate-600' name='female' >female</option>
            </select>
          </div>

          {/* <div className=''>
          <label for="age_multiple" className="block mb-2 text-start mx-3 text-lg font-medium text-gray-900 dark:text-slate">Filter for age (months)</label>
          <div className='mx-3 flex flex-row '> 
            <input placeholder='Min age' type="number" className='-gray-50 w-20  border border-gray-300 text-gray-900 text-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            <p className='my-2 text-center mx-2 font-bold text-lg'> - </p>
            <input placeholder='Max age' type='number' className='-gray-50 w-20 border border-gray-300 text-gray-900 text-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
          </div > 
        </div> */}
        </div>
        <div className='flex flex-wrap justify-center pt-4'>
          {temp ?
            currentPageData.map((dog) => {
              return <Card key={dog.uid} className="flex flex-col border border-sky-950 text-capitalize bg-slate-100 p-2 mx-2 my-4 max-w-sm rounded-lg shadow-md">
                <div className=''>
                  <img src={dog.dogPhotoURL} alt="" className="h-60 w-full object-cover rounded-lg mb-4" />
                </div>

                <div className='flex flex-row justify-between bg-slate-200 rounded'>
                  <h2 className="uppercase text-lg font-medium text-gray-800 mb-1 mt-1 ml-2 ">{dog.dogName}</h2>
                  {dog.dogGender === "female" ? <h2 className="text-lg font-medium text-gray-800 mb-1 mt-1 mr-2">👩</h2> : <h2 className="text-lg font-medium text-gray-800 mb-1 mt-1 mr-2">👨</h2>}
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
                  <button value="Invite" className='w-full mx-1 p-1 px-3 rounded-lg font-bold text-slate-500 bg-slate-200' onClick={() => sendInvite(dog.uid)}>Send Invite</button>
                </div>

              </Card>
            }) : <div className=''>
              Nothing to display
            </div>}
        </div>
        <div className='px-4 py-4 my-4 bg-slate-500 border-2 border-slate-300 bg-opacity-40 mx-4 rounded-lg lg:w-[60rem] md:w-[30rem] self-center'>
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>

  )
}

export default Home