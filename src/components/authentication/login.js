import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {useNavigate, Link} from 'react-router-dom'
import {auth} from '../../firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'

const LoginPage = () => {
  

  const [err, setErr] = useState(false)
  const navigate  =useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value
    const password = event.target[1].value

    try {
        await signInWithEmailAndPassword(auth, email, password)
       navigate("/")
        
    } catch (error) {
        setErr(true) 
    }
    console.log('Email:', email);
    console.log('Password:', password);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div  className='max-w-md w-full px-6 py-12 bg-white shadow-md overflow-hidden sm:rounded-lg'>
      <div className="mb-8">
        <h2 className="text-center text-2xl font-bold text-gray-800">
            LOGIN
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
            Dont have an account?
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Register
            </Link>
        </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label className="block text-gray-700 font-bold mb-2" for="email">Email</Label>
            <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Enter your email"/>
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 font-bold mb-2" for="password">Password</Label>
            <Input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Enter your password"/>
          </div>
          <input className="py-1 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"   type="submit" value="Submit"/>
        </Form>
      </div>
      
    </div>
  );
};

export default LoginPage;
