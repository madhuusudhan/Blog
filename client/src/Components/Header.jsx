import React, { useEffect } from 'react'
import { Navbar, TextInput, Button, Dropdown, Avatar} from "flowbite-react"
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../Redux/Theme/themeSlice';
import { signoutSuccess } from '../Redux/User/userSlice';
function Header() {
  const path = useLocation().pathname;
  const {currentUser} = useSelector(state => state.user);
  const {theme} = useSelector(state => state.theme);
  const [searchTerm, setsearchTerm] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlparams.get('searchTerm');
    if(searchTermFromUrl) {
      setsearchTerm(searchTermFromUrl);
    }
  },[location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch('api/user/signout',{
        method: 'POST',
      });
      const data = await res.json();
      if(!res.ok) {
        console.log(data.message);
      }
      else {
        dispatch(signoutSuccess());
        window.location = '/sign-in';
      }
    } catch (error) {
      console.log(error.message);
    }
}
const handleSubmit = (e) => {
     e.preventDefault();
     const urlParams = new URLSearchParams(location.search);
     urlParams.set('searchTerm', searchTerm);
     const searchQuery = urlParams.toString();
     console.log(searchQuery);
     navigate(`/search?${searchQuery}`);
}
  return (
    <Navbar className='border b-3 shadow-sm'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-green-400 via-blue-500 to-teal-500 rounded-lg text-black'>
          Madhusudhan&apos;s
        </span>Blog
      </Link>
      
      <form onSubmit={handleSubmit} className='hidden lg:block'>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
      </form>
      
      <Button className="w-12 h-10 lg:hidden" color='gray' pill onClick={() => {
        navigate('/search');
      }}>
        <AiOutlineSearch/>
      </Button>
      
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
          {
             theme === 'dark' ? <FaSun/> : <FaMoon/>
          }
        </Button>
        {
          currentUser ? (
            <Dropdown arrowIcon={false}
            inline
            label={
              <Avatar
              alt='user'
              img={currentUser.profilePicture}
              rounded
              />
            }
            >
              <Dropdown.Header>
      <span className='block text-sm text-gray-700 dark:text-white text-center'>{currentUser.username}</span>
      <span className='block text-sm font-medium truncate text-gray-500 dark:text-white'>{currentUser.email}</span>
    </Dropdown.Header>
    <Link to='/dashboard?tab=profile'>
      <Dropdown.Item className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Profile</Dropdown.Item>
    </Link>
    <Dropdown.Divider className='border-t border-gray-200 my-1' />
    <Dropdown.Item as="button" onClick={handleSignout} className='block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
      Sign out
    </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-up">
          <Button className='bg-cyan-600' outline pill>
            Sign In
          </Button>
        </Link>
          )
        }
        
        <Navbar.Toggle />
      </div>
      
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as='div'>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as='div'>
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
