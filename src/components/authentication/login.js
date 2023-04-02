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
    <div style={{ backgroundColor: '#FFEDDB', height: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '50px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="Enter your email"/>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="Enter your password"/>
        </FormGroup>
        <Button color="primary" block>Submit</Button>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>Don't have an account? <Link to="/register">Register here</Link></p>
      </Form>
    </div>
  );
};

export default LoginPage;
