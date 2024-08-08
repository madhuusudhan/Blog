// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Outlet, Navigate } from 'react-router-dom';
// function OnlyAdminPrivateRoute() {
//     const {currentUser} = useSelector((state) => state.user);
//   return currentUser && currentUser.isAdmin ? <Outlet/> : Navigate('/sign-in')
// }

// export default OnlyAdminPrivateRoute

// OnlyAdminPrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    currentUser.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to='/sign-in' />
    )
  ) : (
    <Navigate to='/sign-in' />
  );
}

