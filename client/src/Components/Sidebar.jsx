import React from 'react'
import { Sidebar } from 'flowbite-react'
import {HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup} from 'react-icons/hi';
import { LiaCommentsSolid } from "react-icons/lia";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../Redux/User/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaChartPie } from "react-icons/fa";
function SideBar() {
  const location = useLocation();
  const [tab, settab] = useState('');
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user);
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
  useEffect(() =>{
    const urlParams = new URLSearchParams(location.search);
    const tabfromUrl = urlParams.get('tab');
    if(tabfromUrl) {
      settab(tabfromUrl);
    }
    console.log(tab);
  },[location]);
  return (
    <Sidebar className='md:w-max w-full'>
  <Sidebar.Items className='md:w-auto w-full'>
    <Sidebar.ItemGroup className='sm:flex sm:flex-col sm:justify-between'>
    <Link to={'/dashboard?tab=profile'}>
            <Sidebar.Item active={tab === 'proflie'} icon={HiUser} label={currentUser.isAdmin ? 'Admin':'User'} labelColor='dark'>Profile</Sidebar.Item>
        </Link>  
        {
     currentUser.isAdmin && 
          <Link to={'/dashboard?tab=Dash'}>
              <Sidebar.Item icon={FaChartPie}
              active={tab === 'Dash'}
          className='cursor-pointer hover:bg-teal-500 dark:hover:bg-teal-500 dark:hover:text-black'
          >Dashboard</Sidebar.Item>
          </Link>
      }
      {
     currentUser.isAdmin && 
          <Link to={'/dashboard?tab=posts'}>
              <Sidebar.Item icon={HiDocumentText}
              active={tab === 'posts'}
          className='cursor-pointer hover:bg-teal-500 dark:hover:bg-teal-500 dark:hover:text-black'
          >Posts</Sidebar.Item>
          </Link>
      }
      {
     currentUser.isAdmin && 
          <Link to={'/dashboard?tab=users'}>
              <Sidebar.Item icon={HiOutlineUserGroup}
              active={tab === 'users'}
          className='cursor-pointer hover:bg-teal-500 dark:hover:bg-teal-500 dark:hover:text-black'
          >Users</Sidebar.Item>
          </Link>
      }
      {
     currentUser.isAdmin && 
          <Link to={'/dashboard?tab=comments'}>
              <Sidebar.Item icon={LiaCommentsSolid}
              active={tab === 'comments'}
          className='cursor-pointer hover:bg-teal-500 dark:hover:bg-teal-500 dark:hover:text-black'
          >Comments</Sidebar.Item>
          </Link>
      }
      <Sidebar.Item icon={HiArrowSmRight} labelColor='dark' onClick={handleSignout} className='cursor-pointer hover:bg-red-500 dark:hover:bg-red-500'>Sign Out</Sidebar.Item>
    </Sidebar.ItemGroup>
  </Sidebar.Items>
</Sidebar>


  )
}

export default SideBar