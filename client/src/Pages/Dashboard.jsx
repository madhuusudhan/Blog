import React from 'react'
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import SideBar from '../Components/Sidebar';
import Profile from '../Components/Profile';
import Posts from '../Components/dashPosts';
import DashUsers from '../Components/DashUsers';
import DashComments from '../Components/DashComments'
import DashboardComp from '../Components/Dashboardcomp';
function Dashboard() {
  const location = useLocation();
  const [tab, settab] = useState('');
  useEffect(() =>{
    const urlParams = new URLSearchParams(location.search);
    const tabfromUrl = urlParams.get('tab');
    if(tabfromUrl) {
      settab(tabfromUrl);
    }
  },[location]);
  return (
    <>
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div>
        <SideBar></SideBar>
      </div>
      {/* Profile */}
      {
      tab == 'profile' && <Profile></Profile>
      }
      {/* posts ... */}
      {
      tab == 'posts' && <Posts/>
      }
      {/* users */}
      { tab == 'users' && <DashUsers/>}
      {/* comments */}
      { tab == 'comments' && <DashComments/>}
      {/* dashboard */}
      { tab == 'Dash' && <DashboardComp/>}
    </div>
    
    
    </>
  )
}

export default Dashboard;