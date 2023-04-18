import RegisterPage from './components/authentication/signup';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom' 
import Home from './components/home';
import LoginPage from './components/authentication/login';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import NavbarComponent from './components/navbarComponent';
import Invites from './components/invites';
import Chats from './components/Chats/chats';
import ProfileDisplay from './components/profile/profileDisplay';

function App() {
  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
  }

  return (
    <div>
      
      <BrowserRouter>
        <NavbarComponent/>
        <Routes>
          <Route path="/">
            <Route index element={currentUser?<Home/>:<LoginPage/>}/>
            <Route path="login" element={!currentUser?<LoginPage/>:<Home/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="invites" element={currentUser?<Invites current={currentUser}/>:<LoginPage/>}/>
            <Route path="chats" element={currentUser?<Chats/>:<LoginPage/>}/>
            <Route path="profile" element={currentUser?<ProfileDisplay/>:<LoginPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
