
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import {signOut} from "firebase/auth"
import {auth} from "../firebase"
import { AuthContext } from '../context/authContext';

const NavbarComponent = () => {
    const {currentUser} = useContext(AuthContext)
    return (
        <div>
            {/* <nav>
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
                
            </nav> */}
            <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open. */}
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            {/* <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div> */}
            <div className="hidden sm:block sm:ml-6">
                {
                !currentUser?
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                
                    <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Login
                    </Link>

                    <Link
                    to="/register"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Register
                    </Link>

                </div>:
                <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                
                    <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Dashboard
                    </Link>

                    <Link
                    to="/invites"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Invites
                    </Link>
                    <Link
                    to="/chats"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Chats
                    </Link>
                    <Link
                    onClick={()=>signOut(auth)}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Logout
                    </Link>

                </div>
            }
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        

        {/* Profile dropdown */}
        <div className="ml-3 relative flex">
          
          <div>
            <button
              className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="user-menu"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              {currentUser&&<img
                className="h-8 w-8 rounded-full"
                src={currentUser.photoURL}
                alt=""
              />}
            </button>
          </div>
          <div className='mx-2 mt-1 font-medium text-normal text-gray-300 '>{currentUser&&currentUser.displayName}</div>

          {/* Dropdown menu, show/hide based on menu state. */}
          {/* Entering: "transition ease-out duration-100", From: "transform opacity-0 scale-95", To: "transform opacity-100 scale-100" */}
          {/* Leaving: "transition ease-in duration-75", From: "transform opacity-100 scale-100", To: "transform opacity-0 scale-95" */}
          {/* <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <Link
              to="#"
              
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Your Profile
            </Link>

            <Link
              to="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </Link>

            <Link
              onClick={()=>signOut(auth)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </Link>
          </div>*/}
        </div>
      </div> 
    </div>
  </div>
    <div className="sm:hidden" id="mobile-menu">
        {!currentUser?
        <div className="px-2 pt-2 pb-3 space-y-1">
            {/* <Link
                to="/"
                className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
                Dashboard
            </Link> */}
            <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
                Login
            </Link>

            <Link
                to="/register"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
                register
            </Link>
        </div>:
        <div className="px-2 pt-2 pb-3 space-y-1">
        <Link
            to="/"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
                Dashboard
            </Link>
            <Link
                to="/invites"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
                Invites
            </Link>

            <Link
                to="/chats"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
                Chats
            </Link>
            <Link
              onClick={()=>signOut(auth)}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              
            >
              Logout
            </Link>
        </div>

        }
    </div>
    </nav>
    </div>

    )
}

export default NavbarComponent