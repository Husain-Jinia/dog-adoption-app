
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import {signOut} from "firebase/auth"
import {auth} from "../firebase"
import { AuthContext } from '../context/authContext';

const NavbarComponent = () => {
    const {currentUser} = useContext(AuthContext)
    return (
        <div>
            <nav>
                <ul>
                    
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/invites">Invites</Link></li>
                    <li><Link to="/chats">Chats</Link></li>
                    {!currentUser?
                    <div>
                    <li><Link to="/register">register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    
                    </div>:
                    <button onClick={()=>signOut(auth)}>Logout</button>
                    }
                    </ul>
                
            </nav>
        </div>
    )
}

export default NavbarComponent