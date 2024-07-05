import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet } from 'react-router-dom';
import Error404 from './Error404';
const Private = () => {
  const {isLoggedIn} = useAuth();
  if(isLoggedIn){
    return <Outlet/>
  }else{
    return <Error404/>;
  }
  
}

export default Private
