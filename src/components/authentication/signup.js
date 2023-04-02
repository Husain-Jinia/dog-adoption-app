import React, { useState, } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage, db} from "../../firebase"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {useNavigate} from "react-router-dom"

const RegisterPage = () => {

    const [err, setErr] = useState(false)
    // const [dog, setDog] = useState(true)
    const navigate  =useNavigate()

    // const handleChange = (event) =>{
    //     setDog(false)
    // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value
    const email = event.target[1].value
    const password = event.target[2].value
    const file = event.target[3].files[0]
    const dogName = event.target[4].value
    const dogBreed = event.target[5].value
    const dogGender = event.target[6].value
    const dogNature = event.target[7].value
    const dogAge = event.target[8].value
    const dogDescription = event.target[9].value
    const dogImage = event.target[10].files[0]

    try {
        
        const res= await createUserWithEmailAndPassword(auth, email, password);

        const storageRef = ref(storage, displayName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        const dogStorageRef = ref(storage, dogName);

        const dogUploadTask = uploadBytesResumable(dogStorageRef, dogImage);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
        (error) => {
            setErr(true)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user,{
                displayName,
                photoURL: downloadURL,
            })
            console.log(res.user)
            await setDoc(doc(db, "users", res.user.uid), {
                uid:res.user.uid,
                displayName,
                email,
                photoURL: downloadURL
            });
            await setDoc(doc(db,"userInvites", res.user.uid),{
                uid:res.user.uid,
                invited:[]
            })
            await setDoc(doc(db, "userChats", res.user.uid),{})
            
            });
        }
        );
        dogUploadTask.on(
            (error) => {
                setErr(true)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateProfile(res.user,{
                    dogName,
                    dogPhotoURL: downloadURL,
                })
                await setDoc(doc(db, "Dogs",res.user.uid),{
                    uid:res.user.uid,
                    dogName,
                    dogBreed,
                    dogGender,
                    dogNature,
                    dogAge,
                    dogDescription,
                    dogPhotoURL:downloadURL
                })
                navigate("/login")
                });
            }
            );
        
    } catch (error) {
        setErr(true) 
    }

    


    console.log('Email:', email);
    console.log('Username:', displayName);
    console.log('Password:', password);
    // console.log('dog:', name);
  }

  return (
    <>
        <div style={{ backgroundColor: '#FFEDDB', height: '100vh' }}>
      <Form style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '50px' }}  onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
            
            <div>
                <FormGroup>
                    <Label for="username">username</Label>
                    <Input type="text" name="username" id="username" placeholder="Enter your username"   />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter your email"   />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter your password"  />
                </FormGroup>
                <FormGroup>
                    <Label for="profileImage">profileImage</Label>
                    <Input type="file" name="profileImage" id="profileImage" placeholder="Enter your profileImage"  />
                </FormGroup>
            </div>
            <div>
                <FormGroup>
                    <Label for="dogName">dog name</Label>
                    <Input type="text" name="dogName" id="dogName" placeholder="Enter your dogName"   />
                </FormGroup>
                <FormGroup>
                    <Label for="dogBreed">dog breed</Label>
                    <Input type="text" name="dogBreed" id="dogBreed" placeholder="Enter your dogBreed"   />
                </FormGroup>
                <FormGroup>
                    <Label for="dogGender">dog gender</Label>
                    <Input type="text" name="dogGender" id="dogGender" placeholder="Enter your dogGender"  />
                </FormGroup>
                <FormGroup>
                    <Label for="dogNature">dog nature</Label>
                    <Input type="text" name="dogNature" id="dogNature" placeholder="Enter your dogNature"  />
                </FormGroup>
                <FormGroup>
                    <Label for="dogAge">dog age</Label>
                    <Input type="text" name="dogAge" id="dogAge" placeholder="Enter your dogAge"   />
                </FormGroup>
                <FormGroup>
                    <Label for="dogDescription">dog description</Label>
                    <Input type="text" name="dogDescription" id="dogDescription" placeholder="Enter your dogDescription"   />
                </FormGroup>
                <FormGroup>
                    <Label for="dogImage">dog image</Label>
                    <Input type="file" name="dogImage" id="dogImage" placeholder="Enter your dogImage"  />
                </FormGroup>
                
            </div>
            <Button color="primary">Submit</Button>
          
        
       
      </Form>
    </div>
    </>
  );
};

export default RegisterPage;
